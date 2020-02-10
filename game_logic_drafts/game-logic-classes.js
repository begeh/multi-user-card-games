


class Actor {

  constructor() {
    this.hand = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  }

}

class Player extends Actor {

  constructor(user) {
    super();
    this.user = user;
    this.score = 0;
  }

  play(card) {
    console.log(`${this.user} is playing ${card}`)
    let result = 0;
    this.hand.forEach((element, index) => {
      if (card === element) {
        console.log(`FOUND MATCH at hand[${index}]`);
        // this.hand.splice(index, 1);
        // console.log(`${this.user}'s hand: ${this.hand}`);
        // console.log(`${element}, ${typeof element}`)
        result = element;
        return;
      }
    });
    return result;

  }
}

class Dealer extends Actor {

  constructor() {
    super();
    this.user = 'Dealer';
  }

  deal() {
      if(this.hand[0]) {
      const cardToDeal = Math.round(Math.random() * (this.hand.length - 1));
      console.log(`cardToDeal: index[${cardToDeal}]`)
      const cardVal = this.hand[cardToDeal];
      // this.hand.splice(cardToDeal, 1);
      return cardVal;
    } else {
      return ;
    }
  }
}

// INIT/CONSTRUCT THE GAME BOARD:

class Board {

  constructor(user1, user2) {
    this.player1 = new Player(user1);
    this.player2 = new Player(user2);
    this.dealer = new Dealer();
  }

  startTurn() {
    this.dealerPlay = this.dealer.deal();
    console.log(`Turn Started. Dealer Has Dealt: ${this.dealerPlay}`);
  }

  p1play(card) {
    this.p1Card = this.player1.play(card);
    console.log(`${this.player1.user} has played ${this.p1card}`);
  }

  p2play(card) {
    this.p2Card = this.player2.play(card);
    console.log(`${this.player2.user} has played ${this.p2card}`);
  }



  resolveTurn() {
    const a = this.p1Card;
    const b = this.p2Card;
    const c = this.dealerPlay;

    console.log(`p1 = ${a}, p2 = ${b}`);

    a === b ? console.log('TIEEEEE') :
      a > b ? this.player1.score += c :
        this.player2.score += c;
  }

}


const game = new Board('cliff', 'bashir');
console.log(`NEW GAMEEEEEEEE:`)
game.startTurn();
game.p1play(4);
game.p2play(6);
game.resolveTurn();
console.log(`${game.player1.score}, ${game.player2.score}`);



// game.resolveTurn(p1play, p2play);
// console.log(`DID IT WORK? LeTS CHECK: ${game.player1.score} VS ${game.player2.score}`)
