const { Pool } = require('pg');

const pool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'multiusercardgames'
})


// TURN MODEL: Takes a game_id and a turn number and returns a promise containing an object with the game board state.
// YOU MUST USE A .then TO ACCESS THE INFO THEREIN.
const getGameData = function (game_id) {
  const queryString = `
  SELECT
  game_id,
  (SELECT users.username
    FROM users
    WHERE games_db.player1 = users.id
  ) as player_1,
  (SELECT users.username
      FROM users
      WHERE users.id = games_db.player2
  ) as player_2,
  turn_no,
  p1_hand,
  p2_hand,
  dealer_hand,
  p1_play,
  p2_play,
  dealer_play,
  p1_score,
  p2_score
  FROM turn_history
  JOIN games_db ON game_id = games_db.id
  WHERE game_id = $1;
  `

  return pool.query(queryString, [`${game_id}`])
  .then(res => {

    return Promise.resolve(res.rows);
  })
  .catch(err => console.log(err, err.stack));
}

getGameData(11).then(res => {
  console.log(res[res.length - 1]);
})
