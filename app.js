const express = require('express');
const { append } = require('express/lib/response');
const queryString = require('querystring');
const path = require('path');
const request = require('request');
const { URLSearchParams } = require('url');
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

let spotify_auth_uri = "https://accounts.spotify.com/authorize?";

APP.get("/login", (req, res) =>  {
    //This code will be replaced with spotify-api object later. This is for testing...
    let params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", CLIENT_ID);
    params.append("scopes", "user-read-private");
    params.append("redirect_uri", REDIRECT_URI);
    res.redirect(spotify_auth_uri + params.toString());
});

APP.get("/login/callback", async (req, res) =>  {
    //This code will be replaced with spotify-api object later. This is for testing...
    let code = req.query.code || null;
    let state = req.query.state || null;
    
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
        },
        json: true
    };
    request.post(authOptions, function(error, response, body)  {
        if (error || response.statusCode != 200)  {
            res.redirect("/#Invalid_Token");
        } else  {
            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };
            request.get(options, function(error, response, body)  {
                console.log(body);
            });
            res.redirect("http://localhost/3000/LoggedIn");
        }
    });

    /*
    Sample Fetch Code
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: post,
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            "Authorization": 'Basic ' + btoa(client_id + ":" + client_secret)
        },
        json: true
    });
    
    const data = await response.json();
    console.log(data);
    */

});

APP.get("/refresh_token", (req, res) =>  {

});

/*----------------------------------------------
   Setup Server Listening On Port
----------------------------------------------*/

APP.listen(PORT, () =>  {console.log("Server is listening on port " + PORT)});
