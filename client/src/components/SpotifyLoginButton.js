/*****
 * File By Gabriel Aldous...
 * 
 * Log In With Spotify Button
 * 
 */

import React from 'react';
import styles from './SpotifyLoginButton.module.css';

const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "5e19ecffcdcc432db63b351ad3e75e9d";
const scopes = "user-read-private user-library-read user-top-read playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public";
const authURL = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;

function SpotifyLoginButton()  {
    return (
        <div class={styles.SpotifyLoginButtonContainer}>
            <a class={styles.SpotifyLoginButton} href={authURL}>LOGIN WITH SPOTIFY</a>
        </div>
    );
}

export default SpotifyLoginButton;