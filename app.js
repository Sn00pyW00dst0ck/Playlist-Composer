const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const { URLSearchParams } = require('url');
const SpotifyAPI = require('./spotify-api');
require('dotenv').config();

//Setup the Port and express
const PORT = process.env.PORT || 4000;
const APP = express();

APP.use(express.static(path.join(__dirname, 'Public')));
APP.use(express.json({ limit: '1mb', type: '*/*'}));

//Test react interaction...
APP.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

/*--------------------------------------------------------------------------------
   Serving Webpages
--------------------------------------------------------------------------------*/


 
/*--------------------------------------------------------------------------------
   Spotify Credentials 
--------------------------------------------------------------------------------*/

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || null;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || null;
const REDIRECT_URI = "http://localhost:3001/login/callback";


//An object to be used for easy Spotify api calls
let SpotifyAPIObject = new SpotifyAPI(CLIENT_ID, CLIENT_SECRET);
const SCOPES = "user-read-private user-library-read user-top-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";

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

APP.get("/login/callback", async (req, res) =>  {
    //This code will be replaced with spotify-api object later. This is for testing...
    let code = req.query.code || null;
    let state = req.query.state || null;
    
    //----- Lets make some requests using the Spotify API object -----//

    //This line has the object get the access token for making spotify api calls
    await SpotifyAPIObject.generateAccessToken(code, REDIRECT_URI);

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

    //Redirect the user to the next webpage
    res.redirect("http://localhost/4000/LoggedIn");
});

/*
THIS HAS NOT BEEN FINALIZED YET...
I am trying to find a way for this to be done within the SpotifyAPI object...
It is difficult...
*/
APP.get("/refresh_token", (req, res) =>  {

});

/*--------------------------------------------------------------------------------
   Setup Server Listening On Port
--------------------------------------------------------------------------------*/

APP.listen(PORT, () =>  {console.log("Server is listening on port " + PORT)});
