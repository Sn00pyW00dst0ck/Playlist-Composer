import React from 'react';
import LandingPage from './pages/Landing-Page';
import SelectUsersPage from './pages/Select-Users-Page'
import PlaylistPage from './pages/Playlist-Page';
import ProtectedRoute from "./components/ProtectedRoute";
import SpotifyLoginButton from './components/SpotifyLoginButton';
import Navbar from './components/Navbar';
import useAuth from './customHooks/useAuth';
import useFetch from './customHooks/useFetch';

//Imports for the React Webpage Routing
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

const code = new URLSearchParams(window.location.search).get('code');

function App()  {

    const auth = useAuth(code); // state for our app that tells if backend is logged in to spotify
    console.log("APP AUTH: " + auth);

    const {isLoading, responseData, fetchError} = useFetch("/api");

    return (
        <>

            <Router>
                <Navbar auth={auth}/> {/* Pass authentication state to the navbar component */}

                {/* Testing for the useFetch Hook */}
                {isLoading && <span>Loading.....</span>}
                {!isLoading && fetchError ? (
                  <span>Error in fetching data ...</span>
                ) : (
                  <span>{JSON.stringify(responseData)}</span>
                )}


                <Routes>
                    {/* PUBLIC Landing Page */}
                    <Route path="/" element={
                        <LandingPage />
                    } />

                    {/* 
                        PUBLIC page asking to login with Spotify...
                        The ProtectedRoutes will redirect to this 
                        page if users aren't authenticated.
                    */}
                    <Route path="/login" element={
                        <SpotifyLoginButton />
                    } />

                    {/* Protected Pages (requires user to be logged in) */}
                    <Route element={<ProtectedRoute auth={auth}/>}> {/* Pass authentication state to the protected route component */}
                        <Route path="/choose-users" element={<SelectUsersPage />} />
                        <Route path="/preview-playlist" element={<PlaylistPage />} />
                    </Route>

                </Routes>

                
            </Router>
        </>
    );
}

export default App;