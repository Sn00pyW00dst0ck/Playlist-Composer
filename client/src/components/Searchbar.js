import useFetch from '../customHooks/useFetch';
import React, {useState} from 'react'
import styles from "./Searchbar.module.css"

function Searchbar ({setUser}) {
    return (
        <>
        <div className={styles.SearchbarContainer}>
            {/** Using JS Spread Operator to append newest item to the array */}
            <input className={styles.Searchbar} type="text" onChange={e => setUser(e.target.value)} placeholder="Enter A Spotify Username"/>
        </div>
        </>
    );
}

export default Searchbar;