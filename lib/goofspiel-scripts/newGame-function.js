const { Pool } = require('pg');

const pool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'midterm'
});


const newGame = async function(user1, user2) {

  const queryString = `
    SELECT users.id FROM users
    WHERE username = $1 OR username = $2;
  `

  const res = await pool.query(queryString, [`${user1}`, `${user2}`])

  return constructGameDb(res.rows[0].id, res.rows[1].id);
}

const constructGameDb = async function (user1, user2) {

  gamesDbString = `
    INSERT INTO games_db (player1, player2)
    VALUES ($1, $2) RETURNING *;
  `

  const res = await pool.query(gamesDbString, [`${user1}`, `${user2}`])
  return initTurnHistory(res.rows[0].id);
}

const initTurnHistory = async function (game_id) {

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

  const res = await pool.query(turnHistoryString, [`${game_id}`]);
  return res.rows[0].id;
}

module.exports = { newGame, constructGameDb, initTurnHistory };
