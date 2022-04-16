import React from 'react'
import {useState} from 'react'
import Searchbar from '../components/Searchbar'
import { Link } from 'react-router-dom';
import styles from "../components/Searchbar.module.css"
import "react-widgets/styles.css";
import NumberPicker from "react-widgets/NumberPicker";


function SelectUsersPage() {

    //A use state for each user
    const [user1, setUser1] = useState(null);
    const [user2, setUser2] = useState(null);
    const [user3, setUser3] = useState(null);
    const [user4, setUser4] = useState(null);
    const [playlistName, setPlaylistName] = useState("API Test Playlist");
    const [playlistDescription, setPlaylistDescription] = useState(null);
    const [playlistSize, setPlaylistSize] = useState(null);
    const [isOpen, toggleOpen] = useState(false);
    
    function openOptions () {
        toggleOpen(!isOpen);
    }

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
            <h1 className="select-header" onClick={openOptions}>Playlist Options</h1>
            {isOpen && <>
            <input className={styles.Searchbar} type="text" onChange={e => setPlaylistName(e.target.value)} placeholder="Enter A Playlist Name"/>
            <div className='playlist-size-container'>
              <h2>Playlist Size: </h2>
              <NumberPicker defaultValue={50} onChange={value => setPlaylistSize(value)}/>  
            </div>

            <textarea className={styles.descBox} type="text" maxLength="300" onChange={e => setPlaylistDescription(e.target.value)} placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec." />
            
            </>}
            <br></br>
            <button className='playlist-btn'><Link to={`/preview-playlist/${user1}/${user2}/${user3}/${user4}` } >Select Users</Link></button>
        
        </section>
        </>
    ) 
}

export default SelectUsersPage