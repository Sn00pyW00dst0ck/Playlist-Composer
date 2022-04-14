//Imports
const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const { URLSearchParams } = require('url');
const SpotifyAPI = require('./spotify-api');
const CustomMap = require('./Data Structures/Map');
const CustomTree = require("./Data Structures/AVLTree");
const cors = require('cors');
require('dotenv').config();

//Setup the Port and express
const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(cors());
APP.use(express.static(path.join(__dirname, 'Public')));
APP.use(express.json({ limit: '1mb', type: '*/*'}));

//Test react interaction...
APP.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

//Setup the Spotify API Object
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || null;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || null;
const REDIRECT_URI = "http://localhost:3000/";
const SCOPES = "user-read-private user-library-read user-top-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";

//An object to be used for easy Spotify api calls
let SpotifyAPIObject = new SpotifyAPI(CLIENT_ID, CLIENT_SECRET);

/*--------------------------------------------------------------------------------
   React Interaction API
--------------------------------------------------------------------------------*/

//Get boolean to check if user is logged in
APP.get("/api/logged-in", (req, res) =>  {
    res.json({loggedIn: SpotifyAPIObject.isLoggedIn()})
});

//Get information on the current user
APP.get("/api/current-user", async (req, res) =>  {
    const user = await SpotifyAPIObject.getCurrentUserProfile();
    if (user.status == 401)  { 
        res.json(null);
    }
    res.status(200).json(user)
});

//SOME HELPER FUNCTIONS BELOW!

//Move this to Spofity API object???
const getPlaylistData = async (users) => {
    //Make all the requests to Spotify for user playlists
    let promiseArray = [];
    promiseArray.push(SpotifyAPIObject.getCurrentUserPlaylists());
    for (let i = 0; i < users.length; i++)  {
        promiseArray.push(SpotifyAPIObject.getUserPlaylists(users[i]));
    }
    const responses = await Promise.all(promiseArray);

    //Extract the playlistData into one array
    let playlistData = [];
    for (let i = 0; i < responses.length; i++)  {
        playlistData = [...playlistData, ...responses[i].items];
    }
    return playlistData;
}

//Move this to Spotify API object???
const getTracksOfManyPlaylists = async (playlists) =>  {
    //Make all the requests to Spotify for user playlists
    let promiseArray = [];
    for (let i = 0; i < playlists.length; i++)  {
        promiseArray.push(SpotifyAPIObject.getPlaylistItems(playlists[i].id));
    }
    const responses = await Promise.all(promiseArray);

    //Extract the playlistData into one array
    let tracksData = [];
    for (let i = 0; i < responses.length; i++)  {
        tracksData = [...tracksData, ...responses[i].items];
    }
    return tracksData;
}

APP.post("/api/create-playlist", async (req, res) =>  {
    //The request body should supply the (up to) 5 users to create playlist for
    console.log("Creating playlist");
    console.log(req.body);

    //Requests for playlists and tracks data
    //USE TRY CATCH TO IMPLEMENT ERROR HANDLING!!
    //IMLPEMENT FILTER ON CURRENT USER's PLAYLISTS
    let playlists;
    let tracks;
    try  {
        playlists = await getPlaylistData(req.body.users);
        tracks = await getTracksOfManyPlaylists(playlists);
    } catch (error)  {
        console.log("There was an error getting playlists and tracks!");
        console.log(error);
        res.status(500).send(new Error("Error: " + error));
        return;
    }

    //Some printing of the track IDs. This will be replaced with using data structures to prioritize tracks.
    let tracksMap = new CustomMap();
    for (let i = 0; i < tracks.length; i++)  {
        tracksMap.insert(tracks[i].track.id);
    }
    let arr = tracksMap.getsTop(50);

    let currentUser = await SpotifyAPIObject.getCurrentUserProfile();
    let snapshot = await SpotifyAPIObject.createPlaylist(currentUser.id, "API-Test Playlist 1", false, false, "Testing API");
    let uris = [];
    for (let i = 0; i < arr.length; i++)  {
        uris.push("spotify:track:" + arr[i].data[0]);
    }
    let response = await SpotifyAPIObject.addItemsToPlaylist(snapshot.id, uris);
    console.log(response);

    /*
    let tracksTree = new CustomTree();

    for (let i = 0; i < tracks.length; i++)  {
        tracksTree.insert(tracks[i].track.id);
    }

    let arr = tracksTree.generateList();

    console.log(arr);
    */
   res.sendStatus(200);
});


 
/*--------------------------------------------------------------------------------
   Spotify Credentials 
--------------------------------------------------------------------------------*/

APP.post("/login", async (req, res) =>  {
    //Check we have a code in our request body, if we don't return false
    const code = req.body.code;
    if (code == null)  { 
        res.json({ result: false }); 
        return; 
    }

    //Check if we are alredy logged in, if so then return true
    let loginResult = SpotifyAPIObject.isLoggedIn();
    if (loginResult == true)  { 
        console.log("SpotifyApi Object is already logged in!")
        res.json({ result: loginResult }); 
        return; 
    }

    //If we aren't already logged in, then we generate the access token on the backend and return that we are logged in
    loginResult = await SpotifyAPIObject.generateAccessToken(code, REDIRECT_URI);
    console.log("SpotifyApi Object is " + (loginResult ? "logged" : "not logged") + " in!");
    res.json({ result: loginResult });
});

APP.post("/logout", async (req, res) =>  {
    SpotifyAPIObject.deleteAccessTokens();
    res.json({loggedOut: true});
});

/*--------------------------------------------------------------------------------
   Setup Server Listening On Port
--------------------------------------------------------------------------------*/

APP.listen(PORT, () =>  {console.log("Server is listening on port " + PORT)});