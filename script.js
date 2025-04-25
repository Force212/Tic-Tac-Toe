// Переменные
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const gameOverMessage = document.getElementById("game-over-message");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Победные комбинации
const winningCombinations = [
    [0, 1, 2], // Горизонталь
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Вертикаль
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Диагональ
    [2, 4, 6]
];

// Функция для обновления текста состояния игры
function updateStatus(message) {
    statusText.textContent = message;
}

// Функция для проверки победителя
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            isGameActive = false;
            updateStatus(`Player ${boardState[a]} wins! 🎉`);
            showGameOverMessage();
            return true;
        }
    }

    // Проверка на ничью
    if (!boardState.includes("")) {
        isGameActive = false;
        updateStatus("It's a tie! 😐");
        showGameOverMessage();
        return true;
    }

    return false;
}

// Функция для обработки кликов по ячейкам
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (boardState[index] || !isGameActive) return;

    // Обновляем состояние доски и ячейки
    boardState[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    // Проверяем победителя
    if (checkWinner()) return;

    // Меняем игрока
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus(`Player ${currentPlayer}'s turn`);
}

// Функция для перезапуска игры
function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    updateStatus(`Player ${currentPlayer}'s turn`);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
    hideGameOverMessage();
}

// Функция для показа окна "Конец игры"
function showGameOverMessage() {
    gameOverMessage.classList.add("active");
}

// Функция для скрытия окна "Конец игры"
function hideGameOverMessage() {
    gameOverMessage.classList.remove("active");
}

// Добавляем обработчики событий
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);

// Начальное сообщение
updateStatus(`Player ${currentPlayer}'s turn`);