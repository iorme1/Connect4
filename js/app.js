const boardDOM = document.querySelector('.board');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const startGameBtn = document.querySelector('.start-btn');
const playerMoves = document.querySelector('.col-select');
const dropSlots = document.querySelectorAll('.drop');
const columns = document.querySelectorAll('.row-1 > .drop');



const board = [
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0]
];

const chip = {
    color: null,
    count: 42
};


function gameStart() {
    player1.classList.toggle('hide');
    player2.classList.toggle('hide');

    player1.style.color = "white";
    player1.style.backgroundColor = "black";
    chip.color = 'black';
}


function dropChip(column) {
    chip.count--;
    let rowNum = getRowNum(column);
    let currentMove = [rowNum, column]

    board[rowNum][column] = chip.color;
    let rows = boardDOM.querySelectorAll('tr');

    rows.forEach(function(row,i){
      if (i == rowNum) {
        row.children[column].style.backgroundColor = chip.color;
      }
    });

    // setTimeout used here because if the "winner alert" function
    // gets executed, the alert window pops up before you get to see the move display on screen
    setTimeout(function() {
      checkForWin(currentMove);
    },500)

    changePlayer();
}


function changePlayer() {
  if (chip.color === "black") {
    chip.color = "red";
    player2.style.color = "white";
    player2.style.backgroundColor = "red";

    player1.style.backgroundColor = "";
    player1.style.color = "black";
  } else {
    chip.color = "black";
    player1.style.color = "white";
    player1.style.backgroundColor = "black";

    player2.style.backgroundColor = "";
    player2.style.color = "black";
  }

}


function getRowNum(column) {

  for (let i = 5; i >= 0; i--) {
    if (board[i][column] === 0) {
      return i;
    }
  }
}


function checkForWin(currentMove) {

  let currentColor;
  let x = currentMove[0]; // row
  let y = currentMove[1]; // column

  if (chip.color === "black") {
    currentColor = 'red';
  } else {
    currentColor = 'black';
  }

  function checkLeftRight(x) {
    let count = 0;
    let i = 0;
    while (i < 7) {
      if (board[x][i] === currentColor) {
        count++;
      } else {
        count = 0;
      }

      if (count === 4) {
        winner = currentColor;
        endGame(currentColor);
        return;
      } else {
        i++;
      }
    }
  }

  function checkUpDown(y) {
    let count = 0;
    let i = 0;
    while (i < 6) {
      if (board[i][y] === currentColor) {
        count++;
      } else {
        count = 0;
      }

      if (count === 4) {
        winner = currentColor;
        endGame(currentColor);
        return;
      } else {
        i++;
      }
    }
  }

  function checkLeftDiagonal(x,y) {
    let count = 0;

    while (y > 0) {
      if (x === 0) {
        break;
      }
      x--;
      y--;
    }

    while (x <= 5 && y <= 6) {
      if (board[x][y] === currentColor) {
        count++;
      } else {
        count = 0;
      }

      if (count === 4) {
        winner = currentColor;
        endGame(currentColor);
        return;
      } else {
        x++;
        y++;
      }
    }

  }

  function checkRightDiagonal(x,y) {
      let count = 0;
      while (x > 0) {
        if (y === 6) {
          break;
        }
        x--;
        y++;
      }

      while (x <= 5 && y >= 0) {
        if (board[x][y] === currentColor) {
          count++;
        } else {
          count = 0;
        }

        if (count === 4) {
          winner = currentColor;
          endGame(currentColor);
          return;
        } else {
          x++;
          y--;
        }
      }
  }

  checkLeftRight(x);
  checkUpDown(y);
  checkLeftDiagonal(x,y);
  checkRightDiagonal(x,y);

  if (chip.count === 0) {
    draw();
  }
}


function endGame(winner) {
  alert(`${winner} has won! Click OK to reset game`);
  location.reload();
}

function draw() {
  alert(`Its a draw. Click OK to reset game`);
  location.reload();
}


startGameBtn.addEventListener('click', gameStart);

dropSlots.forEach(slot => {
  slot.addEventListener('click', function() {
    dropChip(this.dataset.col);
  });
});

columns.forEach(col => {
  col.addEventListener('mouseover', function() {
    col.style.backgroundColor = "lightgrey";
  });
  col.addEventListener('mouseout', function() {
    col.style.backgroundColor = "";
  });
});
