import React, {useState} from "react"
import { useParams } from "react-router-dom";

import useFetch from "../customHooks/useFetch";

function PlaylistPage()  {
    const {user1, user2, user3, user4 } = useParams();

    let users = [user1, user2, user3, user4].filter((e) =>  {
        return e !== 'null' && e !== '' && e !== null;
    });
    
    const [options, setOptions] = useState({
        method: "POST",
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({users:users})
    });
    console.log(options)

    const {isLoading, responseData, fetchError } = useFetch("/api/create-playlist", options);

    console.log(responseData);
    console.log(fetchError);
    return (
        <>
        <section className="landing-main">
            <h1>Playlist Preview</h1>
            <p>{user1}</p>
            <p>{user2}</p>
            <p>{user3}</p>
            <p>{user4}</p>
            {isLoading && <p>Loading...</p>} 
            {(!isLoading && fetchError != null) && 
                <p>ERROR! {JSON.stringify(fetchError)}</p>
            }
            {(!isLoading && responseData != null) && 
                <p>SUCCESS! {JSON.stringify(responseData)}</p>
            }
        </section>  
        </>
    );
}

export default PlaylistPage;