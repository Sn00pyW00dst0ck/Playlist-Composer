/*****
 * File By Gabriel Aldous...
 * 
 * Log In With Spotify Button
 * 
 */

import React from 'react';

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "c5a4e13b8ccc440e884ff132814db5d6";
const scopes = "user-read-private user-library-read user-top-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";
const authURL = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

function SpotifyLoginButton() {
    return (
        <div>
            <a href={authURL}>LOGIN WITH SPOTIFY</a>
        </div>
    );
}

export default SpotifyLoginButton;