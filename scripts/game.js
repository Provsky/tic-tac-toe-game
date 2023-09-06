function resetGameStatus(){
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOverElement.firstElementChild.innerHTML = "You won, <span id=\"winner-name\"> PLAYER NAME</span>!";
    gameOverElement.style.display = "none";

    let gameBordIndex = 0;
    for (let i = 0; i < 3; i++){
        for(let j = 0; j<3; j++){
            gameData[i][j] = 0;
            const gameBoardItemelement =  gameBoardElement.children[gameBordIndex];
            gameBoardItemelement.textContent = "";
            gameBoardItemelement.classList.remove("disabled");
            gameBordIndex++;
        }
    }

}

function startNewGame() {
  if (players[0].name === "" || players[1] === "") {
    alert("Please set custom player name for both players!");
    return;
  }

  resetGameStatus();

  gameActiveElement.style.display = "block";
  activePLayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();
  if (winnerId !==0 ){
    endGame(winnerId);
  }
  currentRound++;
  switchPlayer();
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePLayerNameElement.textContent = players[activePlayer].name;
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }
  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
  if (winnerId > 0) {
    gameOverElement.firstElementChild.firstElementChild.textContent =
      players[winnerId - 1].name;
  }else {
    gameOverElement.firstElementChild.textContent = "It\'s a draw!"
  }
  gameOverElement.style.display = "block";
}
