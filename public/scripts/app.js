// import { format } from "morgan";

$(function () {

  //This is the users name, we can pass this data through socket.io
  const name = $('#user-name u strong').text();
  const socket = io.connect('http://localhost:8080');

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function checks for numerical value equivalent to the player's card value
  const playerCardVal = () => {
    switch ($('.beenplayed').attr('id')) {
      case 'ace': return 1;
      case 'card2': return 2;
      case 'card3': return 3;
      case 'card4': return 4;
      case 'card5': return 5;
      case 'card6': return 6;
      case 'card7': return 7;
      case 'card8': return 8;
      case 'card9': return 9;
      case 'card10': return 10;
      case 'jack': return 11;
      case 'queen': return 12;
      case 'king': return 13;
    }
  }

  //function checks for numerical value equivalent to the dealer's card value
  const cardVal = () => {
    switch ($('#dealer-play img').attr('id')) {
      case '1': return 1;
      case '2': return 2;
      case '3': return 3;
      case '4': return 4;
      case '5': return 5;
      case '6': return 6;
      case '7': return 7;
      case '8': return 8;
      case '9': return 9;
      case '10': return 10;
      case '11': return 11;
      case '12': return 12;
      case '13': return 13;
    }
  }

  //object containing values for dealer's card (used to render dealer card based on its index)
  const playingCards = {
    1: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/14H.png?raw=true',
    2: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/2H.png?raw=true',
    3: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/3H.png?raw=true',
    4: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/4H.png?raw=true',
    5: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/5H.png?raw=true',
    6: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/6H.png?raw=true',
    7: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/7H.png?raw=true',
    8: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/8H.png?raw=true',
    9: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/9H.png?raw=true',
    10: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/10H.png?raw=true',
    11: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/11H.png?raw=true',
    12: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/12H.png?raw=true',
    13: 'https://github.com/begeh/multi-user-card-games/blob/master/graphics/13H.png?raw=true'
  };


  //contains jquery event listeners that handle moving cards around the board during play
  //Listeners will add and remove html ids move cards around
  const boardListener = function () {
    //Grabs the room name from the top of the inserted html when loading the board
    let thisRoom = $(`.roomName`).text()
    //Listens for the card dealt from the serverside dealer deck
    socket.on("dealerCard", (deal) => {
      ($('#dealer-play').children()).replaceWith(`<img id =${deal} src = ${playingCards[deal]}>`);
      //when player clicks on a card, it is moved to the middle of game board for play
      $("#p2Hand .inplay img").click((event) => {
        event.preventDefault();
        //*** used this if statement to only target img in p2Hand. for some reason, click function persisted when card when to discard pile for some reason. will have to look for better fix ***
        if ($(event.target).parent().attr('id') !== 'p2Right') {
          if ($("#yourplay").html() == "") {
            $("#middleHand #yourplay").replaceWith($(event.target).parent());
            ($(event.target).parent()).addClass('beenplayed');
          }
          else {
            $("#p2Hand").append($(".beenplayed"));
            $('.beenplayed').removeClass('beenplayed');
            $("#middleHand").append($(event.target).parent());
            ($(event.target).parent()).addClass('beenplayed');
          }
        }
      })
    });

    //when ready button is clicked, players inplay hand goes to played cards sections and opponents card goes to their discard pile
    $("#ready").click((element) => {
      element.preventDefault();
      if ($("#yourplay").html() != "") {
        //Sends a players name, the value of their played card and name of their room
        socket.emit('readyClicked', { name, val: playerCardVal(), thisRoom });
      }
    });
  }
  //Updates the scoreboard for each client, depending on whether they won or not.
  socket.on('results', (data) => {
    if (data.name === name) {
      $("#p2Left p").text(Number($("#p2Left p").text()) + data.val);
    } else if (data.name === 'draw') {
    } else {
      $("#p1Left p").text(Number($("#p1Left p").text()) + data.val);
    }
    //Moves cards from each play area to their respective plyed cards area
    $("#p2Right").append($(".beenplayed img"));
    $('.beenplayed').remove();
    $("#middleHand").append('<div id="yourplay">');
    $("#p1Right").append($("#p1Hand img:last-child"));
    $('#opponent-play').children().replaceWith('<div></div>');
  })
  //If client A readies, a card will be placed facedown on client Bs screen (and vice versa)
  socket.on("opponentReady", (data) => {
    if (name !== data) {
      $('#opponent-play').children().replaceWith('<img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">');
    }
  })

  //When a game is over, displays text depending on whether a client won or lost or drew
  socket.on("goofComplete", (data) => {
    if (data === null) {
      $('#middleHand').children().replaceWith(`<p style='color: yellow; font-size: 30px'>DRAW</p>`);
    } else {
      if (data === name) {
        $('#middleHand').children().replaceWith(`<p style='color: yellow; font-size: 30px'>WINNER</p>`);
      } else {
        $('#middleHand').children().replaceWith(`<p style='color: yellow; font-size: 30px'>DEFEAT</p>`)
      }
    }
    //Reloads the page to kick the players out of their current room
    setTimeout(() => {
      location.reload()
    }, 3000)
  });
  //Required for play
  boardListener();

  //Contains the HTML to insert to allow play
  const newBoard = (roomName) =>
    `<h3 class='roomName'>${roomName}</h3>
    <div id="display">
      <!-- <img src="https://static.vecteezy.com/system/resources/previews/000/126/496/large_2x/playing-card-back-pattern-vector.jpg" alt="Image proved by vecteezy.com"> -->
      <div id="p1Left" class="gamespace">Opponent's Points
        <p class="points">0</p>
      </div>

      <!-- p1Hand will be populated by jquery inserts -->
      <div id="p1Hand" class="gamespace">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
        <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
      </div>
      <div class="gamespace">
        P1 Played Cards
        <div id="p1Right">

        </div>
      </div>

      <div id="middleLeft" class="gamespace">
        <button id= "forfeit" type="button" class="btn btn-danger">Forfeit</button>
      </div>
      <!-- middleHand will be populated by jquery inserts -->
      <div id="middleHand" class="gamespace">
      <div id="opponent-play"><div></div></div>
      <div id="dealer-play"><div></div></div>
        <div id="yourplay"></div>
      </div>
      <div id="middleRight" class="gamespace">
        <button type="button" class="btn btn-primary" id="ready">Ready</button>
      </div>

      <div id="p2Left" class="gamespace">Your Points
        <p class="points">0</p>
      </div>
      <!-- p2Hand will be populated by jquery inserts -->
      <div id="p2Hand" class="gamespace">
        <a id="ace" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/14S.png?raw=true">
        </a>
        <a id="card2" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/2S.png?raw=true">
        </a>
        <a id="card3" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/3S.png?raw=true">
        </a>
        <a id="card4" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/4S.png?raw=true">
        </a>
        <a id="card5" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/5S.png?raw=true">
        </a>
        <a id="card6" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/6S.png?raw=true">
        </a>
        <a id="card7" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/7S.png?raw=true">
        </a>
        <a id="card8" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/8S.png?raw=true">
        </a>
        <a id="card9" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/9S.png?raw=true">
        </a>
        <a href="#" class="inplay" id="card10">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/10S.png?raw=true">
        </a>
        <a id="jack" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/11S.png?raw=true">
        </a>
        <a id="queen" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/12S.png?raw=true">
        </a>
        <a id="king" class="inplay" href="#">
          <img src="https://github.com/begeh/multi-user-card-games/blob/master/graphics/13S.png?raw=true">
        </a>
      </div>
      <div class="gamespace">
        P2 Played Cards
        <div id="p2Right">

        </div>
      </div>
    </div>
`;

//Contains the html to display a frame of a gameboard
  const newFrame = () =>
    `<div id="display">
  <!-- <img src="https://static.vecteezy.com/system/resources/previews/000/126/496/large_2x/playing-card-back-pattern-vector.jpg" alt="Image proved by vecteezy.com"> -->
  <div id="p1Left" class="gamespace">P1 Points
    <p class="points">0</p>
  </div>

  <!-- p1Hand will be populated by jquery inserts -->
  <div id="p1Hand" class="gamespace">
    </div>
  <div class="gamespace">
    P1 Played Cards
    <div id="p1Right">

    </div>
  </div>

  <div id="middleLeft" class="gamespace">
    <button type="button" class="btn btn-danger">Forfeit</button>
  </div>
  <!-- middleHand will be populated by jquery inserts -->
  <div id="middleHand" class="gamespace">
  <div id="opponent-play"><div></div></div>
  <div id="dealer-play"><div></div></div>
    <div id="yourplay"></div>
  </div>
  <div id="middleRight" class="gamespace">
    <button type="button" class="btn btn-primary" id="ready">Ready</button>
  </div>

  <div id="p2Left" class="gamespace">P2 Points
    <p class="points">0</p>
  </div>
  <!-- p2Hand will be populated by jquery inserts -->
  <div id="p2Hand" class="gamespace">

  </div>
  <div class="gamespace">
    P2 Played Cards
    <div id="p2Right">

    </div>
  </div>
</div>
`;


  //Watches for the make goof room id being clicked clicked, then emits a
  //a goof-join event that is caught in server.js
  $("#goof").on('click', () => {
    //Prompts the user to confirm room join
    if (confirm("Join Goofspiel room?")) {
      socket.emit('goof-join', { name })
    }
  });
  //Same as a bove but on the make room button
  $("#goofMake").on('click', () => {
    const goofRoom = prompt("What would you like to call you room?")
    if (goofRoom) {
      socket.emit('goof-join', { name, room: goofRoom })
    }
  }
  );

  socket.on("noExistingGoofRooms", () => {
    alert("No Goofspiel rooms have been made!")
  })

  //Does nothing right now
  socket.on("alreadyJoined", (data) => {
    alert("You are already in this room")
  })

  socket.on('roomFull', () => {
    alert("The room is full.")
  })

  //Alerts the client when they've joined a room.
  socket.on('userJoin', function (data) {
    alert(`Welcome to ${data}!`)
  })

  //Recievs an object containing a rooms name and all users in the room
  socket.on("loadGoofBoard", (data) => {
    const { currentRoom, roomName } = data;
    //Only loads the board AND cards if there are two players in the room
    if (currentRoom.length > 1) {
      socket.emit('playerJoinsRoom', roomName)
      $("#rightSide").empty();
      $("#rightSide").append(newBoard(roomName));
      boardListener();
      //Loads the frame of the play area if only one person is present in a room
    } else {
      $("#rightSide").append(newFrame());
    }
  })
  //Displays which card has been dealt to each player
  socket.on("deal", (data => {
    const dealt = playingCards[data];
    $('#dealer-play').children().replaceWith(`<img src="${dealt}">`);
  })
  );


})




