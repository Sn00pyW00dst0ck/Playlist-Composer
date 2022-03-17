import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './components/Landing-Page';
import SelectUsersPage from './components/Select-Users-Page';
import PlaylistPage from './components/Playlist-Page'
import ProtectedRoute from "./components/ProtectedRoute";
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

//Added Router and Routes for multi-page stuff. 
ReactDOM.render(
  <React.StrictMode>
  
    <Router>
        <Routes>
            {/* PUBLIC Landing Page */}
            <Route path="/" element={
                <LandingPage />
            } />

            {/* PROTECTED ROUTES */}

            {/* Select Users Page */}
            <Route path="/choose-users" element={<ProtectedRoute />}>
              <Route path="/choose-users" element={<SelectUsersPage />} />
            </Route>

            {/* Playlist Preview Page */}
            <Route path="/preview-playlist" element={<ProtectedRoute />}>
              <Route path="/preview-playlist" element={<PlaylistPage />} />
            </Route>
            
        </Routes>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
