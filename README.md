GAMEBOARD
=========

## Description

Gameboard is a multi-user game interface where two or more players can play card games in real-time. Game moves are shared between users utilizing Sockets.io.

Games currently on dock:

- Goofspiel

Features included:
1. Create a game room to play in
2. Join a game room that has been created using the room name or by selecting to join a random game room in progress
3. Game history of the logged in
4. Leaderboards, updated in real time


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express
- PostgreSQL
- Sockets.io
- Cookie Session
- SASS

