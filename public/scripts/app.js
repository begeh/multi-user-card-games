
$(function () {

  //This is the users name, we can pass this data through socket.io
  const name = $('#user-name u strong').text();
  const socket = io.connect('http://localhost:8080');

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const cardVal = () => {
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

  let dealerPlayed = [];

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

  const dealerCard = () => {
    let deal;
    while (!dealerPlayed.includes(deal)) {
      deal = Math.roundUp(Math.random() * 13);
    }

    dealerPlayed.push(deal);
    return deal;
  }

  const boardListener = function () {
    //when player clicks on a card, it is moved to the middle of game board for play
    $(".inplay img").click((event) => {
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
    });

    //when ready button is clicked, players inplay hand goes to played cards sections and opponents card goes to their discard pile
    $("#ready").click((element) => {
      element.preventDefault();
      if ($("#yourplay").html() != "") {
        $("#p2Left p").text(Number($("#p2Left p").text()) + cardVal());
        $("#p2Right").append($(".beenplayed img"));
        $('.beenplayed').remove();
        $("#middleHand").append('<div id="yourplay">');
        $("#p1Right").append($("#p1Hand img:last-child"));
        console.log(dealerCard());
        ($('#dealer-play').children()).replaceWith(`<img src = ${playingCards[dealerPlayed()]}>`);
      }
    });
  }

  boardListener();

  const newBoard = () =>
    `<div id="display">
      <!-- <img src="https://static.vecteezy.com/system/resources/previews/000/126/496/large_2x/playing-card-back-pattern-vector.jpg" alt="Image proved by vecteezy.com"> -->
      <div id="p1Left" class="gamespace">P1 Points
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
        <button type="button" class="btn btn-danger">Forfeit</button>
      </div>
      <!-- middleHand will be populated by jquery inserts -->
      <div id="middleHand" class="gamespace">
      <div id="opponent-play"></div>
      <div id="dealer-play"></div>
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
    <img src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png">
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

  //Listens for the user to hit the ready button
  //Ready button should not be displayed until a game is loaded, will
  //dicuss this during the group merge
  //no longer works
  // $("#ready").on('click', () => {
  //   socket.emit('goofReady', name)
  // });

  //Logs to the clients browsers console. Can be communicated
  //to the user in a better way, decide during group merge discussion
  socket.on('ready', (data) => {
    alert(data + " joined the room")
  })

  //Recievs an object containing the socket.id of all users in
  //goofRoom
  socket.on("loadGoofBoard", (data) => {
    console.log(data.length)
    console.log(data.sockets)

    //Only loads the board AND cards if there are two players in the room
    if (data.length > 1) {
      console.log("board should load")
      $("#rightSide").empty();
      $("#rightSide").append(newBoard());
      boardListener();
      //Loads the frame of the play area
    } else {
      $("#rightSide").append(newFrame());

    }

  })


})




