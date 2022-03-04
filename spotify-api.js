import { Request, Response, NextFunction } from 'express'
require('dotent').config();

/**
 * A class written by Gabriel Aldous which handles all interaction with the SPOTIFY-WEB-API.
 * This is a work in progress. Much of this code is untested and should not be used yet...
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
     * 
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call generating 
     *          a new access_token, refresh_token, and expires_in
     */
    generateAccessToken = async () =>  {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "post",
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
        return data.body;
    }

    /**
     * 
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
     * 
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call for 
     *          getting public user profile data
     */
    getCurrentUserData = async () =>  {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.access_token
            },
            json: true
        });

        const data = await response.json();
        return data.body;
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
        return data.body;
    }


    /**
     * 
     * @param {string} user_id The user's Spotify user ID.
     * @param {int} limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {int} offset The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.'
     * @returns 
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
        return data.body;
    }

    /**
     * 
     * @param {string} playlist_id 
     * @returns 
     */
    getPlaylistItems = async (playlist_id) =>  {
        const response = await fetch("https://api.spotify.com/v1/playlists/playlist_id/tracks", {
            method: "get",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data.body;
    }



}

module.exports = SpotifyAPI;