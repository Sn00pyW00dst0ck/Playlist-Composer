//Imports
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const SpotifyAPI = require('./spotify-api');
const CustomMap = require('./Data Structures/Map');
const CustomTree = require("./Data Structures/RedBlackTree.js");

//Setup the Port and express
const PORT = process.env.PORT || 3001;
const APP = express();
APP.use(cors());
APP.use(express.static(path.join(__dirname, 'Public')));
APP.use(express.json({ limit: '1mb', type: '*/*'}));

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


//Helper function for the /api/create-playlist route
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

//Helper function for the /api/create-playlist route
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

//Create a new playlist on Spotify for the logged in user's profile
APP.post("/api/create-playlist", async (req, res) =>  {
    //The request body should supply the (up to) 5 users to create playlist for
    console.log("Creating playlist");
    console.log(req.body);

    //Requests for playlists and tracks data with error handleing
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

    //Order tracks based on number of occurrances using an unordered_map
    let tracksMap = new CustomMap();
    for (let i = 0; i < tracks.length; i++)  {
        tracksMap.insert(tracks[i].track.id);
    }
    let arr = tracksMap.getsTop(50);

    /*
    //Order tracks based on number of occurrances using a RED/BLACK tree
    let tracksTree = new CustomTree();
    for (let i = 0; i < tracks.length; i++)  {
        tracksTree.insert(tracks[i].track.id);
    }
    let arr = tracksTree.generateList();
    console.log(arr);
    */

    //Spotify API calls to make the playlist & add all the songs
    let currentUser = await SpotifyAPIObject.getCurrentUserProfile();
    let createdPlaylist = await SpotifyAPIObject.createPlaylist(currentUser.id, "API-Test Playlist 1", false, false, "Testing API");
    let uris = [];
    for (let i = 0; i < arr.length; i++)  {
        uris.push("spotify:track:" + arr[i].data[0]);
    }
    let finalPlaylistSnapshot = await SpotifyAPIObject.addItemsToPlaylist(createdPlaylist.id, uris);

    //Send a response to the front end
    res.status(200).send(createdPlaylist.external_urls);
});

/*--------------------------------------------------------------------------------
   Spotify Credentials - logging in and out
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