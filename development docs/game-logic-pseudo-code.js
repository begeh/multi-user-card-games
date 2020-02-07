class Turn {
  constructor () {
    dealer = 0,
    p1 = 0,
    p2 = 0,
    forfiet = null
  }
}

let turnOrder = []

//Runs WHILE
  //Turns less than 13
//BREAKS if
  //someone hits forfiet

while (turns <= 12) {
  //constrcut a new turn object
  const turn = new Turn
  
  // If someone hits forfiet
  //   turn.forfiet = player who hit forfiet
  //   write turn to database
  //   break
  

  //Logic for playing cards
    //Dealer reveals a card
    //Both players pick a card to bet

  //When both players hit ready:
    //get dealer, p1, p2 card
    turn.dealer = 5
    turn.p1 = 7
    turn.p2 = 6
    //Push current turn to turnOrder array
    turnOrder.push(turn)
    //Logic to decide winner for front end display

}

//On proper exit
//write turnOrder to database
// calculate winner 

//on break
// write turnOrder to database