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


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
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




let dealerPlayed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const dealerCard = () => {
  let index = Math.floor(Math.random() * dealerPlayed.length);
  let deal = dealerPlayed.splice(index, 1)[0];
  return deal;
};

const turnEval = (p1, p2) => {
  if (p1.val > p2.val) {
    return p1.name;
  } else if (p2.val > p1.val) {
    return p2.name;
  }
  return 'draw';
}


let count = {};
const score = {};

const roomInfo = {};
//Socket.io stuff goes here
//Any console.logs here will log on the server side (on your computers terminal)
io.on('connection', function (socket) {




  console.log("a user connected at", socket.id);
  socket.emit('news', { hello: 'world' });

  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
  //Room Stuff//

  //Joins the socket to the room goofRoom when called
  const joinGoofRoom = function (playerName) {
    //If room does not exist, it will be created before joining the socket
    socket.join('goofRoom')
    console.log(`${playerName} with id ${socket.id} joined goofRoom`)
    //Sends a message to the socket owner upon joining a room
    io.to(`${socket.id}`).emit("userJoin", "Welcome to goofRoom!")
    //Sends a message to everyone but the socket owner upon joining a room
    // socket.to('goofRoom').emit('ready', playerName);
    //Emits an object containing the sockets in goofRoom
    io.in("goofRoom").emit("loadGoofBoard", io.sockets.adapter.rooms.goofRoom)
  }

  //Can use a class (RoomMaker) to keep track on the server side of which users are in a room
  //When both users are in a room and ready to play, create a new RoomMaker object
  //It will contain an id of the room. the id of the game and each players name
  //When somone clicks to join a goofspiel room:


  //Listens for the goof-join event sent from app.js
  socket.on('goof-join', function (playerName) {
    console.log(socket.id)
    //If room does not exist:
    if (!io.sockets.adapter.rooms.goofRoom) {
      joinGoofRoom(playerName)
      roomInfo['goof'] = {
        players: [playerName],
        id: [socket.id]
      };
      console.log(roomInfo)
    } else {
      //If user is already in the room
      if (true === io.sockets.adapter.rooms.goofRoom.sockets[`${socket.id}`]) {
        console.log("User tried to join room they are already in")
        io.to(`${socket.id}`).emit("alreadyJoined", io.sockets.adapter.rooms)
      }
      else if (io.sockets.adapter.rooms.goofRoom.length >= 3) {
        console.log(socket.id, " tried to join a full room")
        socket.emit('roomFull')
      } else {
        joinGoofRoom(playerName)
        roomInfo['goof'].players.push(playerName);
        roomInfo['goof'].id.push(socket.id);
        console.log(roomInfo)
      }
    }
  })


  let gameState;

  socket.on("playerJoinsRoom", () => {
    roomInfo['goof'].playerReady ? roomInfo['goof'].playerReady++ : roomInfo['goof'].playerReady = 1;
    if (roomInfo['goof'].playerReady === 2) {
      deal = dealerCard()
      io.in("goofRoom").emit("dealerCard", deal)
    }
  })


  socket.on("readyClicked", (data) => {
    count[data.name] = data.val;
    console.log(count)

    if (Object.keys(count).length === 1) {
      console.log("opponenetReady emitted")
      io.in("goofRoom").emit("opponentReady", data.name);
    }


    if (Object.keys(count).length === 2) {
      console.log("Two people readied up")

      //Winner logic
      let p1 = {
        name: Object.keys(count)[0],
        val: count[Object.keys(count)[0]]
      }
      let p2 = {
        name: Object.keys(count)[1],
        val: count[Object.keys(count)[1]]
      }
      console.log(p1, p2)
      let winnerName = turnEval(p1, p2);
      let winner = { name: winnerName, val: deal };
      if (!score[winnerName]) {
        score[winnerName] = 0;
      }
      score[winnerName] += winner.val
      console.log(score)
      count = {};
      io.in("goofRoom").emit("results", winner)

      //On game end
      if (dealerPlayed.length === 0) {
        if (Object.keys(score).length === 1 && score.draw) {
          io.in("goofRoom").emit("goofComplete", null)
        }
        //If one person won every round
        else if (Object.keys(score).length === 1) {
          io.in("goofRoom").emit("goofComplete", Object.keys(score)[0])
          //If both players won a round
        } else {
          if (score[Object.keys(score)[0]] > score[Object.keys(score)[1]]) {
            db.query(`INSERT INTO games_db (player1, player2, winner) VALUES ('${Object.keys(score)[0]}','${Object.keys(score)[1]}', '${Object.keys(score)[0]}');`)
              io.in("goofRoom").emit("goofComplete", Object.keys(score)[0]);
          } else if (score[Object.keys(score)[0]] < score[Object.keys(score)[1]]) {
            db.query(`INSERT INTO games_db (player1, player2, winner) VALUES ('${Object.keys(score)[0]}','${Object.keys(score)[1]}', '${Object.keys(score)[1]}');`);
            io.in("goofRoom").emit("goofComplete", Object.keys(score)[1]);
          } else {
            io.in("goofRoom").emit("goofComplete", null)
          }
        }
        //Resets the dealer deck
        dealerPlayed = [1, 2, 3];
        // , 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

      } else {
        deal = dealerCard()
        io.in("goofRoom").emit("dealerCard", deal)
      }
    }

  })


  socket.on('goofReady', function (data) {
    //Checks if the goofRoom exists
    if (io.sockets.adapter.rooms.goofRoom) {
      //Sets roomMembers to an object containing the socket.id's of everyone
      //in goofRoom
      const roomMembers = io.sockets.adapter.rooms.goofRoom.sockets
      if (roomMembers[socket.id] === true) {
        console.log("Users in room:\n", roomMembers)
        console.log(data + ' with id ' + socket.id + ' sent ready while in goofRoom');
      } else {
        console.log(`User ${socket.id} tried to ready while not in room`)
      }
    } else {
      console.log("Room does not exist")
    }
  });


});



