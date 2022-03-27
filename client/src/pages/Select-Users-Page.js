import React from 'react'
import {useState, useCallback} from 'react'
import useFetch from '../customHooks/useFetch';
import Searchbar from '../components/Searchbar'

// FILLER ADD SEARCH BAR AND CREATE SEPARATE CSS FILE FOR IT
function SelectUsersPage() {
    const [users, setUsers] = useState([]);
    console.log(users);
    const [options, setOptions] = useState(null);
    console.log(options);
    const {isLoading, responseData, fetchError} = useFetch("/api/create-playlist", options);
    console.log(isLoading);
    console.log(responseData);
    console.log(fetchError);
    return(
        <>
        /*
        In Searchbar.js, when text is entered we call setUsers function to update the user list
        Create a button that when clicked uses the 'useFetch' hook and calls our backend API
        "/api/create-playlist"
        
        */
        {/* Main Content */}
        <section className="landing-main">
            <h1>Select Other Users To Customize Playlist For</h1>
            
                <Searchbar setUsers={setUsers} />
                <Searchbar setUsers={setUsers} />
                <Searchbar setUsers={setUsers} />
                <Searchbar setUsers={setUsers} />

                <button onClick={() => setOptions({
                    method: "POST",
                    headers:  {
                        'Content-Type': 'application/json'
                    },
                    body: users
                })}>Submit</button>
        
                
        </section>
        
        </>
    ) 
}

export default SelectUsersPage