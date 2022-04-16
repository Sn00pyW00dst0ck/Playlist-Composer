import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

import SpotifyLoginButton from './SpotifyLoginButton';

// Responsive navbar with page linking
// Pass in profile pic 
function Navbar({auth}) {
    // Onclick handling for profile button
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const loggedIn = auth; 

    const logout = () => {
        const response = fetch("/logout");
        console.log("logged out : ", response);
        loggedIn = false;
    }

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>

                {/* replace with app logo in future, remove route in future */}
                <Link to='/' className={styles.navbarLogo}>
                    Playlist Composer
                </Link>

                {/* Navbar Items */}
                <ul className={styles.navMenu}>
                
                    {/* Navbar if user is logged out */}
                    {!loggedIn && 
                        <>
                        <li className={styles.navItem}>
                            <SpotifyLoginButton />
                        </li>
                        </>
                    }

                    {/* Navbar if user is logged in */}
                    {loggedIn && 
                        <>
                        <li className={styles.navItem}>
                            {/* REPLACE With user Profile Picture */}
                            <img className={styles.profilePic} src="http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"/>
                        </li>
                        <li className={styles.navItem}>|</li>
                        <li className={styles.navItem}>
                            {/* REPLACE WITH Node Path or maybe component */}
                            <Link onClick={logout} to="/">Logout</Link>
                        </li>
                        </>
                    }
                    
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;