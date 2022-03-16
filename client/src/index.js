import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './components/Navbar';
import LandingPage from './components/Landing-Page';
import SelectUsers from './components/Select-Users-Page';
import Button from './components/Button'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';

//Added Router and Routes for multi-page stuff. 
ReactDOM.render(
  <React.StrictMode>
    
    <Router>
      <Routes>
        {/* Landing Page JSX */}
        <Route path="/" element={
          <>
          <Navbar />
          <LandingPage />
          </>
        }></Route>
        {/* Choose Users Page */}
        <Route path="/choose-users" element={
          <>
          <Navbar />
          <SelectUsers />
          </>
        }></Route>
        {/* Playlist Preview Page */}
        <Route path="/loading-playlist" element={<Button/>}></Route>

        
      </Routes>
    </Router>

    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
