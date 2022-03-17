import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

// Responsive navbar with page linking
// Pass in profile pic 
function Navbar(props) {
    // Onclick handling for profile button
    const [click, setClick] = useState(false);
    const isLoggedin = props.isLoggedin
    const handleClick = () => setClick(!click);

    return(
        <nav className='navbar'>
            <div className='navbar-container'>

                {/* replace with app logo in future, remove route in future */}
                <Link to='/' className='navbar-logo'>
                    Playlist Composer
                </Link>

                {/* Navbar Items */}
                <ul className='nav-menu'>
                
                    {/* Navbar if user is logged out */}
                    {!isLoggedin && 
                        <>
                        <li className='nav-item'>
                            <Link to='/choose-users'>
                                Create
                            </Link>
                        </li>
                        <li className='nav-item'>|</li>
                        <li className='nav-item'>
                                <a href="http://localhost:3001/login">Login</a>
                        </li>
                        </>
                    }

                    {/* Navbar if user is logged in */}
                    {isLoggedin && 
                        <>
                        <li className='nav-item'>
                            {/* REPLACE With user Profile Picture */}
                            <img className="profile-pic" src="http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png"/>
                        </li>
                        <li className='nav-item'>|</li>
                        <li className='nav-item'>
                                {/* REPLACE WITH Node Path */}
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