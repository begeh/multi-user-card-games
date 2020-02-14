// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const request = require('request');

const { newGame } = require('./lib/goofspiel-scripts/newGame-function')
const { getGameData } = require('./lib/goofspiel-scripts/getGameData-function')
const { Turn } = require('./lib/goofspiel-scripts/game-logic-classes');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const mainRoutes = require("./routes/main")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/main", mainRoutes(db));
// Note: mount other resources here, using the same pattern above


// Login Page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  // Redirects the user to the main page if they have relevant cookie data
  if (req.session.user_id) {
    const templateVars = {};
    templateVars.username = req.body.username;
    req.session.user_id = req.body.username;
    res.render('main', templateVars);
  }
  res.render("index");
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


//Server-side Goofspiel Code
//Only supports one game at a time, branch multigame is
//looking into this

//The deck used to play goofspiel
let dealerDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
//Functionaly, draws a card from the dealer deck and returns it
const dealerCard = () => {
  let index = Math.floor(Math.random() * dealerDeck.length);
  let deal = dealerDeck.splice(index, 1)[0];
  return deal;
};

//Evaluates which player played a higher card and returns their name
const turnEval = (p1, p2) => {
  if (p1.val > p2.val) {
    return p1.name;
  } else if (p2.val > p1.val) {
    return p2.name;
  }
  return 'draw';
}

//Stores a users name as a key and their played card as the value. Storing happens
//when the user hits ready.
let count = {};

//Score contains a winners name as a key and and the value of the card they've won
const score = {};

//Takes a room as a key, and the value is an object containing 2 a key value pairs:
//a users name and socket id. This lets us know serverside which users are in which rooms
const roomInfo = {};

//Socket.io stuff goes here
//How it works: socket.emits take a string and optionally another piece of data, and send them to
//to any socket.ons that are listening for that event and optionally the data.
//This allows you to transfer data between client and server, server and client,
//AND server to ALL clients.

//Will fire when anyone joins the main page
//Connect them to the socket.io default Namespace
io.on('connection', function (socket) {

  console.log("a user connected at", socket.id);

  //Will fire when any user disconnects
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
  //Room Stuff --- Rooms allow the server to emit to certain groups of clients

  //Joins the client/socket to the a room when called
  const joinGoofRoom = function (nameAndRoom) {
    socket.join(`${nameAndRoom.room}`)

    //Sends a message to the client/socket owner upon joining a room
    io.to(`${socket.id}`).emit("userJoin", nameAndRoom.room)
    //Gets the current room information from socket.io (keys are room names, values are connectted sockets)
    const currentRoom = io.sockets.adapter.rooms[`${nameAndRoom.room}`]
    //Emits an object containing who is in the current room and the current rooms name
    io.in(`${nameAndRoom.room}`).emit("loadGoofBoard", { currentRoom, roomName: nameAndRoom.room })
  }

  //Listens for the goof-join event sent from the client
  socket.on('goof-join', function (nameAndRoom) {
    //If room value exists in passed data, the user is making a room:
    if (nameAndRoom.room) {
      joinGoofRoom(nameAndRoom)
      //Adds a key to roomInfo. The ket is the created rooms name. The values are arrays of user names
      //and socket.ids
      roomInfo[`${nameAndRoom.room}`] = {
        players: [nameAndRoom.name],
        id: [socket.id]
      }

      //If there is no passed room value, the user is joining a random room
    } else {
      //Get an array of all the room names
      const allRooms = Object.keys(roomInfo);

      //Selects a room at random
      const roomNo = allRooms[Math.round(Math.random() * (allRooms.length - 1))];
      nameAndRoom.room = roomNo;

      //Covers if no rooms exist
      if (allRooms.length === 0) {
        socket.emit("noExistingGoofRooms")
        //Covers if the selected room is "full" (has 2 people in it)
      } else if (roomInfo[nameAndRoom.room].players.length >= 2) {
        socket.emit("roomFull");
      } else {
        //NOTE: If room does not exist, it will be created, then join the socket to it
        joinGoofRoom(nameAndRoom)
        //Append the user name and socket.id to the roomInfo object that corresponds to
        //the current room
        roomInfo[nameAndRoom.room].players.push(nameAndRoom.name);
        roomInfo[nameAndRoom.room].id.push(socket.id);
      }
    }
  })


  socket.on("playerJoinsRoom", (roomName) => {
    //Adds players to their room in roomInfo
    roomInfo[`${roomName}`].playerReady ? roomInfo[`${roomName}`].playerReady++ : roomInfo[`${roomName}`].playerReady = 1;
    //Checks if 2 people are in a room
    if (roomInfo[`${roomName}`].playerReady === 2) {
      deal = dealerCard()
      //Sends the dealt card to everyone in a room
      io.in(`${roomName}`).emit("dealerCard", deal)
    }
  })


  socket.on("readyClicked", (data) => {
    //Stores which user has readied and their bet card
    count[data.name] = data.val;
    //Stores the room the user is in
    let roomName = data.thisRoom;

    if (Object.keys(count).length === 1) {
      io.in(`${roomName}`).emit("opponentReady", data.name);
    }

    //When both players have readied, run evaluation logic
    if (Object.keys(count).length === 2) {
      //Determine winner of the round
      let p1 = {
        name: Object.keys(count)[0],
        val: count[Object.keys(count)[0]]
      }
      let p2 = {
        name: Object.keys(count)[1],
        val: count[Object.keys(count)[1]]
      }
      let winnerName = turnEval(p1, p2);

      //Assign the winners name and the value of the card they won
      let winner = { name: winnerName, val: deal };
      if (!score[winnerName]) {
        score[winnerName] = 0;
      }
      score[winnerName] += winner.val

      //Empties count object so it can store which player is ready next turn
      count = {};
      io.in(`${roomName}`).emit("results", winner)

      //On game end
      if (dealerDeck.length === 0) {
        if (Object.keys(score).length === 1 && score.draw) {
          io.in(`${roomName}`).emit("goofComplete", null)
        }
        //If one person won every round
        else if (Object.keys(score).length === 1) {
          io.in(`${roomName}`).emit("goofComplete", Object.keys(score)[0])
          //If both players won a round
        } else {
          //Stores the values of the winners and losers in the database
          if (score[Object.keys(score)[0]] > score[Object.keys(score)[1]]) {
            db.query(`INSERT INTO games_db (player1, player2, winner) VALUES ('${Object.keys(score)[0]}','${Object.keys(score)[1]}', '${Object.keys(score)[0]}');`)
            io.in(`${roomName}`).emit("goofComplete", Object.keys(score)[0])
          } else if (score[Object.keys(score)[0]] < score[Object.keys(score)[1]]) {
            db.query(`INSERT INTO games_db (player1, player2, winner) VALUES ('${Object.keys(score)[0]}','${Object.keys(score)[1]}', '${Object.keys(score)[1]}');`);
            io.in(`${roomName}`).emit("goofComplete", Object.keys(score)[1])
          } else {
            db.query(`INSERT INTO games_db (player1, player2, winner) VALUES ('${p1.name}','${p2.name}', 'DRAW');`);
            io.in(`${roomName}`).emit("goofComplete", null);
          }
        }
        //Resets the dealer deck for a new game
        dealerDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        //Play another turn
      } else {
        deal = dealerCard()
        io.in(`${roomName}`).emit("dealerCard", deal)
      }
    }

  })


});



