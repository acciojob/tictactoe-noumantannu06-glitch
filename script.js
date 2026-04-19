let currentPlayer = 1; // 1 for player1 (X), 2 for player2 (O)
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = false;
        let player1Name = '';
        let player2Name = '';

        // Winning combinations
        const winningCombos = [
            [0,1,2], [3,4,5], [6,7,8], // Rows
            [0,3,6], [1,4,7], [2,5,8], // Columns
            [0,4,8], [2,4,6]            // Diagonals
        ];

        document.getElementById('submit').addEventListener('click', startGame);

        function startGame() {
            player1Name = document.getElementById('player-1').value.trim() || 'Player 1';
            player2Name = document.getElementById('player-2').value.trim() || 'Player 2';
            
            document.getElementById('nameForm').style.display = 'none';
            document.getElementById('gameBoard').style.display = 'block';
            
            updateMessage();
            gameActive = true;
        }

        // Cell click handler
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', () => {
                const cellIndex = parseInt(cell.id) - 1;
                
                if (gameBoard[cellIndex] !== '' || !gameActive) return;
                
                // Place mark
                gameBoard[cellIndex] = currentPlayer === 1 ? 'x' : 'o';
                cell.textContent = gameBoard[cellIndex];
                cell.className = `cell ${gameBoard[cellIndex]}`;
                
                if (checkWin()) {
                    document.getElementById('message').textContent = 
                        `${currentPlayer === 1 ? player1Name : player2Name}, congratulations you won!`;
                    gameActive = false;
                    return;
                }
                
                if (checkDraw()) {
                    document.getElementById('message').textContent = "It's a draw!";
                    gameActive = false;
                    return;
                }
                
                // Switch player
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateMessage();
            });
        });

        function updateMessage() {
            const currentName = currentPlayer === 1 ? player1Name : player2Name;
            const symbol = currentPlayer === 1 ? 'X' : 'O';
            document.getElementById('message').textContent = `${currentName} (${symbol}), you're up!`;
        }

        function checkWin() {
            return winningCombos.some(combo => {
                const [a, b, c] = combo;
                return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
            });
        }

        function checkDraw() {
            return gameBoard.every(cell => cell !== '');
        }
