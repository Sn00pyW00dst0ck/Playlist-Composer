import React from "react";
import { Link } from "react-router-dom";
import SpotifyLoginButton from "../SpotifyLoginButton";
import styles from "./Landing-Hero.module.css";


const Hero = ({auth}) =>  {
    const loggedIn = auth;
    return (
        <>
            <section className={styles.LandingHero}>
                <h1 className={styles.LandingHeroTitle}>Playlist Composer</h1>
                <p className={styles.LandingHeroText}>
                    creating Spotify playlists for groups has never been easier
                </p>

                {loggedIn ? 
                    <div className={styles.LandingHeroButtonContainer}>
                        <Link to={"/choose-users"} className={styles.LandingHeroButton}>Create Playlist</Link> 
                    </div>
                    : 
                    <SpotifyLoginButton />
                }
            </section>
        </>
    );

}

export default Hero;