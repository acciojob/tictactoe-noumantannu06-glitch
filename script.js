//your JS code here. If required.
 const setup = document.getElementById("setup");
    const game = document.getElementById("game");
    const player1Input = document.getElementById("player-1");
    const player2Input = document.getElementById("player-2");
    const submitBtn = document.getElementById("submit");
    const messageEl = document.getElementById("message");
    const cells = document.querySelectorAll(".cell");


let currentPlayer; // 1 or 2
    let player1Name = "";
    let player2Name = "";
    let board = Array(9).fill(""); // 0–8 map to cells 1–9


const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];

    // Show setup initially, hide game
    setup.style.display = "block";
    game.style.display = "none";

    // Submit button handler
    submitBtn.addEventListener("click", function () {
      player1Name = player1Input.value.trim() || "Player 1";
      player2Name = player2Input.value.trim() || "Player 2";

      // Switch to game view
      setup.style.display = "none";
      game.style.display = "block";

      // Initialize game
      currentPlayer = 1;
      board = Array(9).fill("");
      messageEl.textContent = `${player1Name}, you're up`;

      // Clear cells
      cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("filled");
      });

      // Add click handlers to cells
      cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
      });
    });

    // Handle a cell click
    function handleCellClick(e) {
      const cell = e.target;
      const index = parseInt(cell.id) - 1;

      // Only allow move if cell is empty
      if (board[index] || cell.classList.contains("filled")) return;

      // Update board and UI
      const mark = currentPlayer === 1 ? "X" : "O";
      board[index] = mark;
      cell.textContent = mark;
      cell.classList.add("filled");

      // Check for win
      if (checkWin()) {
        const winnerName = currentPlayer === 1 ? player1Name : player2Name;
        messageEl.textContent = `${winnerName} congratulations you won!`;
        // Remove listeners so players can’t keep playing
        cells.forEach(c => c.removeEventListener("click", handleCellClick));
        return;
      }

      // Switch turns
      currentPlayer = 3 - currentPlayer; // toggles 1↔2
      const nextName = currentPlayer === 1 ? player1Name : player2Name;
      messageEl.textContent = `${nextName}, you're up`;
    }

    // Check if current player has won
    function checkWin() {
      const mark = currentPlayer === 1 ? "X" : "O";
      return winPatterns.some(pattern =>
        pattern.every(i => board[i] === mark)
      );
    }
