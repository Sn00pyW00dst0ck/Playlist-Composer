# Playlist Creator

**Build Status: `In Development`**

**By Gabriel Aldous, Alan Patrick Lapid, and Xian Jian Zhang**

Playlist Creator is a React and Node.js based web application designed to
simplify the process of creating Spotify playlists tailored for multiple
users.

## Setting Up

To set up the development environment on your computer:
1. Clone the repository
2. Ensure that Node.js and Node Package Manager are installed
3. Create a `.env` file in the root directory and model it off of the `sample.env` file
4. Ensure the client id within the `/client/src/components/SpotifyLoginButton.js` file is correct
5. Run `npm i` in both the root and client directories (this ensures dependencies are up to date)
6. Run `npm start` from the root directory to run the development server

## Immediate Next Development steps

1. Finalize React Text Input Component for the selecting playlist users page
2. Create two data structures for the project implementation (unordered map and one other type)
    - Unordered Map data structure
        - Look at stepik Q 10.2.1 but instead of set its a map
        - Create Hash Function
        - Create Reduce Function - Converts hash function down to table size
        - Key will be a Spotify Song ID (A really long base 62 string)
        - Value will be an integer representing the track's priority (aka # of duplicates)
        - Collision by <?> Whatever you guys think is better...
        - MOST IMPORTANT FUNCTION: We need a function that loops through the array of the map and returns the keys for the top X priority values. Should recieve an integer value, Should return an array of strings
    
    - AVL tree
        - Spotify Song ID and a number priority (initially 0) in each node
        - We will insert Spotify Song ID, if it is a duplicate then increment priority
        - Traversal through the tree and create an array with Spotify Song ID ordered by priority value. Should return an array of Spotify Song IDs ordered by their priority (least to greatest). <- Last
        - 
            

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
