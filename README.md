# Playlist Creator

[![Build Status]()

** By Gabriel Aldous, Gabriel Aldous, Alan Patrick Lapid, and Xian Jian Zhang **

Playlist Creator is a React and Node.js based web application designed to
simplify the process of creating Spotify playlists tailored for multiple 
users. 

## Setting Up 

To set up the development environment on your computer, ensure that Node.js is installed. 

## Planned Features

- Ability to create a playlist based on music tastes of multiple users
- Ability to create a playlist based on a set of genres
- Ability to create a playlist based on other chosen playlists
- Ability to create a playlist based on a set of albums
- Set custom playlist image, share playlist with other users, and set custom playlist description

## Development Issues / Next Steps

1. Finalize the OAuth2 authentication flow and refresh token flow
2. Create React UI & webpage to support inputting user / playlist source data
3. Create React UI & webpage for playlist preview & editing
4. Create React UI & webpage for confirmation of playlist creation
5. Create React UI for landing page
6. Finalize SpotifyAPI JavaScript object for easy function calls
7. Create data structure and algorithms for assigning track priorities by frequency and other factors

## Changes for 'Update To Support Protected Routes'

1. React Changes
    - Reintroduced App.js react component
    - Moved ALL routing to App.js react component
    - Authentication state (as a boolean) is stored in App.js component (through new useAuth custom hook) and passed as a prop to other components
    - Created SpotifyLoginButton react component
    - Created useAuth custom hook
    - Created folders for custom hooks and react pages
    - Moved Navbar elements from individual pages to the App.js component
    - Modified Navbar component to accept authentication state prop from App.js 
    - Modified ProtectedRoute component to redirect to "/login" path
    - Modified ProtectedRoute component to accept authentication state prop from App.js 
2. Backend Changes
    - Changed Spotify OAuth flow in backend to accomodate SpotifyLoginButton react component in frontend
    - New login procedure is as follows:
        - User clicks on 'SpotifyLoginButton' component
        - They are redirect to spotify login page
        - When they are redirected back to the react app the useAuth hook fires and calls backend SpotifyAPI to login
        - ^That is done with a POST request to "/login" and it recieves a json object with boolean for success or failure
    - Added cors package to handle errors
