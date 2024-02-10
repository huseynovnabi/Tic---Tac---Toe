let cells = document.querySelectorAll(".cell");
let scoreX = document.querySelector(".scoreX");
let scoreO = document.querySelector(".scoreO");
let statusText = document.querySelector("#statusText");
let restartBtn = document.querySelector("#restartBtn");
let continueBtn = document.querySelector("#continueBtn");
let scoreValue = 0;
let currentPlayer = "X";
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();


function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    statusText.textContent = `${currentPlayer}'s turn`;
    continueBtn.addEventListener("click", continueGame);
    restartBtn.addEventListener("click", restartGame);
}


function cellClick() {
    if (this.textContent == "") {
        this.textContent = currentPlayer;
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s turn`;
        checkWinner();
    }
}


function checkWinner() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        const symbolA = cells[a].textContent;
        const symbolB = cells[b].textContent;
        const symbolC = cells[c].textContent;

        if (symbolA != "" && symbolA === symbolB && symbolA === symbolC) {
            if (symbolA === "X") {
                scoreX.textContent = `${++scoreValue}`;
            } else if (symbolA === "O") {
                scoreValue = 0;
                scoreO.textContent = `${++scoreValue}`;
            }
            statusText.textContent = `${symbolA} Win!`;
            cells[a].style.backgroundColor = "green";
            cells[b].style.backgroundColor = "green";
            cells[c].style.backgroundColor = "green";
            cells.forEach(cell => cell.removeEventListener("click", cellClick));
            return;
        }

        if ([...cells].every(cell => cell.textContent !== "")) {
            statusText.textContent = "Draw!";
        }
    }
}


function continueGame() {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.style.backgroundColor = "");
    startGame();
}


function restartGame() {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.style.backgroundColor = "");
    scoreValue = 0;
    scoreX.textContent = `${scoreValue}`;
    scoreO.textContent = `${scoreValue}`;
    startGame();
}