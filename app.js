const game = (function () {
  let board = Array(9).fill(0);
  board[1] = "X";
  board[2] = "O";
  let player1Turn = true;
  let player1Score = 0;
  let player2Score = 0;
  const incrementPlayer1 = () => player1Score++;
  const incrementPlayer2 = () => player2Score++;
  const updateBoard = () => {
    const index = this.id;
    board[index] = player1Turn ? "X" : "O";
    render();
  };
  const resetGame = () => {
    board = [0] * 9;
    player1Score = 0;
    player2Score = 0;
  };

  const render = () => {
    const container = document.getElementById("container");
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
      squareElement.addEventListener("click", updateBoard.bind(squareElement));
      container.appendChild(squareElement);
      squares.push(squareElement);
    });
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
