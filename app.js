const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const { URLSearchParams } = require('url');
const SpotifyAPI = require('./spotify-api');
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

//An object to be used for easy Spotify api calls
let SpotifyAPIObject = new SpotifyAPI(CLIENT_ID, CLIENT_SECRET);
const SCOPES = "user-read-private user-library-read user-top-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";


/*--------------------------------------------------------------------------------
   React Interaction API
--------------------------------------------------------------------------------*/

APP.get("/api/logged-in", (req, res) =>  {
    res.json({loggedIn: SpotifyAPIObject.isLoggedIn()})
});

APP.get("/api/current-user", async (req, res) =>  {
    const user = await SpotifyAPIObject.getCurrentUserProfile();
    if (user.status == 401)  { 
        res.json(null);
    }
    res.status(200).json(user)
});

/*--------------------------------------------------------------------------------
   Spotify Credentials 
--------------------------------------------------------------------------------*/

//THIS GET WILL SOON BE REDUNDANT AND REMOVED
/*
APP.get("/login", (req, res) =>  {
    //This code will be replaced with spotify-api object later. This is for testing...
    let params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", CLIENT_ID);
    params.append("scope", SCOPES);
    params.append("redirect_uri", REDIRECT_URI);
    //Redirect the user to the Spotify Login Page
    res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
});
*/


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

//THIS CALLBACK WILL PROBABLY BE REMOVED OR HEAVILY CHANGED
/*
APP.get("/login/callback", async (req, res) =>  {
    //This code will be replaced with spotify-api object later. This is for testing...
    let code = req.query.code || null;
    let state = req.query.state || null;
    
    //----- Lets make some requests using the Spotify API object -----//

    //This line has the object get the access token for making spotify api calls
    await SpotifyAPIObject.generateAccessToken(code, REDIRECT_URI);
    console.log("SPOTIFY-API-OBJECT LOGGED IN!");
    
    /*
    //Let's print songs from a playlist belonging to the current user...
    console.log("Songs belonging to a playlist of current user: ");
    let lists = await SpotifyAPIObject.getCurrentUserPlaylists();
    let tracks = await SpotifyAPIObject.getPlaylistItems(lists.items[0].id);
    for (let i = 0; i < tracks.items.length; i++)  {
        console.log(tracks.items[i].track.name + ", " +  tracks.items[i].track.id);
    }
    console.log();
    //Let's Print the Current Users Top Tracks...
    console.log("Current User Top Tracks: ")
    let artists = await SpotifyAPIObject.getCurrentUserTopItems("tracks");
    for (let i = 0; i < artists.items.length; i++)  {
        console.log(artists.items[i].name);
    }
    console.log();
    //Let's print another user's public information...
    let other = await SpotifyAPIObject.getUserProfile("apml.trickster");
    console.log("OTHER USER PROFILE:");
    console.log(other);
    console.log();
    //Let's print some songs from a playlist belonging to that other user...
    console.log("Songs from one of the other users playlists:");
    let othersPlaylist = await SpotifyAPIObject.getUserPlaylists("apml.trickster");
    let othersPlaylistTracks = await SpotifyAPIObject.getPlaylistItems(othersPlaylist.items[0].id);
    for (let i = 0; i < othersPlaylistTracks.items.length; i++)  {
        console.log(othersPlaylistTracks.items[i].track.name + ", " +  othersPlaylistTracks.items[i].track.id);
    }
    console.log();
    /

   res.sendStatus(200);
});
*/

/*--------------------------------------------------------------------------------
   Setup Server Listening On Port
--------------------------------------------------------------------------------*/

APP.listen(PORT, () =>  {console.log("Server is listening on port " + PORT)});
