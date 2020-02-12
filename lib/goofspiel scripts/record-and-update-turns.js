const { Pool } = require('pg');

const pool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'multiusercardgames'
});


// THIS FUNCTION takes the return of a Turn.resolveTurn, deconstructs the object,
// completes the associated turn's record, and then returns the object that was passed into it as a promise.
// recordTurnResult should be followed with modelTurn.
const recordTurnResult = async function(resolvedTurn) {

  const { game_id, turn_no, p1_play, p2_play, dealer_play } = resolvedTurn;
  const values = [`${game_id}`, `${turn_no}`, `${p1_play}`, `${p2_play}`, `${dealer_play}`]

  const queryString = `
  UPDATE turn_history
  SET p1_play = $1,
    p2_play = $2,
    dealer_play = $3
  WHERE
    game_id = $4
    AND
    turn_no = $5;
  `
  await pool.query(queryString, values);
  return resolvedTurn;
}


// THIS FUNCTION takes in the result of a completed turn, deconstructs that turn, and builds the next turn in the database.
// it then returns the next turn number. IF THIS TURN NUMBER is 14 OR HIGHER, please break the loop and follow with recordResult()!
// if the turn number is under 14, please re-run the full game logic function.
// WE WILL BE USING RECURSION TO ACCOMPLISH THIS
const modelTurn = async function(resolvedTurn) {
  const { game_id, turn_no, p1_hand, p2_hand, dealer_hand, p1_score, p2_score } = resolvedTurn;
  const values = [`${game_id}`, `${turn_no + 1}`, `${p1_hand}`, `${p2_hand}`, `${dealer_hand}`, `${p1_score}`, `${p2_score}`];

  const queryString = `
  INSERT INTO turn_history (
    game_id,
    turn_no,
    p1_hand,
    p2_hand,
    dealer_hand,
    p1_score,
    p2_score
    )
    VALUES(
      $1, $2, ARRAY $3, ARRAY $4, ARRAY $5, $6, $7
    ) RETURNING *;
  `
    const res = await pool.query(queryString, values);
    return res.rows[0].turn_no;
}

// TEST CODE
// recordTurnResult({
//   game_id: 16,
//   turn_no: 6,
//   p1_play: 6,
//   p2_play: 9,
//   dealer_play: 4
// }).then(res => {
//   console.log(res);


module.exports = { recordTurnResult, modelTurn };
