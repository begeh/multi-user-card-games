//Reference for the main.ejs file and main.scss file

//main.ejs is split into three grid columns, the id for all of these columns is #not_header
//These three grid columns each represent a <section>, with their own id: leftSide, middle, rightSide
//leftSide contains the dropdown menu buttons
//rightSide contains the play area
//middle is simply for the divider


//leftSide

//Menu containing dropdown buttons, fairly self explanatory
//Needs routing for each menu option

//middle

//Nothing to say really

//rightSide

//Where most of the work will be done. the area under "Play Area" is a div with the
//id "display", split into a 3x3 grid composed of the div elemtns it contains.
//Since the 9 divs that populate the 3x3 grid are contained within a single element,
//modifiying them with jquery shouldn't mess with the formatting of the entire page
//Each grid has a unique id based on it's horizontal and vertical positions, and they all
//share the class "gamespace"
//These ids will let us display and modify the contents of the grid to represent the states of each
//players hand, the dealers deck and shown card, point totals, played cards, and the
//ready and forfiet buttons
