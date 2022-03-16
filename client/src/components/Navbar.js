import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

// Responsive navbar with page linking
function Navbar() {
    // Onclick handling for profile button
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return(
        <nav className='navbar'>
            <div className='navbar-container'>
                {/* replace with app logo in future, routes to landing page */}
                <Link to='/' className='navbar-logo'>
                    Playlist Composer
                </Link>
                {/* Navbar Items */}
                <ul className='nav-menu'>
                    <li className='nav-item'>
                        <Link to='/choose-users'>
                            Create
                        </Link>
                    </li>

                    <li className='nav-item'>|</li>
                    
                    <li className='nav-item'>
                        <a href="http://localhost:3001/login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar;