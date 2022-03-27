import useFetch from '../customHooks/useFetch';
import React, {useState} from 'react'
import styles from "./Searchbar.module.css"

function Searchbar ({setUsers}) {
    function onUpdate(event) {
        event.preventDefault()
    }
    return (
        <div className="search-bar">
            <input type="text" placeholder="Enter a username"/>
        </div>
    );
}

export default Searchbar;