# Playlist Creator

Video Demo: https://www.youtube.com/watch?v=JD3j5eQjf2o

[![image](https://user-images.githubusercontent.com/53315150/163699018-424fffea-f735-4968-a0c9-bff0b1db0ded.png)](https://www.youtube.com/watch?v=JD3j5eQjf2o)


#

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

## Implemented Features

- Ability to create a playlist based on the music tastes of multiple users
- Ability to set playlist title, description, track count, and generation method
- Ability to view time taken to generate playlist
- Responsive UI for easy use on mobile devices

## Planned Features

- Ability to create a playlist based on a set of genres
- Ability to create a playlist based on other chosen playlists
- Ability to create a playlist based on a set of albums
- Set custom playlist image and share playlist with other users
