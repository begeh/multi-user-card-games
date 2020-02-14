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

  const boardListener = function () {
    socket.on("dealerCard", (deal) => {
      ($('#dealer-play').children()).replaceWith(`<img id =${deal} src = ${playingCards[deal]}>`);
      //when player clicks on a card, it is moved to the middle of game board for play
      $("#p2Hand .inplay").click((event) => {
        event.preventDefault();
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
      })
    });

    //when ready button is clicked, players inplay hand goes to played cards sections and opponents card goes to their discard pile
    $("#ready").click((element) => {
      console.log("MOUTNING!!")
      element.preventDefault();
      if ($("#yourplay").html() != "") {
        console.log("Someone sent data:", name, playerCardVal())
        socket.emit('readyClicked', { name, val: playerCardVal() });
      }
    });
  }

  socket.on('results', (data) => {
    console.log(data)
    if (data.name === name) {
      console.log(Number($("#p2Left p").text()) + data.val)
      $("#p2Left p").text(Number($("#p2Left p").text()) + data.val);
    } else if (data.name === 'draw') {
    } else {
      console.log(Number($("#p1Left p").text()) + data.val)
      $("#p1Left p").text(Number($("#p1Left p").text()) + data.val);
    }
    //Moves cards from each play area to their respective plyed cards area
    $("#p2Right").append($(".beenplayed img"));
    $('.beenplayed').remove();
    $("#middleHand").append('<div id="yourplay">');
    $("#p1Right").append($("#p1Hand img:last-child"));
    $('#opponent-play').children().replaceWith('<div></div>');
  })

  socket.on("opponentReady", (data) => {
    console.log(data, "readied")
    if (name !== data) {
      $('#opponent-play').children().replaceWith('<img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">');
    }
  })

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
    setTimeout(()=> {

      location.reload()

    }, 3000)
  });

  boardListener();

  const newBoard = () =>
    `<div id="display">
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



  //when forfeit button is clicked, board reinitializes and inactivates
  $("#forfeit").click((event) => {
    event.preventDefault();
    $("#display").replaceWith(newBoard());
    $("#rightSide #display").css('opacity', '0.3');
  });

  //Console.logs on this page appear in the repsective clients console (chrome)
  //Some of those Will most need to be changed to alerts, popups, whatever

  //Watches for the goofspiel new game item is clicked, then emits a
  //a goof-join event that is caught in server.js
  $("#goof").on('click', () => {
    //Prompts the user to confirm room join
    if (confirm("Join Goofspiel room?")) {
      socket.emit('goof-join', name)
      console.log("Attemping goofRoom join")
    }
  });
  //Aelrts the client if they are already in the room they are trying to join
  socket.on("alreadyJoined", (data) => {
    console.log(data)
    alert("You are already in this room")
  })

  socket.on('roomFull', () => {
    alert("The room is full.")
  })

  //Logs to the clients browsers console. Can be communicated
  //to the user in a better way, decide during group merge discussion
  socket.on('userJoin', function (data) {
    alert(data)
  })

  //Logs to the clients browsers console. Can be communicated
  //to the user in a better way, decide during group merge discussion
  // socket.on('ready', (data) => {
  //   alert(data + " joined the room")
  // })

  //Recievs an object containing the socket.id of all users in
  //goofRoom
  socket.on("loadGoofBoard", (data) => {
    console.log(data.length)
    console.log(data.sockets)

    //Only loads the board AND cards if there are two players in the room
    if (data.length > 1) {
      console.log("board should load")
      socket.emit('playerJoinsRoom')
      $("#rightSide").empty();
      $("#rightSide").append(newBoard());
      boardListener();
      //Loads the frame of the play area
    } else {
      $("#rightSide").append(newFrame());

    }

  })

  socket.on("deal", (data => {
    const dealt = playingCards[data];
    console.log(socket.id)
    $('#dealer-play').children().replaceWith(`<img src="${dealt}">`);
  })
  );


})




