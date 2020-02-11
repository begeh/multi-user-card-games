//Console.logs on this page appear in the repsective clients console (chrome)
//Some of those Will most need to be changed to alerts, popups, whatever

$(function () {
  //This is the users name, we can pass this data through socket.io
  const name = $('#user-name u strong').text();
  const socket = io.connect('http://localhost:8080');

  //Watches for the goofspiel new game item is clicked, then emits a
  //a goof-join event that is caught in server.js
  $("#goof").on('click', () => {
    socket.emit('goof-join')
    console.log("Attemping goofRoom join")
  });

  //Logs to the clients browsers console. Can be communicated
  //to the user in a better way, decide during group merge discussion
  socket.on('userJoin', function (data) {
    console.log(data.welcome)
  })

  //Listens for the user to hit the ready button
  //Ready button should not be displayed until a game is loaded, will
  //dicuss this during the group merge
  $("#ready").on('click', () => {
    socket.emit('goofReady', name)
  });

  //Logs to the clients browsers console. Can be communicated
  //to the user in a better way, decide during group merge discussion
  socket.on('ready', function (data) {
    console.log(data.send + " joined the room")
  })

})
