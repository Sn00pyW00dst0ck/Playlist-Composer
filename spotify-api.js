const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



/**
 * A class written by Gabriel Aldous which handles all interaction with the SPOTIFY-WEB-API.
 * This is a work in progress. Much of this code is untested and should not be used yet...
 * 
 * TO DO:
 * 
 *      1) FIX AUTHENTICATION METHODS - look into using 'crypto' module to prevent Cross Site Scripting Attacks
 *          * ERROR HANDLING - HANDLE NON-200 STATUS CODE RESPONSES FROM SPOTIFY
 *              * UPDATE REQUIRED APP SCOPES LISTS
 *      2) AUTOMATIC REFRESH TOKEN
 *      3) TEST PRETTY MUCH EVERYTHING!!!
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
     * Generates a basic fetch option for calling the Spotify API endpoints.
     * @param {string} type a string for type of fetch request. 
     * 
     * Valid values: "GET", "POST", "PUT", "DELETE"
     * @returns JSON object representing 
     */
    #basicSpotifyFetchOptions(type)  {
        return {
            method: type,
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            },
            json: true
        };
    }

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
    async refreshAccessToken()  {
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
    Albums Methods
--------------------------------------------------------------------------------*/

    //DO WE NEED THIS SECTION??

    //NEEDS TESTING
    /**
     * 
     * @param {string} album_id 
     * @returns 
     */
    async getAlbum(album_id)  {
        const response = await fetch("https://api.spotify.com/v1/albums/" + album_id, this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} album_id 
     * @returns 
     */
    async getSeveralAlbums(album_ids)  {
        const params = new URLSearchParams();
        params.append("ids", album_ids.join(","));

        const response = await fetch("https://api.spotify.com/v1/albums?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} album_id 
     * @param {int} limit
     * @param {int} offset
     * @returns 
     */
    async getAlbumTracks(album_id, limit, offset)  {
        //Create URL Parameters
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);

        //Send request to Spotify API
        const response = await fetch("https://api.spotify.com/v1/albums/" + album_id + "/tracks", this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {int} limit
     * @param {int} offset
     * @returns 
     */
    async getSavedAlbums(limit, offset)  {
        //Create URL Parameters
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);

        //Send request to Spotify API
        const response = await fetch("https://api.spotify.com/v1/me/albums?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} album_ids
     * @returns 
     */
    async saveAlbums(album_ids)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = { ids: album_ids };

        //Send request to Spotify API
        const response = await fetch("https://api.spotify.com/v1/me/albums", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} album_ids
     * @returns 
     */
    async removeAlbums(album_ids)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("DELETE");
        fetchOptions.body = { ids: album_ids };
        
        //Send request to Spotify API
        const response = await fetch("https://api.spotify.com/v1/me/albums", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} album_ids
     * @returns 
     */
    async checkSavedAlbums(album_ids)  {
        //Create URL Parameters
        const params = new URLSearchParams();
        params.append("ids", album_ids.join(","));

        //Send request to Spotify API
        const response = await fetch("https://api.spotify.com/v1/me/albums/contains?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {int} limit
     * @param {int} offset
     * @returns 
     */
    async getNewReleases(limit, offset)  {
        //Create URL Parameters
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);

        //Send request to Spotify API
        const response = await fetch("https://api.spotify.com/v1/browse/new-releases?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }


/*--------------------------------------------------------------------------------
    Artists Methods
--------------------------------------------------------------------------------*/

    //DO WE NEED THIS SECTION??

    //NEEDS TESTING
    /**
     * 
     * @param {string} artist_id the spotify ID of the artist
     * @returns 
     */
    async getArtist(artist_id)  {
        const response = await fetch("https://api.spotify.com/v1/artists/" + artist_id, this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} artist_ids an array of spotify artist IDs. Maximum size: 50
     * @returns 
     */
    async getSeveralArtists(artist_ids)  {
        const params = new URLSearchParams();
        params.append("ids", artist_ids.join(","));

        const response = await fetch("https://api.spotify.com/v1/artists?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} artist_id the spotify ID of the artist
     * @param {Array<string>} include_groups string array of types of albums to return. Valid string values: "single", "album", "appears_on", "collaboration"
     * @param {int} limit 
     * @param {int} offset 
     * @returns 
     */
    async getArtistsAlbums(artist_id, include_groups, limit, offset)  {
        const params = new URLSearchParams();
        params.append("include_groups", include_groups.join(","));
        params.append("limit", limit);
        params.append("offset", offset);

        const response = await fetch("https://api.spotify.com/v1/artists/" + artist_id + "/albums", this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} artist_id the spotify ID of the artist
     * @returns 
     */
    async getArtistsTopTracks(artist_id)  {
        const response = await fetch("https://api.spotify.com/v1/artists/" + artist_id + "/top-tracks", this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} artist_id the spotify ID of the artist
     * @returns 
     */
    async getArtistsRelatedArtists(artist_id)  {
        const response = await fetch("https://api.spotify.com/v1/artists/" + artist_id + "/related-artists", this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

/*--------------------------------------------------------------------------------
    Shows Methods
--------------------------------------------------------------------------------*/

    //DO WE NEED THIS SECTION??

/*--------------------------------------------------------------------------------
    Episodes Methods
--------------------------------------------------------------------------------*/

    //DO WE NEED THIS SECTION??

/*--------------------------------------------------------------------------------
    Tracks Methods
--------------------------------------------------------------------------------*/
    //NEEDS TESTING
    /**
     * 
     * @param {string} track_id 
     * @returns 
     */
    async getTrack(track_id)  {
        const response = await fetch("https://api.spotify.com/v1/tracks/" + track_id, this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} track_ids array of track ID strings to get. Maximum: 50 IDs
     * @returns 
     */
    async getSeveralTracks(track_ids)  {
        const params = new URLSearchParams();
        params.append("ids", track_ids.join(","));

        const response = await fetch("https://api.spotify.com/v1/tracks?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {int} limit 
     * @param {int} offset 
     * @returns 
     */
    async getUserSavedTracks(limit, offset)  {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);

        const response = await fetch("https://api.spotify.com/v1/me/tracks?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} track_ids an array of track IDs to save for the current user
     * @returns 
     */
    async saveTracksForUser(track_ids)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = track_ids;
        
        const response = await fetch("https://api.spotify.com/v1/me/tracks", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} track_ids an array of track IDs to remove for the current user
     * @returns 
     */
    async removeTracksForUser(track_ids)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("DELETE");
        fetchOptions.body = track_ids;

        const response = await fetch("https://api.spotify.com/v1/me/tracks", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} track_ids an array of track IDs to get audio features for. Maximum 50 IDs
     * @returns 
     */
    async checkUserSavedTracks(track_ids)  {
        const params = new URLSearchParams();
        params.append("ids", track_ids.join(",")); //Take track_ids array and make it comma separated string...

        const response = await fetch("https://api.spotify.com/v1/me/tracks/contains?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} track_ids an array of track IDs to get audio features for. Maximum 100 IDs
     * @returns 
     */
    async getTracksAudioFeatures(track_ids)  {
        const params = new URLSearchParams();
        params.append("ids", track_ids.join(",")); //Take track_ids array and make it comma separated string...

        const response = await fetch("https://api.spotify.com/v1/audio-features?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} track_id 
     * @returns 
     */
    async getTrackAudioFeatures(track_id)  {
        const response = await fetch("https://api.spotify.com/v1/audio-features/" + track_id, this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} track_id the spotify track ID
     * @returns 
     */
    async getTrackAudioAnalysis(track_id)  {
        const response = await fetch("https://api.spotify.com/v1/audio-analysis/" + track_id, this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING & FINISHING URLSearchParams
    /**
     * 
     * @param {Array<string>} seed_artists
     * @param {Array<string>} seed_genres 
     * @param {Array<string>} seed_tracks 
     * @param {int} limit 
     * @returns 
     */
    async getRecommendations(seed_artists, seed_genres, seed_tracks, limit)  {
        const params = new URLSearchParams();
        params.append("seed_artists", seed_artists.join(","));
        params.append("seed_genres", seed_genres.join(","));
        params.append("seed_tracks", seed_tracks.join(","));
        params.append("limit", limit);
        
        const response = await fetch("https://api.spotify.com/v1/recommendations?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

/*--------------------------------------------------------------------------------
    Search Methods
--------------------------------------------------------------------------------*/
    //NEEDS TESTING
    /**
     * 
     * @param {string} query 
     * @param {Array<string>} type_array 
     * @param {string} include_external 
     * @param {int} limit 
     * @param {int} offset 
     * @returns 
     */
    async search(query, type_array, include_external, limit, offset)  {
        //Create URL Search Parameters
        const params = new URLSearchParams();
        params.append("q", query);
        params.append("type", type_array.join(","));
        params.append("include_external", include_external);
        params.append("limit", limit);
        params.append("offset", offset);
        
        //Make Request to Spotify API
        const response = await fetch("https://api.spotify.com/v1/recommendations?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
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
        const response = await fetch("https://api.spotify.com/v1/me", this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

    /**
     * 
     * @param {string} type valid values : "tracks", "artists"
     * @returns JSON object with Spotify API call response
     */
    async getCurrentUserTopItems(type)  {
        const params = new URLSearchParams();
        params.append("limit", 20);
        params.append("offset", 0);
        params.append("time_range", "medium_term");

        const response = await fetch("https://api.spotify.com/v1/me/top/" + type + "?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

    /**
     * Get the public information of a given spotify user
     * @param {string} user_id The user's Spotify user ID.
     * @returns a JSON object with the body of the SPOTIFY-WEB-API call for 
     *          getting public user profile data
     */
    async getUserProfile(user_id)  {
        const response = await fetch("https://api.spotify.com/v1/users/" + user_id, this.#basicSpotifyFetchOptions("GET"));
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
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = { public : _public };

        const response = await fetch("https://api.spotify.com/v1/playlist/" + playlist_id + "/followers", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @returns 
     */
    async unfollowPlaylist()  {
        const response = await fetch("https://api.spotify.com/v1/playlist/" + playlist_id + "/followers", this.#basicSpotifyFetchOptions("DELETE"));
        const data = await response.json();
        return data;
    }

    //NEEDS WRITING AND TESTING
    /**
     * Get the current user's followed artists
     * @param {int} limit 
     * @param {int} after 
     * @returns 
     */
    async getFollowedArtists(limit, after)  {
        const params = new URLSearchParams();
        params.append("type", "artist");
        params.append("after", after);
        params.append("limit", limit)

        const response = await fetch("https://api.spotify.com/v1/me/following" + params.toString(), this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} ids an array of Spotify IDs of artists / users
     * @param {string} type The ID type. Allowed values: "artist", "user"
     * @returns 
     */
    async followArtistsOrUsers(ids, type)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = { ids : ids.join(",") };

        const response = await fetch("https://api.spotify.com/v1/me/following?type=" + type, fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} ids an array of Spotify IDs of artists / users
     * @param {string} type The ID type. Allowed values: "artist", "user"
     * @returns 
     */
    async unfollowArtistsOrUsers(ids, type)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("DELETE");
        fetchOptions.body = { ids : ids.join(",") };

        const response = await fetch("https://api.spotify.com/v1/me/following?type=" + type, fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} ids an array of Spotify IDs of artists / users
     * @param {string} type The ID type. Allowed values: "artist", "user"
     * @returns 
     */
    async checkUserFollowsArtistsOrUsers(ids, type)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("GET");
        fetchOptions.body = { ids : ids.join(",") };

        const response = await fetch("https://api.spotify.com/v1/me/following/contains?type=" + type, fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id the spotify ID of the playlist to check
     * @param {Array<string>} ids an array of Spotify IDs of artists / users
     * @returns 
     */
    async checkUsersFollowsPlaylist(playlist_id, ids)  {
        const params = new URLSearchParams();
        params.append("ids", ids.join(","));

        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/followers/contains?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

/*--------------------------------------------------------------------------------
    Playlist Methods
--------------------------------------------------------------------------------*/
    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id the playlist id of the playlist to get information on
     * @returns 
     */
    async getPlaylist(playlist_id)  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id, this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id 
     * @param {string} newName 
     * @param {bool} newPublic 
     * @param {bool} newCollaborative 
     * @param {string} newDescription 
     * @returns 
     */
    async changePlaylistDetails(playlist_id, newName, newPublic, newCollaborative, newDescription)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = {
            name: newName,
            public: newPublic,
            collaborative: newCollaborative,
            description: newDescription
        };

        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id, fetchOptions);
        const data = await response.json();
        return data;
    }

    /**
     * Get a JSON object from Spotify with information about a playlist's items (tracks).
     * @param {string} playlist_id the playlist's Spotify ID.
     * @returns Spotify JSON response with the tracks found in the specified playlist
     */
    async getPlaylistItems(playlist_id)  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", this.#basicSpotifyFetchOptions("GET"));        
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * Add tracks to the specified playlist
     * @param {string} playlist_id the playlist's Spotify ID. 
     * @param {Array<string>} uris array of spotify track uris to add to the playlist (cannot exceed 100 track uris)
     * @returns 
     */
    async addItemsToPlaylist(playlist_id, uris)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("POST");
        fetchOptions.body = { "uris" : uris };

        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING & WRITING
    /**
     * 
     * @param {string} playlist_id 
     * @param {Array<strings>} uris 
     * @param {int} range_start 
     * @param {int} insert_before 
     * @param {int} insert_after 
     * @param {string} snapshot_id 
     * @returns 
     */
    async updatePlaylistItems(playlist_id, uris, range_start, insert_before, insert_after, snapshot_id)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = { "uris" : uris };

        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {Array<string>} track_ids array of spotify track IDs to remove
     * @param {string} snapshot_id the snapshot of the playlist to make edits to
     * @returns 
     */
    async removePlaylistItems(track_ids, snapshot_id)  {
        //Build the Spotify URI from the track IDs
        const removeTrackObject = [];
        for (let i = 0; i < track_ids.length; i++)  {
            removeTrackObject.push({ "uri" : ("spotify:track:" + track_ids[i]) });
        }

        //Create the fetch options
        let fetchOptions = this.#basicSpotifyFetchOptions("DELETE");
        fetchOptions.body = {
            "tracks": removeTrackObject,
            "snapshot_id" : snapshot_id
        };

        //Call the Spotify API
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks", fetchOptions);

        //Parse and return response
        const data = await response.json();
        return data;
    }

    /**
     * 
     * @param {int} limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
     * @param {int} offset The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.'
     * @returns 
     */
    async getCurrentUserPlaylists(limit, offset)  {
        const params = new URLSearchParams();
        params.append("limit", limit || 20);
        params.append("offset", offset || 0);

        const response = await fetch("https://api.spotify.com/v1/me/playlists?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));
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
    async getUserPlaylists(user_id, limit, offset)  {
        const params = new URLSearchParams();
        params.append("limit", limit || 20);
        params.append("offset", offset || 0);

        const response = await fetch("https://api.spotify.com/v1/users/" + user_id + "/playlists?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));
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
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = {
            "name" : name,
            "public" : _public,
            "collaborative" : collaborative,
            "description" : description
        };

        const response = await fetch("https://api.spotify.com/v1/user/" + user_id + "/playlists", fetchOptions);
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {int} limit 
     * @param {int} offset 
     * @returns 
     */
    async getFeaturedPLaylists(limit, offset)  {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);

        const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} category_id 
     * @param {int} limit 
     * @param {int} offset 
     * @returns 
     */
    async getCategorysPlaylists(category_id, limit, offset)  {
        const params = new URLSearchParams();
        params.append("limit", limit);
        params.append("offset", offset);

        const response = await fetch("https://api.spotify.com/v1/browse/categories/" + category_id + "/playlists?" + params.toString(), this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id 
     * @returns a set of images
     */
    async getPlaylistCoverImage(playlist_id)  {
        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/images", this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

    //NEEDS TESTING
    /**
     * 
     * @param {string} playlist_id 
     * @param {string} image_string 
     * @returns 
     */
    async addCustomPlaylistCoverImage(playlist_id, image_string)  {
        let fetchOptions = this.#basicSpotifyFetchOptions("PUT");
        fetchOptions.body = image_string;

        const response = await fetch("https://api.spotify.com/v1/playlists/" + playlist_id + "/images", fetchOptions);
        const data = await response.json();
        return data;
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
        const response = await fetch("https://api.spotify.com/v1/categories", this.#basicSpotifyFetchOptions("GET"));
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
        const response = await fetch("https://api.spotify.com/v1/categories/" + category_id, this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

/*--------------------------------------------------------------------------------
    Genres Methods
--------------------------------------------------------------------------------*/
    //NEEDS TESTING
    /**
     * Get a list of available genre seeds for use with recommendation methods...
     * @returns 
     */
    async getAvailableGenreSeeds()  {
        const response = await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

/*--------------------------------------------------------------------------------
    Spotify Web Player Methods
--------------------------------------------------------------------------------*/

    //DO WE NEED THIS SECTION?? - Probably...?

/*--------------------------------------------------------------------------------
    Markets Methods
--------------------------------------------------------------------------------*/

    //NEEDS TESTING
    /**
     * Get the list of markets where Spotify is available 
     * @returns A markets object with an array of country codes
     */
    async getAvailableMarkets()  {
        const response = await fetch("https://api.spotify.com/v1/markets", this.#basicSpotifyFetchOptions("GET"));
        const data = await response.json();
        return data;
    }

}

//Export the SpotifyAPI class so Node.js require statements can get it
module.exports = SpotifyAPI;