import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

import UserInfo from './UserInfo';
import SpotifyLoginButton from '../SpotifyLoginButton';

// Responsive navbar with page linking
// Pass in profile pic 
function Navbar(props) {
    const loggedIn = props.auth;

    return(
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                { props.children }

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
                        {/*
                        <li className={styles.navItem}>
                            <img className={styles.profilePic} src="http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"/>
                        </li>
                        <li className={styles.navItem}>|</li>
                        */}
                        <UserInfo icon="H">
                            
                        </UserInfo>
                        </>
                    }
                
                </ul>
                
            </div>
        </nav>

    )
}

export default Navbar;