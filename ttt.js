//init board into an array
/*const X_CLASS = 'x';
const O_CLASS = 'o';
/*const resultsCombo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];*/
/*const cellEle = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');*/
/*const resultsMessageEle = document.getElementById('resultsMessage');
const resultsMessageText = document.querySelector('[data-results-message-text]');
const restartButton = document.getElementById('restartBtn');
let oTurn;*/

//start();
//restartButton.addEventListener('click', start);
/*
// build game object
function start() {
	oTurn = false;
	cellEle.forEach(cell => {
		cell.classList.remove(X_CLASS);
		cell.classList.remove(O_CLASS);
		cell.removeEventListener('click', Clicked);
	//only fire event once
		cell.addEventListener('click', Clicked, { once:true });
	});
	boardHover();
	resultsMessageEle.classList.remove('show');
}

function Clicked(e) {
	const cell = e.target;
	const current = oTurn ? O_CLASS : X_CLASS;
	//make function to add mark
	placeMark(cell, current);
	if (gameWin(current)) {
		gameEnd(false);
	} else if (gameDraw()) {
		gameEnd(true);
	} else {
		nextTurn();
		boardHover();
	}
}

//game over check
function gameEnd(draw) {
	if (draw) {
		resultsMessageText.innerText = 'Draw!'
	} else {
		resultsMessageText.innerText = `${oTurn ? "O's" : "X's"} Wins!`
	}
	resultsMessageEle.classList.add('show');
}


/*function gameDraw () {
	return [...cellEle].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}*/

//tie function to DOM
/*function placeMark(cell, current) {
	cell.classList.add(current);
}

function nextTurn() {
	oTurn = !oTurn
}

//tie function to DOM
function boardHover() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);
	if (oTurn) {
		board.classList.add(O_CLASS);
	} else {
		board.classList.add(X_CLASS);
	};
}*/

/*function gameWin(current) {
	return resultsCombo.some(resultsCombo => {
		return resultsCombo.every(index => {
			return cellEle[index].classList.contains(current);
		});
	});
}*/

//---Module and Factory pattern starts here---

//store players into object

const playerFactory = (name, mark) => {
  const playTurn = (board, cell) => {
    const idx = board.cells.findIndex(position => position === cell);
    if (board.boardArray[idx] === '') {
      board.render();
      return idx;
    }
    return null;
  };

  return { name, mark, playTurn };
};

	//init board into an array
	const boardModule = (() => {
		let boardArray = ['', '', '', '', '', '', '', '', ''];
		const gameBoard = document.querySelector('.board');
  		const cells = Array.from(document.querySelectorAll('.cell'));
  		let winner = null;
  		const cellEle = document.querySelectorAll('[data-cell]');
		const board = document.getElementById('board');
		const resultsMessageEle = document.getElementById('resultsMessage');
		const resultsMessageText = document.querySelector('[data-results-message-text]');
		const restartButton = document.getElementById('restartBtn');

		/*const boardHover = () => {
			board.classList.remove(playerOne);
			board.classList.remove(playerTwo);
			if (oTurn) {
				board.classList.add(playerTwo);
			} else {
				board.classList.add(playerOne);
			};
		};*/

  		const render = () => {
		    boardArray.forEach((mark, idx) => {
		      cells[idx].textContent = boardArray[idx];
		    });
		  };

		  const reset = () => {
		    boardArray = ['', '', '', '', '', '', '', '', ''];
		  };

		  const checkWin = () => {
		    const winArrays = [
		      [0, 1, 2],
		      [3, 4, 5],
		      [6, 7, 8],
		      [0, 3, 6],
		      [1, 4, 7],
		      [2, 5, 8],
		      [0, 4, 8],
		      [2, 4, 6],
		    ];

		    winArrays.forEach((combo) => {
		      if (boardArray[combo[0]]
		        && boardArray[combo[0]] === boardArray[combo[1]]
		        && boardArray[combo[0]] === boardArray[combo[2]]) {
		        winner = 'current';
		      }
		    });
		    return winner || (boardArray.includes('') ? null : 'Tie');
		  };

  return {
    render, gameBoard, cells, boardArray, checkWin, reset, boardHover
  };
})();

const gamePlay = (() => {
  const playerOneName = document.querySelector('#player1');
  const playerTwoName = document.querySelector('#player2');
  const form = document.querySelector('.form');
  const restartBtn = document.querySelector('restartBtn');
  let currentPlayer;
  let playerOne;
  let playerTwo;

  const switchTurn = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const gameRound = () => {
    const board = boardModule;
    const gameStatus = document.querySelector('.game-status');
    if (currentPlayer.name !== '') {
      gameStatus.textContent = `${currentPlayer.name}'s Turn`;
    } else {
      gameStatus.textContent = 'Board: ';
    }

    board.gameBoard.addEventListener('click', (event) => {
      event.preventDefault();
      const play = currentPlayer.playTurn(board, event.target);
      if (play !== null) {
        board.boardArray[play] = `${currentPlayer.mark}`;
        board.render();
        const winStatus = board.checkWin();
        if (winStatus === 'Tie') {
          gameStatus.textContent = 'Tie!';
        } else if (winStatus === null) {
          switchTurn();
          gameStatus.textContent = `${currentPlayer.name}'s Turn`;
        } else {
          gameStatus.textContent = `Winner is ${currentPlayer.name}`;
          board.reset();
          board.render();
        }
      }
    });
  };

  const gameInit = () => {
    if (playerOneName.value !== '' && playerTwoName.value !== '') {
      playerOne = playerFactory(playerOneName.value, 'X');
      playerTwo = playerFactory(playerTwoName.value, 'O');
      currentPlayer = playerOne;
      gameRound();
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (playerOneName.value !== '' && playerTwoName.value !== '') {
      gameInit();
      form.classList.add('hidden');
      document.querySelector('.place').classList.remove('hidden');
    } else {
      window.location.reload();
    }
  });

  restartBtn.addEventListener('click', () => {
    document.querySelector('.game-status').textContent = 'Board: ';
    document.querySelector('#player1').value = '';
    document.querySelector('#player2').value = '';
    window.location.reload();
  });
  return {
    gameInit,
  };
})(); 
 gamePlay.gameInit();


// name input

// start/restart buttons

//results message

// game AI