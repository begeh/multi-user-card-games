const { Pool } = require('pg');

const pool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'multiusercardgames'
});


const newGame = function(user1, user2) {

  const queryString = `
    SELECT users.id FROM users
    WHERE username = $1 OR username = $2;
  `

  return pool.query(queryString, [`${user1}`, `${user2}`])
  .then(res => {
    console.log(res.rows[0].id, res.rows[1].id);
    constructGameDb(res.rows[0].id, res.rows[1].id);
  })
  .catch(err => console.log(err, err.stack));
}

const constructGameDb = function (user1, user2) {

  gamesDbString = `
    INSERT INTO games_db (player1, player2)
    VALUES ($1, $2) RETURNING *;
  `

  return pool.query(gamesDbString, [`${user1}`, `${user2}`])
  .then(res => {
    console.log(res.rows[0].id);
    initTurnHistory(res.rows[0].id);
  })
  .catch(err => console.log(err, err.stack));
}

const initTurnHistory = function (game_id) {
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

  return pool.query(turnHistoryString, [`${game_id}`])
  .then(res => {
    return res.rows;
  })
  .catch(err => console.log(err, err.stack));
}


newGame('marancholia', 'bashir');

module.exports = { newGame, constructgameDb, initTurnHistory };
