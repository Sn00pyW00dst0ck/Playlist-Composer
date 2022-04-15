import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import SpotifyLoginButton from '../components/SpotifyLoginButton';
import Hero from "../components/Landing Page Components/Landing-Hero";
import Tree from "../imgs/newTree.png";
import Hash from "../imgs/hash.png"
import '../index.css';

// Main Content area for landing page
function LandingPage({auth}) {



    return(
        <>
        {/* Header Section */}
        <Hero auth={auth}/>

        <div className="spacer layer1"></div>

        {/* About Section */}
        <section className="landing-about">
            <h1 className='about-header'>How it Works</h1>
            <br></br>
            <div className="about">
                <div className="info-col">
                    <br></br>
                    <h2>Creating Spotify playlists is slow and time consuming. People have different tastes and it is difficult to create a playlist to satisfy multiple people...</h2> 
                    <br></br>
                    <h2>Our Playlist Composer seeks to solve this problem by taking in songs from each selected user's personal playlists and aggregating them into one large common playlist.</h2>
                </div>
                <div className="img-col"><img src={Tree} /> <img src={Hash} /></div>
            </div>
            
        </section>

        <div className="spacer layer2"></div>
        
        {/* Footer Section */}
        <section className="landing-footer">
            <h1 className='footer-header'>Meet the Creators</h1>
            <div className="founders">
                <div className='col'>GABE Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</div>
                <div className='col'>PATRICK CARD</div>
                <div className='col'>ANDY CARD</div>
            </div>
        </section>
        </>
    ); 
}

export default LandingPage;