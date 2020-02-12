
$(function () {
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
        $("#p2Right").append($(".beenplayed img"));
        $('.beenplayed').remove();
        $("#middleHand").append('<div id="yourplay">');
       $("#p1Right").append($("#p1Hand img:last-child"));
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
  });

})
