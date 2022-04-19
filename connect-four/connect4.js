/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //make a loop to push empty arrays into the board array
  for (let i=0; i<HEIGHT; i++){
    //create an array the length of the width variable
    //push the array onto the board
    board.push(Array.from({length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  //create a top row in the table
  let top = document.createElement("tr");
  //set the id to column-top
  top.setAttribute("id", "column-top");
  //set a click listener to the top row
  top.addEventListener("click", handleClick);

  //loop through the width of each row
  for (let x = 0; x < WIDTH; x++) {
    //create a varaible to create each cell on the top row
    let headCell = document.createElement("td");
    //set the id to what # it is in the array (so the first one will have an id of 0, second 1, etc.)
    headCell.setAttribute("id", x);
    //append the cells to the top row
    top.append(headCell);
  }
  //append the top row to the baord
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    //as long as y is less than HEIGHT, create a row in the table
    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      //as long as x is less than WIDTH add a column/cell
      const cell = document.createElement("td");
      //set the attribute for each cell to id and to the y-x coordinates of that cell
      cell.setAttribute("id", `${y}-${x}`);
      //append the cell to the table row
      row.append(cell);
    }
    //append the row that was made to the htmlBoard element.
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //loop through the height of the row 
  for(let y=HEIGHT -1; y >= 0; y--){
    //if the board at coordinates yx isn't filled, return the y, otherwise return null
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
  // TODO: make a div and insert into correct table cell
function placeInTable(y, x) {
  //create a new div
  const newPiece = document.createElement('div');
  //add the class of piece and the current player to it 
  newPiece.classList.add('piece');
  newPiece.classList.add(`p${currPlayer}`);
  //find the cell that was clicked on with the id
  const currCell = document.getElementById(`${y}-${x}`);
  //append the current cell to the newDiv
  currCell.append(newPiece);
}


/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //if every row in the board and every cell in those rows are filled then return endGame Tie
  if (board.every(row => row.every(cell => cell))){
    return endGame('Tie!')
}

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  //set the current player to 2 if it's already equal to 1, set it to 1 if it's equal to 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
//loop through both the width and height of the board
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //for every value you're checking y and x coordinates of, check if they are horizontal, vertical, diagnonal right, or diagonal left.  Only one piece on the entire board has to return true, so ([1,2], [1,3], [1,4],[1,5] would return true for horizontal, but checking 1,3 wouldn't, but it doesn't matter because you're checking every single cell.)
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //if the pieces are horizontal, vertical, diagnonal it will return true
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
