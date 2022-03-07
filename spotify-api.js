const { contentType } = require('express/lib/response');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/**
 * A class written by Gabriel Aldous which handles all interaction with the SPOTIFY-WEB-API.
 * This is a work in progress. Much of this code is untested and should not be used yet...
 * TO DO:
 *      1) FIX AUTHENTICATION METHODS
 *      **) ERROR HANDLING!!!!!
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

/*--------------------------------------------------------------------------------
    OAuth2 Authentication Methods
--------------------------------------------------------------------------------*/

    /**
     * Generates an access_token & refresh_token given a access code and redirect url
     */
    async generateAccessToken(code, redirect_uri)  {
        //Add the form parameters for the Spotify OAuth token...
        const params = new URLSearchParams();
        params.append("code", code);
        params.append("redirect_uri", redirect_uri);
        params.append("grant_type", "authorization_code");

        //Send the request to Spotify
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            url: "https://accounts.spotify.com/api/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": 'Basic ' + (new Buffer(this.client_id + ':' + this.client_secret).toString('base64'))
            },
            json: true, 
            body: params
        });
        const data = await response.json();

        //Set the access_token, refresh_token, and expires in
        this.access_token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.expires_in = data.expires_in;
    }

    /**
     * WORK IN PROGRESS METHOD
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call generating 
     *          a new access_token, and expires_in given the refresh token
     */
    refreshAccessToken = async () =>  {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
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

/*--------------------------------------------------------------------------------
    Users Methods
--------------------------------------------------------------------------------*/

    /**
     * Get the logged in user's data (display_name, followers, id, ect.)
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call for 
     *          getting public user profile data
     */
    async getCurrentUserProfile()  {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });
        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} type valid values : "tracks", "artists"
     * @returns JSON object with Spotify API call response
     */
    async getCurrentUserTopItems(type)  {
        const response = await fetch("https://api.spotify.com/v1/me/top/" + type, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * Get the public information of a given spotify user
     * @param {string} user_id The user's Spotify user ID.
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call for 
     *          getting public user profile data
     */
    async getUserProfile(user_id)  {
        const response = await fetch("https://api.spotify.com/v1/users/" + user_id, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id 
     * @param {boolean} public boolean for if following playlist should be public profile information
     * @returns 
     */
    async followPlaylist(playlist_id, _public)  {
        const response = await fetch("https://api.spotify.com/v1/playlist/" + playlist_id + "/followers", {
            method : "PUT",
            headers : {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json : true,
            body : {
                public : _public
            }
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @returns 
     */
    async unfollowPlaylist()  {
        const response = await fetch("https://api.spotify.com/v1/playlist/" + playlist_id + "/followers", {
            method : "DELETE",
            headers : {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json : true
        });

        const data = await response.json();
        return data;
    }

    //NEEDS WRITING AND TESTING
    /**
     * 
     */
    async getFollowedArtists()  {

    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} ids 
     * @param {string} type 
     * @returns 
     */
    async followArtistsOrUsers(ids, type)  {
        const response = await fetch("https://api.spotify.com/v1/me/following?type=" + type, {
            method : "PUT",
            headers : {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json : true, 
            body : {
                ids : ids
            }
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} ids 
     * @param {string} type 
     * @returns 
     */
    async unfollowArtistsOrUsers(ids, type)  {
        const response = await fetch("https://api.spotify.com/v1/me/following?type=" + type, {
            method : "DELETE",
            headers : {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json : true, 
            body : {
                ids : ids
            }
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} ids 
     * @param {string} type 
     * @returns 
     */
    async checkUserFollowsArtistsOrUsers(ids, type)  {
        const response = await fetch("https://api.spotify.com/v1/me/following/contains?type=" + type, {
            method : "GET",
            headers : {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json : true, 
            body : {
                ids : ids
            }
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id 
     * @param {Array<string>} ids 
     * @returns 
     */
    async checkUsersFollowsPlaylist(playlist_id, ids)  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/followers/contains", {
            method : "GET",
            headers : {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json : true, 
            body : {
                ids : ids
            }
        });

        const data = await response.json();
        return data;
    }

/*--------------------------------------------------------------------------------
    Playlist Methods
--------------------------------------------------------------------------------*/

    async getPlaylist()  {

    }

    async changePlaylistDetails()  {

    }

    /**
     * Get a JSON object from Spotify with information about a playlist's items (tracks).
     * @param {string} playlist_id the playlist's Spotify ID.
     * @returns Spotify JSON response with the tracks found in the specified playlist
     */
    async getPlaylistItems(playlist_id)  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id the playlist's Spotify ID. 
     * @param {Array<string>} uris array of spotify track uris to add to the playlist (cannot exceed 100 track uris)
     * @returns 
     */
    async addItemsToPlaylist(playlist_id, uris)  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true, 
            body: {
                "uris" : uris
            }
        });

        const data = await response.json();
        return data;
    }

    async updatePlaylistItems()  {

    }

    async removePlaylistItems()  {

    }

    /**
     * 
     * @param {int} limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {int} offset The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.'
     * @returns 
     */
    async getCurrentUserPlaylists(limit, offset)  {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} user_id The user's Spotify user ID.
     * @param {int} limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {int} offset The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.'
     * @returns Spotify JSON response with the playists found for the specified user
     */
    async getUserPlaylists(user_id, limit, offset)  {
        const response = await fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} user_id The user's Spotify user ID.
     * @param {string} name The name for the new playlist
     * @param {boolean} public Whether the new playlist should be public or not
     * @param {boolean} collaborative Whether the new playlist should be collaborative or not ('public' must be false if this is true)
     * @param {string} description The description for the new playlist
     * @returns 
     */
    async createPlaylist(user_id, name, _public, collaborative, description)  {
        const response = await fetch("https://api.spotify.com/v1/user/" + user_id + "/playlists", {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true, 
            body: {
                "name" : name,
                "public" : _public,
                "collaborative" : collaborative,
                "description" : description
            }
        });

        const data = await response.json();
        return data;
    }

    async getFeaturedPLaylists()  {

    }

    async getCategorysPlaylists()  {

    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id 
     * @returns a set of images
     */
    async getPlaylistCoverImage(playlist_id)  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/images", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    async addCustomPlaylistCoverImage()  {

    }

/*--------------------------------------------------------------------------------
    Categories Methods
--------------------------------------------------------------------------------*/

    //NEEDS TESTING
    /**
     * 
     * @returns 
     */
    async getSeveralBrowseCategories()  {
        const response = await fetch("https://api.spotify.com/v1/categories", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} category_id 
     * @returns 
     */
    async getSingleBrowseCategory(category_id)  {
        const response = await fetch("https://api.spotify.com/v1/categories/" + category_id, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        });

        const data = await response.json();
        return data;
    }

/*--------------------------------------------------------------------------------
    Markets Methods
--------------------------------------------------------------------------------*/

    //NEEDS TESTING
    /**
     * Get the list of markets where Spotify is available 
     * @returns A markets object with an array of country codes
     */
    async getAvailableMarkets()  {
        const response = await fetch("https://api.spotify.com/v1/markets", {
            method: "GET",
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

//Export the SpotifyAPI class so Node.js require statements can get it
module.exports = SpotifyAPI;