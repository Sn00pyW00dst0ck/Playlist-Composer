import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Button from './components/Button'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';

//Added Router and Routes for multi-page stuff. 
//Determine if we want this or if we want multiple react apps to be served from express
ReactDOM.render(
  <React.StrictMode>
    <a href="http://localhost:3001/login">Click Me</a>
    <App />
    <App />

    
    <Router>
      <Routes>

        <Route path="/" element={
          <p>Home Page!</p>
        }></Route>
          
        <Route path="/choose-users" element={
          <p>Choose the users you want to show!</p>
        }></Route>

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
