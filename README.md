# Playlist Creator

**Build Status: `In Development`**

**By Gabriel Aldous, Gabriel Aldous, Alan Patrick Lapid, and Xian Jian Zhang**

Playlist Creator is a React and Node.js based web application designed to
simplify the process of creating Spotify playlists tailored for multiple
users.

## Setting Up

To set up the development environment on your computer:
1. Clone the repository
2. Ensure that Node.js and Node Package Manager are installed
3. Run `npm i` in both the root and client directories (this ensures dependencies are up to date)
4. Run `npm start` from the root directory to run the development server

## Immediate Next Development steps

1. Create React Text Input Component for the selecting playlist users page
2. Create two data structures for the project implementation (unordered map and one other type)
3. Implement the functionality of ranking songs based on number of appearances in users liked playlists
4. Implement server routes for getting the newly formed playlist information
5. Implement React front end component for displaying this information

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
3. _Important!! run the node server before the react app or the react app will act very very strangely!!_
4. Update Spotify login client id in button
