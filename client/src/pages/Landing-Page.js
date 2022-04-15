import React from 'react'
import { Link } from 'react-router-dom';
import SpotifyLoginButton from '../components/SpotifyLoginButton';
import Hero from "../components/Landing Page Components/Landing-Hero";
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
            <h1>About</h1>
            <div className="about">
                <div className="col">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</div>
                <div className="col">laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                    eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
            </div>
            
        </section>

        <div className="spacer layer2"></div>
        
        {/* Footer Section */}
        <section className="landing-footer">
            <h1>Footer</h1>
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