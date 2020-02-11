class Actor {

  constructor(hand, play) {
    this.hand = hand;
    this.play = play;
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
    if(!this.play) {
    console.log(`${this.user} is playing ${card}`)
    this.hand.forEach((element, index) => {
      if (card === element) {
        console.log(`FOUND MATCH at hand[${index}]`);
        this.play = element;
        return;
      }
    });
    return console.log(`card not found!`);
    } else {
      console.log('rescinding card...')
      this.play = !this.play;
    }
  }
  ready() {
    this.ready = !this.ready;
  }

  forfeit() {

  }
}

class Dealer extends Actor {

    constructor() {
    super(hand, play);
    this.username = 'Dealer';
  }

  deal() {
      if(this.hand[0]) {
        const cardToDeal = Math.round(Math.random() * (this.hand.length - 1));
        console.log(`cardToDeal: index[${cardToDeal}]`)
        const cardVal = this.hand[cardToDeal];
        return cardVal;
      } else {
        return;
    }
  }
}

class Turn {

  constructor(turnData) {
    this.player1 = new Player(turnData.player_1, turnData.p1_score, turnData.p1_hand, turnData.p1_play);
    this.player2 = new Player(turnData.player_1, turnData.p1_score, turnData.p1_hand, turnData.p1_play);
    this.dealer = new Dealer(turnData.dealer_hand, turnData.dealer_play);
  }

  resolveTurn() {
    const updateHand = function(hand, play) {
      hand.forEach((element, index) => {
        if (element === play) {
           console.log(`FOUND MATCH at hand[${index}]`);
           hand.splice(index, 1);
           return;
        }
      return;
      })
    }

    if(ready1 && ready2) {
    const a = this.player1.play;
    const b = this.player2.play;
    const c = this.dealer.play;

    updateHand(this.player1.hand, a);
    updateHand(this.player2.hand, b);
    updateHand(this.dealer.hand, c);


    a === b ? console.log('TIEEEEE') :
      a > b ? this.player1.score += c :
        this.player2.score += c;

    return {
      p1_play: this.player1.play,
      p2_play: this.player2.play,
      dealer_play: this.dealer.play
      }
    } else {
      console.log('players not ready!');
    }
  }

}

// class Actor {

//   constructor() {
//     this.hand = [1,2,3,4,5,6,7,8,9,10,11,12,13];
//   }

// }

// class Player extends Actor {

//   constructor(user) {
//     super();
//     this.user = user;
//     this.score = 0;
//   }

//   play(card) {
//     console.log(`${this.user} is playing ${card}`)
//     let result = 0;
//     this.hand.forEach((element, index) => {
//       if (card === element) {
//         console.log(`FOUND MATCH at hand[${index}]`);
//         // this.hand.splice(index, 1);
//         // console.log(`${this.user}'s hand: ${this.hand}`);
//         // console.log(`${element}, ${typeof element}`)
//         result = element;
//         return;
//       }
//     });
//     return result;

//   }
// }

// class Dealer extends Actor {

//   constructor() {
//     super();
//     this.user = 'Dealer';
//   }

//
// }

// // INIT/CONSTRUCT THE GAME BOARD:

// class Board {

//

//   startTurn() {
//     this.dealerPlay = this.dealer.deal();
//     console.log(`Turn Started. Dealer Has Dealt: ${this.dealerPlay}`);
//   }

//   p1play(card) {
//     this.p1Card = this.player1.play(card);
//     console.log(`${this.player1.user} has played ${this.p1card}`);
//   }

//   p2play(card) {
//     this.p2Card = this.player2.play(card);
//     console.log(`${this.player2.user} has played ${this.p2card}`);
//   }



//   resolveTurn() {
//     const a = this.p1Card;
//     const b = this.p2Card;
//     const c = this.dealerPlay;

//     console.log(`p1 = ${a}, p2 = ${b}`);

//     a === b ? console.log('TIEEEEE') :
//       a > b ? this.player1.score += c :
//         this.player2.score += c;
//   }

// }


// const game = new Board('cliff', 'bashir');
// console.log(`NEW GAMEEEEEEEE:`)
// game.startTurn();
// game.p1play(4);
// game.p2play(6);
// game.resolveTurn();
// console.log(`${game.player1.score}, ${game.player2.score}`);



// // game.resolveTurn(p1play, p2play);
// // console.log(`DID IT WORK? LeTS CHECK: ${game.player1.score} VS ${game.player2.score}`)
