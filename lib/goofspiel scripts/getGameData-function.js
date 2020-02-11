const { Pool } = require('pg');
const { Turn } = require('./game-logic-classes.js');

const pool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'multiusercardgames'
})


// getGameData: Takes a game_id and returns a promise containing
// a JSON-like array containing objects with all relevant info about a game and its history.
// use with the Turn object at the desired turn index to construct a turn that can then be rendered and manipulated.
// YOU MUST USE A .then! BE WARNEDED

// TO DO: write an insert query function to write turn results!


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

module.exports = { getGameData };


// TESTING CODE BELOW:

// getGameData(11).then(data => {
//   // console.log(data[data.length - 1]);
//   const turn = new Turn(data[data.length - 1]);
//   console.log(turn);
//   turn.dealer.deal();
//   turn.player1.play(1);
//   turn.player2.play(4);
//   turn.player2.isReady();
//   turn.resolveTurn();
//   turn.player1.isReady();
//   turn.resolveTurn();
//   console.log(turn);
// })
