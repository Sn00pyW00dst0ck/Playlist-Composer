import React from 'react'
import {useState} from 'react'
import Searchbar from '../components/Searchbar'
import { Link } from 'react-router-dom';
import styles from "../components/Searchbar.module.css"
import "react-widgets/styles.css";
import downCarrot from "../imgs/downCarrotWhite.png"
import upCarrot from "../imgs/upCarrotWhite.png"
import NumberPicker from "react-widgets/NumberPicker";


function SelectUsersPage() {

    //A use state for each user
    const [user1, setUser1] = useState(null);
    const [user2, setUser2] = useState(null);
    const [user3, setUser3] = useState(null);
    const [user4, setUser4] = useState(null);
    const [playlistName, setPlaylistName] = useState("API Test Playlist");
    const [playlistDescription, setPlaylistDescription] = useState(null);
    const [playlistSize, setPlaylistSize] = useState(50);
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
            <br></br>

            {/* Put 4 Searchbars on the page, they each can update one specific name */}
            <Searchbar setUser={setUser1} />
            <Searchbar setUser={setUser2} />
            <Searchbar setUser={setUser3} />
            <Searchbar setUser={setUser4} />
            
            {/* Button that changes the options for the fetch and triggers the useFetch hook to call our backend */}
            
            {!isOpen && <>
                <div className={styles.optionsDropdown} onClick={openOptions}>
                    <h1 className="select-header">Playlist Options</h1>
                    <img src={upCarrot}/>
                </div>
                <br></br>
            </>}

            
            {isOpen && <>
            <div className={styles.optionsDropdown} onClick={openOptions}>
                <h1 className="select-header">Playlist Options</h1>
                <img src={downCarrot}/>
            </div>
            <br></br>
            <input className={styles.Searchbar} type="text" onChange={e => setPlaylistName(e.target.value)} placeholder="Enter A Playlist Name"/>
            <textarea className={styles.descBox} type="text" maxLength="300" onChange={e => setPlaylistDescription(e.target.value)} placeholder="Enter A Playlist Description" />
            <div className={styles.playlistSizeContainer}>
              <h2>Playlist Size: </h2>
              <NumberPicker defaultValue={50} onChange={value => setPlaylistSize(value)}/>  
            </div>
            </>}
            <br></br>
            <button className={styles.playlistButton}><Link to={`/preview-playlist/${user1}/${user2}/${user3}/${user4}/${playlistName}/${playlistDescription}/${playlistSize}`} >Select Users</Link></button>
        
        </section>
        </>
    ) 
}

export default SelectUsersPage