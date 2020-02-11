
// $(() => {
//   $("#ready").on('click', () => {
//     alert("Hello")
//   });
// });

$(function () {
  const name = $('#user-name u strong').text();
  const socket = io.connect('http://localhost:8080');
  $("#ready").on('click', () => {
    socket.emit('ready', name)
  });

  socket.on('ready', function (data) {
    console.log(data + " printed at each socket")
  })

  //when player clicks on a card, it is moved to the middle of game board for play
  $(".inplay").click((event) => {
    event.preventDefault();
    if ($("#yourplay").html() == "") {
      $("#middleHand #yourplay").replaceWith($(event.target).parent());
      ($(event.target).parent()).addClass('beenplayed');
    }
    else {
      $("#p2Hand").append($(".beenplayed"));
      $('.beenplayed').removeClass('beenplayed');
      $("#middleHand").append($(event.target).parent());
      $(event.target).parent().addClass('beenplayed');
    }
  });

  //when ready button is clicked, players inplay hand goes to played cards sections
  $("#ready").click((element) => {
    element.preventDefault();
    if ($("#yourplay").html() != "") {
      $("#p2Right").append($(".beenplayed"));
      $('.beenplayed').removeClass('beenplayed');
      $("#middleHand").append('<div id="yourplay">');
    }
  });

})

// $(function () {
//   $("#goof").on('click', () => {
//     $("#goofLoad").html('<script src="public/scripts/goofspiel.js"></script>')
//     console.log("goofLoad")
//   });
// })
