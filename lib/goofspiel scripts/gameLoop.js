const { newGame, constructGameDb, initTurnHistory } = require('./newGame-function.js');
const { getGameData } = require('./getGameData-function.js');
const { Turn } = require('./game-logic-classes.js');
const { recordTurnResult, modelTurn } = require('./record-and-update-turns.js');


newGame('CliffWeir', 'bashir')
.then(res => {
  gameLoop(res[0].id)
})

const gameLoop = function(game_id, turn) {
  if (turn >= 14) {
    // do game end here
    return;
  } else {
    getGameData(game_id)
    .then(data => {
      turn ? turn = turn : turn = data.length - 1;
      const gameState = new Turn(data[turn]);
      // run whatever rendering code
      gameState.dealer.deal();
      // await input {
      // on either ready button click
      if (gameState.player1.ready && gameState.player2.ready) {
        const turnResult = gameState.resolveTurn();
        recordTurnResult(turnResult)
        .then(data => {
          modelTurn(data);
        })
        .then(newTurn => {
          gameLoop(game_id, newTurn);
        })
      }
      // end input listening
    })
  }
}
