import React, { useEffect } from 'react'
import {useState} from 'react'
import useFetch from '../customHooks/useFetch';
import Searchbar from '../components/Searchbar'

// FILLER ADD SEARCH BAR AND CREATE SEPARATE CSS FILE FOR IT
function SelectUsersPage() {

    //A use state for each user
    const [user1, setUser1] = useState(null);
    const [user2, setUser2] = useState(null);
    const [user3, setUser3] = useState(null);
    const [user4, setUser4] = useState(null);

    //The options for the fetch request and the actual fetch hook
    const [options, setOptions] = useState(null);
    const {isLoading, responseData, fetchError} = useFetch("/api/create-playlist", options);
    
    /*
    Optional console log statements for debugging in browser
    console.log(isLoading);
    console.log(responseData);
    console.log(fetchError);
    */

    return(
        <>
        {/* Main Content */}
        <section className="landing-main">
            <h1>Select Other Users To Customize Playlist For</h1>
            
            {/* Put 4 Searchbars on the page, with key's 0, 1, 2, and 3, so they each can update one specific name */}
            <Searchbar setUser={setUser1} />
            <Searchbar setUser={setUser2} />
            <Searchbar setUser={setUser3} />
            <Searchbar setUser={setUser4} />

            
            {/* Button that changes the options for the fetch and triggers the useFetch hook to call our backend */}
            <button onClick={() => {
                //Filter the users to remove null or undefined values
                let users = [user1, user2, user3, user4].filter((e) =>  {
                    return e != null;
                });
                
                //Set the fetch options (which triggers the useFetch hook to fire)
                setOptions({
                    method: "POST",
                    headers:  {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({users:users})
                });
                
            }}>Submit</button>
        
        </section>
        </>
    ) 
}

export default SelectUsersPage