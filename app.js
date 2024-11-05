const game = (function () {
  let board = Array(9).fill(0);
  let player1Turn = true;
  let player1Score = 0;
  let player2Score = 0;
  const container = document.getElementById("container");
  const incrementPlayer1 = () => player1Score++;
  const incrementPlayer2 = () => player2Score++;
  const updateBoard = (index) => {
    if (board[index] != 0) return;
    board[index] = player1Turn ? "X" : "O";
    player1Turn = !player1Turn;
    render();
  };
  const resetGame = () => {
    board = [0] * 9;
    player1Score = 0;
    player2Score = 0;
  };

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
