import React, {useState} from 'react'
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
                            <Link to='/choose-users'>
                                Create
                            </Link>
                        </li>
                        <li className={styles.navItem}>|</li>
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
                            <a href="https://www.spotify.com/logout/">Logout</a>
                        </li>
                        </>
                    }
                    
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;