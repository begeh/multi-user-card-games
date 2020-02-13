//GAME LOGIC CLASSES:
// the primary class here is TURN. turn takes in a position the result array of a getTurn function
// and creates a game board complete with methods to advance the game.
//
//
// TO INIT: pass in the result of getTurnData at the desired turn index! The class handles deconstruction
// by itself.
//
// TO USE:
//
// Turn.dealer.deal() to deal a card, and returns the value of that card!
// Turn.Player.play(card) to play a card. if that card is already in play, it will rescind the card!
// Turn.Player.isReady() to toggle ready state
// Turn.resolveTurn() to resolve the turn and return an object containing all values to be written to the database
// KEEP FIT AND HAVE FUN
// IT'S PROGGY BREAK, WITH CLIFF JOHNSON AND BASHIR MCCLOUD

class Actor {

  constructor(hand, play) {
    this.hand = hand;
    this.played = play;
  }

}

class Player extends Actor {

  constructor(username, score, hand, play) {
    super(hand, play);
    this.username = username;
    this.score = score;
    this.ready = false;
  }

  play(card) {
    if(this.played !== card) {
    console.log(`${this.username} is playing ${card}`)
    this.hand.forEach((element, index) => {
      if (card === element) {
        console.log(`FOUND MATCH at hand[${index}]`);
        this.played = element;
        return;
      }
    });
    } else {
      console.log('rescinding card...')
      this.played = !this.played;
    }
  }

  isReady() {
    this.ready = !this.ready;
  }

  forfeit() {

  }
}

class Dealer extends Actor {

    constructor(hand, play) {
    super(hand, play);
    this.username = 'Dealer';
  }

  deal() {
      if(this.hand[0]) {
        const cardToDeal = Math.round(Math.random() * (this.hand.length - 1));
        console.log(`cardToDeal: index[${cardToDeal}]`)
        const cardVal = this.hand[cardToDeal];
        this.played = cardVal;
      } else {
        return cardVal;
    }
  }
}

class Turn {

  constructor(turnData) {
    const { game_id, turn_no, player_1, player_2, p1_score, p2_score, p1_hand, p2_hand, dealer_hand, p1_play, p2_play, dealer_play } = turnData;

    this.player1 = new Player(player_1, p1_score, p1_hand, p1_play);
    this.player2 = new Player(player_2, p2_score, p2_hand, p2_play);
    this.dealer = new Dealer(dealer_hand, dealer_play);
    this.turn = turn_no;
    this.gameId = game_id;
  }

  resolveTurn() {

    const updateHand = function(hand, play) {
      hand.forEach((element, index) => {
        if (element === play) {
           console.log(`FOUND MATCH at hand[${index}]`);
           hand.splice(index, 1);
          }
        })
        console.log(hand);
        return hand;
    }

    if(this.player1.ready && this.player2.ready) {

      const a = this.player1.played;
      const b = this.player2.played;
      const c = this.dealer.played;

      const x = updateHand(this.player1.hand, a);
      const y = updateHand(this.player2.hand, b);
      const z = updateHand(this.dealer.hand, c);

      a === b ? console.log('TIEEEEE') :
        a > b ? this.player1.score += c :
          this.player2.score += c;
      console.log('score has run');

      return {
        p1_play: a,
        p2_play: b,
        dealer_play: this.dealer.played,
        p1_hand: x,
        p2_hand: y,
        dealer_hand: z,
        p1_score: this.player1.score,
        p2_score: this.player2.score,
        turn_no: this.turn,
        game_id: this.gameId
        }

    } else {
      console.log('players not ready!');
      return false;
    }
  }
}



module.exports = { Turn } ;


// THIS IS TEST CODE
