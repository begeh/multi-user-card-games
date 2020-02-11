$(function () {
  const name = $('#user-name u strong').text();
  const socket = io.connect('http://localhost:8080');
  $("#ready").on('click', () => {
    socket.emit('ready', name)
  });

  socket.on('ready', function(data){
    console.log(data + " printed at each socket")
  })

  $("#goof").on('click', () => {
    socket.emit('goof-join')
    console.log("Attemping goofSpace join")
  });

  socket.on('You', function(data) {
    console.log(data)
  })

})
