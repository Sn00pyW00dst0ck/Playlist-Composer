import { useEffect, useState } from "react";

export default function useAuth(code) {
    const [loggedIn, setLoggedIn] = useState();

    //Have backend SpotifyAPI login if it isn't alredy
    useEffect(() => {
        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setLoggedIn(data.result);
            // If success then cut the code string from the URL and execute the other thing
            window.history.pushState({}, null, "/");
        }).catch(() => {
            // If fail redirect to home page - Login page
            window.location = "/";
        });
    }, [code]);

    return loggedIn;
}