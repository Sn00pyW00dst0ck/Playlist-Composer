const express = require('express');
const { append } = require('express/lib/response');
const path = require('path');
const request = require('request');
const { URLSearchParams } = require('url');
const SpotifyAPI = require('./spotify-api');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const APP = express();

APP.use(express.static(path.join(__dirname, 'Public')));
APP.use(express.json({ limit: '1mb', type: '*/*'}));

//Test react interaction...
APP.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

/*----------------------------------------------
   Spotify Credentials 
----------------------------------------------*/

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || null;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || null;
const REDIRECT_URI = "http://localhost:3001/login/callback";


//An object to be used for easy Spotify api calls
let SpotifyAPIObject = new SpotifyAPI(CLIENT_ID, CLIENT_SECRET);
const SCOPES = "user-read-private";

APP.get("/login", (req, res) =>  {
    //This code will be replaced with spotify-api object later. This is for testing...
    let params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", CLIENT_ID);
    params.append("scopes", SCOPES);
    params.append("redirect_uri", REDIRECT_URI);
    //Redirect the user to the Spotify Login Page
    res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
});

APP.get("/login/callback", async (req, res) =>  {
    //This code will be replaced with spotify-api object later. This is for testing...
    let code = req.query.code || null;
    let state = req.query.state || null;
    
    //Lets make some requests using the Spotify API object
    await SpotifyAPIObject.generateAccessToken(code, REDIRECT_URI);
    let user = await SpotifyAPIObject.getCurrentUserData();
    let lists = await SpotifyAPIObject.getCurrentUserPlaylists();
    let tracks = await SpotifyAPIObject.getPlaylistItems(lists.items[1].id);
    for (let i = 0; i < tracks.items.length; i++)  {
        console.log(tracks.items[i].track.name + ", " +  tracks.items[i].track.id);
    }

    //Redirect the user to the next webpage
    res.redirect("http://localhost/3000/LoggedIn");
});

APP.get("/refresh_token", (req, res) =>  {

});

/*----------------------------------------------
   Setup Server Listening On Port
----------------------------------------------*/

APP.listen(PORT, () =>  {console.log("Server is listening on port " + PORT)});
