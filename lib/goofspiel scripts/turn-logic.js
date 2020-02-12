const { newGame, constructGameDb, initTurnHistory } = require('./newGame-function.js');
const { getGameData } = require('./getGameData-function.js');
const { Turn } = require('./game-logic-classes.js');
const { recordTurnResult, modelTurn } = require('./record-and-update-turns.js');
const { Pool } = require('pg');

const pool = new Pool ({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'multiusercardgames'
});

(async function() {
  const game = await newGame('CliffWeir', 'bashir');
  initTurn(game);
})();



// .then(data => {
//   const game = new Turn(data);
//   console.log(game);
// })
// .catch(err => console.log(err, err.stack));



const initTurn = async function(game_id, turn) {
  if (turn >= 14) {
    // do game end here
    return;
  } else {
    const gameData = await getGameData(game_id);
      turn ? turn = turn : turn = data.length - 1;
      const gameState = new Turn(gameData[turn]);
      // run whatever rendering code
      gameState.dealer.deal();
      // await input {
      // on either ready button click
      if (gameState.player1.ready && gameState.player2.ready) {
        const turnResult = gameState.resolveTurn();
        const recordedTurn = await recordTurnResult(turnResult);
        const newTurn = await modelTurn(recordedTurn);
        initTurn(game_id, newTurn);
      }
      // end input listening
  }
}

module.exports = { initTurn };
