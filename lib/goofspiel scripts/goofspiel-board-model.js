const { Pool } = require('pg');

const pool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'multiusercardgames'
})

const turnModel = function (game_id, turn_id) {
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
  WHERE game_id = $1 AND turn_no = $2;
  `

  return pool.query(queryString, [`${game_id}`,`${turn_id}`])
  .then(res => {
    // const { player_1, player_2, p1_hand, } = res.rows[0];
    // const players = {
    //   player_1,
    //   player_2
    // }
    return Promise.resolve(res.rows[0]);
  })
  .catch(err => console.log(err, err.stack));
}


turnModel(11, 0)
.then(gameState => {

});

// .catch(err => console.log(err, err.stack));

