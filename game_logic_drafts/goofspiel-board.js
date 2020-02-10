const { Pool } = require('pg');

const cool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'multiusercardgames'
});

// get user ids to start a new game
const newGame = function(user1, user2) {

  const queryString = `
    SELECT users.id FROM users
    WHERE username = $1 OR username = $2;
  `

  return cool.query(queryString, [`${user1}`, `${user2}`])
  .then(res => {
    console.log(res.rows[0].id, res.rows[1].id);
    constructGame(res.rows[0].id, res.rows[1].id);
  })
  .catch(err => console.log(err, err.stack));
}

const constructGame = function (user1, user2) {

  gamesDbString = `
    INSERT INTO games_db (player1, player2)
    VALUES ($1, $2) RETURNING *;
  `

  turnHistoryString = `
  INSERT INTO turn_history (game_id, turn_no, p1_hand, p2_hand, dealer_hand)
    VALUES (
      $1,
      0,
      ARRAY [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      ARRAY [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      ARRAY [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    ) RETURNING *;
  `

  cool.query(gamesDbString, [`${user1}`, `${user2}`])
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.log(err, err.stack));


  // return cool.query(turnHistoryString, [`${player1}`, `${player2}`])
  // .then(res => {
  //   console.log(res.rows);
  //   return res.rows;
  // })
  // .catch(err => console.log(err, err.stack));
}

newGame('CliffWeir', 'bashir');
