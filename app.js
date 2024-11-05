const game = (function () {
  let board = Array(9).fill(0);
  let player1Turn = true;
  let player1Start = true;
  let player1Score = 0;
  let player2Score = 0;
  let won = 0;
  const container = document.getElementById("container");
  const congrats = document.getElementById("congrats");
  const resetGameButton = document.getElementById("resetGameButton");
  const incrementPlayer1 = () => player1Score++;
  const incrementPlayer2 = () => player2Score++;
  const updateBoard = (index) => {
    if (board[index] != 0 || won != 0) return;
    board[index] = player1Turn ? "X" : "O";
    player1Turn = !player1Turn;
    won = checkWin();
    render();
  };

  const resetGame = () => {
    board = Array(9).fill(0);
    player1Score = 0;
    player2Score = 0;
    player1Start = player1Turn = true;
    won = 0;
    congrats.innerHTML = "Game Has Been Reset";
    render();
  };

  const resetBoard = () => {
    board = Array(9).fill(0);
    won = 0;
    player1Turn = player1Start = !player1Start;
    congrats.innerHTML = "";
    const turn = player1Turn ? "X" : "O";
    congrats.textContent = `${turn}'s Start`;
    render();
  };

  const checkWin = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board[3 * i] == board[3 * i + 1] &&
        board[3 * i + 1] == board[3 * i + 2] &&
        board[3 * i] != 0
      )
        return board[3 * i];
      if (
        board[i] == board[i + 3] &&
        board[i + 3] == board[i + 6] &&
        board[i] != 0
      )
        return board[i];
    }
    if (board[4] != 0 && board[0] == board[4] && board[4] == board[8])
      return board[0];
    if (board[4] != 0 && board[2] == board[4] && board[4] == board[6])
      return board[2];
    if (!board.includes(0)) return "tie";
    return 0;
  };

  function addWin(winner) {
    congrats.innerHTML = "";
    if (winner == "X") incrementPlayer1();
    else if (winner == "O") incrementPlayer2();
    const win = document.createElement("h1");
    const message = document.createElement("p");
    const resetButton = document.createElement("button");
    resetButton.classList.add("reset");
    resetButton.textContent = "Play Again";
    resetButton.addEventListener("click", resetBoard);
    if (winner == "tie") {
      win.textContent = `It's a tie.`;
      message.textContent = `The score is still ${player1Score} to ${player2Score}`;
    } else {
      win.textContent = `${winner}'s won!`;
      message.textContent = `The score is now ${player1Score} to ${player2Score}`;
    }
    congrats.appendChild(win);
    congrats.appendChild(message);
    congrats.appendChild(resetButton);
  }

  const render = () => {
    container.innerHTML = "";
    let squares = [];
    board.forEach(function (square, index) {
      let squareElement = document.createElement("div");
      squareElement.classList.add("square");
      squareElement.id = index;
      if (square == "O") {
        squareElement.textContent = "O";
        squareElement.style.color = "blue";
      } else if (square == "X") {
        squareElement.textContent = "X";
        squareElement.style.color = "red";
      }
      squareElement.addEventListener("click", function () {
        return updateBoard(index);
      });
      container.appendChild(squareElement);
      squares.push(squareElement);
    });
    resetGameButton.addEventListener("click", resetGame);
    if (won == "X" || won == "O" || won == "tie") addWin(won);
  };

  return {
    incrementPlayer1,
    incrementPlayer2,
    updateBoard,
    resetGame,
    render,
  };
})();

game.render();
