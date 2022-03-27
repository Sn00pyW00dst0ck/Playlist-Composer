import useFetch from '../customHooks/useFetch';
import React, {useState} from 'react'
import styles from "./Searchbar.module.css"

function Searchbar ({setUser}) {
    return (
        <>
        <div className="search-bar">
            {/** Using JS Spread Operator to append newest item to the array */}
            <input type="text" onChange={e => setUser(e.target.value)} placeholder="Enter a username"/>
        </div>
        </>
    );
}

export default Searchbar;