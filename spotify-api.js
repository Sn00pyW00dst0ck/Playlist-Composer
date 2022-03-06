const { contentType } = require('express/lib/response');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/**
 * A class written by Gabriel Aldous which handles all interaction with the SPOTIFY-WEB-API.
 * This is a work in progress. Much of this code is untested and should not be used yet...
 * TO DO:
 *      1) FIX AUTHENTICATION METHODS
 *      2) AUTOMATIC REFRESH TOKEN
 *      3) TEST GET INFORMATION FUNCTIONS
 *      4) WRITE AND TEST PLAYLIST CREATION / EDIT FUNCTIONS
 *      5) SEARCH FUNCTIONS
 */
class SpotifyAPI  {
    /**
     * Creates a new SpotifyAPI object
     * @param {string} _client_id the client_id for the SpotifyAPI object to use for authentication
     * @param {string} _client_secret the client_secret for the SpotifyAPI object to use for authentication
     */
    constructor(_client_id, _client_secret)  {
        this.client_id = _client_id || null;
        this.client_secret = _client_secret || null;
        this.access_token = null;
        this.refresh_token = null;
        this.expires_in = null;
    };

    /**
     * WORK IN PROGRESS METHOD!! 
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call generating 
     *          a new access_token, refresh_token, and expires_in
     */
    generateAccessToken = async (code, redirect_uri) =>  {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code"
            },
            headers: {
                "Authorization": 'Basic ' + (new Buffer(this.client_id + ':' + this.client_secret).toString('base64'))
            },
            json: true
        });
        console.log("RES: ");
        console.log(response);
        console.log(response.status);
        console.log(response.body);

        const data = await response.text();
        console.log(data);
        
        return data.body;
    }

    /**
     * WORK IN PROGRESS METHOD
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call generating 
     *          a new access_token, and expires_in given the refresh token
     */
    refreshAccessToken = async () =>  {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "post",
            headers:  {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) 
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            },
            json: true
        });

        const data = await response.json();
        return data.body;
    }

    /**
     * Get the logged in user's data (display_name, followers, id, ect.)
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call for 
     *          getting public user profile data
     */
    getCurrentUserData = async () =>  {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });
        
        const data = await response.json();
        return data;
    }

    /**
     * 
     * @param {int} limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {int} offset The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.'
     * @returns 
     */
    getCurrentUserPlaylists = async (limit, offset) =>  {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    /**
     * Get the public information of a given spotify user
     * @param {string} user_id The user's Spotify user ID.
     * @returns 
     */
    getUserInformation = async (user_id) =>  {
        const response = await fetch("https://api.spotify.com/v1/users/" + user_id, {
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    /**
     * 
     * @param {string} user_id The user's Spotify user ID.
     * @param {int} limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {int} offset The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.'
     * @returns Spotify JSON response with the playists found for the specified user
     */
    getUserPlaylists = async (user_id, limit, offset) =>  {
        const response = await fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists", {
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    /**
     * 
     * @param {string} playlist_id 
     * @returns Spotify JSON response with the tracks found in the specified playlist
     */
    getPlaylistItems = async (playlist_id) =>  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", {
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

}

module.exports = SpotifyAPI;