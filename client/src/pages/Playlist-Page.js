import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { Audio } from  'react-loader-spinner';

import styles from "./Playlist-Page.module.css";

import useFetch from "../customHooks/useFetch";

function PlaylistPage()  {
    const { user1, user2, user3, user4, playlistName, playlistDesc, playlistSize, generationMethod } = useParams();

    let users = [user1, user2, user3, user4].filter((e) =>  {
        return e !== 'null' && e !== '' && e !== null;
    });

    let playlistOptions = {
        playlistName: playlistName,
        playlistDesc: playlistDesc,
        playlistSize: playlistSize
    }

    const [options, setOptions] = useState({
        method: "POST",
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({users:users, playlistOptions:playlistOptions, generationMethod: generationMethod})
    });
    
    const {isLoading, responseData, fetchError } = useFetch("/api/create-playlist", options);

    return (
        <>
        <section className={styles.mainLanding}>
            {/* Loading Screen for playlist preview page */}
            {isLoading && <>
                    <Audio
                        height="250"
                        width="500"
                        color='#00a96f'
                        ariaLabel='loading'
                    />
                    <h1>Your playlist is being created ... </h1>
            </>}
            
            {/* iframe with spotify playlist embedded */}
            {(!isLoading && responseData != null) && 
            <>
                <div className={styles.previewContainer}>
                    <div className={styles.previewTitleLinkContainer}>
                        <h1 className={styles.PageTitle}>Playlist Preview</h1>
                        <a href={responseData.spotify} className={styles.lintToSpotify}>View in Spotify</a>
                    </div>
                    <iframe  src = {`https://open.spotify.com/embed/${responseData.spotify.slice(responseData.spotify.length - 31)}?utm_source=generator`} width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">Loading Playlist Content</iframe>
                </div>
                
            </>}

        </section>  
        </>
    );
}

export default PlaylistPage;