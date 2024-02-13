let messageBox = document.querySelector("#messageBox");
let cells = document.querySelectorAll(".cell");
let scoreX = document.querySelector(".scoreX");
let scoreO = document.querySelector(".scoreO");
let statusText = document.querySelector("#statusText");
let continueBtn = document.querySelector("#continueBtn");
let restartBtn = document.querySelector("#restartBtn");
let yesBtn = document.querySelector("#yesBtn");
let scoreValueX = 0;
let scoreValueO = 0;
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
    yesBtn.addEventListener("click", yesRestart);
}


function yesRestart() {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.style.backgroundColor = "");
    scoreValueX = 0;
    scoreValueO = 0;
    scoreX.textContent = `${scoreValueX}`;
    scoreO.textContent = `${scoreValueO}`;
    messageBox.style.display = "none";
    continueBtn.style.display = "none";
    restartBtn.style.display = "none"
    startGame();
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
                scoreValueX++;
                if (scoreValueX === 3) {
                    messageBox.style.display = "block";
                    messageBox.innerHTML = "";
                    messageBox.append("Game Over - X Won");
                    setTimeout(() => {
                        yesRestart();
                    }, 2000);
                }
                scoreX.textContent = `${scoreValueX}`;
            } else if (symbolA === "O") {
                scoreValueO++;
                if (scoreValueO === 3) {
                    messageBox.style.display = "block";
                    messageBox.innerHTML = "";
                    messageBox.append("Game Over - O Won");
                    setTimeout(() => {
                        yesRestart();
                    }, 2000);
                }
                scoreO.textContent = `${scoreValueO}`;
            }

            statusText.textContent = `${symbolA} Win!`;
            cells[a].style.backgroundColor = "green";
            cells[b].style.backgroundColor = "green";
            cells[c].style.backgroundColor = "green";
            cells.forEach(cell => cell.removeEventListener("click", cellClick));
            continueBtn.style.display = "block";
            restartBtn.style.display = "block";
            return;
        }

        if ([...cells].every(cell => cell.textContent !== "")) {
            statusText.textContent = "Draw!";
            continueBtn.style.display = "block";
            restartBtn.style.display = "block";
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