import React from 'react'
import {useState} from 'react'
import Searchbar from '../components/Searchbar'
import { Link } from 'react-router-dom';


function SelectUsersPage() {

    //A use state for each user
    const [user1, setUser1] = useState(null);
    const [user2, setUser2] = useState(null);
    const [user3, setUser3] = useState(null);
    const [user4, setUser4] = useState(null);

    return(
        <>
        {/* Main Content */}
        <section className="landing-main">
            <h1 className="select-header">Select Other Users To Customize Playlist For</h1>
            <br></br>
            <p> 
                Enter up to 4 other Spotify usernames. 
                These users will be used to create the 
                merged playlist. Leave a username blank 
                if you have fewer than 4 other users to 
                create a playlist for.
            </p>

            {/* Put 4 Searchbars on the page, they each can update one specific name */}
            <Searchbar setUser={setUser1} />
            <Searchbar setUser={setUser2} />
            <Searchbar setUser={setUser3} />
            <Searchbar setUser={setUser4} />
            
            {/* Button that changes the options for the fetch and triggers the useFetch hook to call our backend */}
            <button className='playlist-btn'><Link to={`/preview-playlist/${user1}/${user2}/${user3}/${user4}` } >Select Users</Link></button>
        
        </section>
        </>
    ) 
}

export default SelectUsersPage