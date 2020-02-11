const { newGame, constructGameDb, initTurnHistory } = require('./newGame-function.js');
const { getGameData } = require('./getGameData-function.js');
const { Turn } = require('./game-logic-classes.js');
const { recordTurnResult, modelTurn } = require('./record-and-update-turns.js');


const gameLoop = function(game_id, turn) {
  if (turn >= 14) {
    // do game end here
  } else {
    getGameData(game_id)
    .then(data => {
      let current_turn = turn || data.length - 1;
      const gameState = new Turn(data[current_turn]);
      // run whatever rendering code
      gameState.dealer.deal();
      // await input {
      // on either ready button click
      if (gameState.player1.ready && gameState.player2.ready) {
        const turnResult = gameState.resolveTurn();
        recordTurnResult(turnResult)
        .then(res => {
          modelTurn(res);
        })
        .then(res => {
          current_turn++;
          gameLoop(game_id, current_turn);
        })
      }
      // end input listening
    })
  }
}
