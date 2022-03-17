import React from "react"
import Navbar from "./Navbar";

// DUMMY PAGE RIGHT NOW
function PlaylistPage()  {

    return (
        <>
        <Navbar isLoggedin={true}/>
        <section className="landing-main">
            <h1>Playlist Preview</h1>

        </section>
        </>
    );
}

export default PlaylistPage;