
// $(() => {
//   $("#ready").on('click', () => {
//     alert("Hello")
//   });
// });

    $(function () {
      const socket = io();
      $("#ready").on('click', () => {
        socket.emit('ready', session.user_id)
      });
    })
