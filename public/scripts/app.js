
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

  socket.on('ready', function(data){
    console.log(data + " printed at each socket")
  })
})

// $(function () {
//   $("#goof").on('click', () => {
//     $("#goofLoad").html('<script src="public/scripts/goofspiel.js"></script>')
//     console.log("goofLoad")
//   });
// })
