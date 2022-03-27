import React from 'react'
import {useState} from 'react'
import useFetch from '../customHooks/useFetch';
import Searchbar from '../components/Searchbar'

// FILLER ADD SEARCH BAR AND CREATE SEPARATE CSS FILE FOR IT
function SelectUsersPage() {
    const [users, setUsers] = useState([]);
    const [options, setOptions] = useState(null);
    const {isLoading, responseData, fetchError} = useFetch("/api/create-playlist", options);

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
            
                <Searchbar users={users} setUsers={setUsers} />
                <Searchbar users={users} setUsers={setUsers} />
                <Searchbar users={users} setUsers={setUsers} />
                <Searchbar users={users} setUsers={setUsers} />

                <button onClick={() => setOptions({
                    method: "POST",
                    headers:  {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({user:users})
        
                })}>Submit</button>
        
                
        </section>
        
        </>
    ) 
}

export default SelectUsersPage