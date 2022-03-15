//init board into an array
const X_CLASS = 'x';
const O_CLASS = 'o';
const resultsCombo = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
const cellEle = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const resultsMessageEle = document.getElementById('resultsMessage');
const resultsMessageText = document.querySelector('[data-results-message-text]');
const restartButton = document.getElementById('restartBtn');
let oTurn;

start();
restartButton.addEventListener('click', start);

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

function gameDraw () {
	return [...cellEle].every(cell => {
		return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
	});
}

//tie function to DOM
function placeMark(cell, current) {
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
}

function gameWin(current) {
	return resultsCombo.some(resultsCombo => {
		return resultsCombo.every(index => {
			return cellEle[index].classList.contains(current);
		});
	});
}

//store players into object



// name input

// start/restart buttons

//results message

// game AI