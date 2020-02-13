// import { format } from "morgan";

$(function () {

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // const cardVal = () => {
  //   switch ($('.beenplayed').attr('id')) {
  //     case 'ace': return 1;
  //     case 'card2': return 2;
  //     case 'card3': return 3;
  //     case 'card4': return 4;
  //     case 'card5': return 5;
  //     case 'card6': return 6;
  //     case 'card7': return 7;
  //     case 'card8': return 8;
  //     case 'card9': return 9;
  //     case 'card10': return 10;
  //     case 'jack': return 11;
  //     case 'queen': return 12;
  //     case 'king': return 13;
  //   }
  // }

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

  let dealerPlayed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
    let index = Math.floor(Math.random() * dealerPlayed.length);
    let deal = dealerPlayed.splice(index, 1);
    return deal;
  };

  const boardListener = function () {
    let deal = dealerCard();
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
    });

    //when ready button is clicked, players inplay hand goes to played cards sections and opponents card goes to their discard pile
    $("#ready").click((element) => {
      element.preventDefault();
      if ($("#yourplay").html() != "") {
        $("#p2Right").append($(".beenplayed img"));
        $('.beenplayed').remove();
        $("#middleHand").append('<div id="yourplay">');
        $("#p1Right").append($("#p1Hand img:last-child"));
        //changes the score value based on dealer card
        $("#p2Left p").text(Number($("#p2Left p").text()) + cardVal());
        //checks if all dealer cards have been played yet. if not, then randomly draws another one. else, it updates score and exits
        if (dealerPlayed.length > 0) {
          let dealedCard = dealerCard();
          ($('#dealer-play').children()).replaceWith(`<img id=${dealedCard} src = ${playingCards[dealedCard]}>`);
        } else {
          ($('#dealer-play').children()).replaceWith(`<div></div>`)
        }
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

  //when forfeit button is clicked, board reinitializes and inactivates
  $("#forfeit").click((event) => {
    event.preventDefault();
    $("#display").replaceWith(newBoard());
    $("#rightSide #display").css('opacity', '0.3');
  });
})
