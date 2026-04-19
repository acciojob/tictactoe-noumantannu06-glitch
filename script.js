let currentPlayer = 1;
        let gameBoard = Array(9).fill('');
        let gameActive = false;
        let player1Name = 'Player 1';
        let player2Name = 'Player 2';

        const winningCombos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        document.getElementById('submit').onclick = startGame;

        function startGame() {
            player1Name = document.getElementById('player1').value.trim() || 'Player 1';
            player2Name = document.getElementById('player2').value.trim() || 'Player 2';
            
            document.getElementById('nameForm').style.display = 'none';
            document.getElementById('gameBoard').style.display = 'block';
            gameActive = true;
            gameBoard.fill('');
            document.querySelectorAll('.cell').forEach(cell => {
                cell.textContent = '';
                cell.className = 'cell';
            });
            updateMessage();
        }

        document.querySelectorAll('.cell').forEach((cell, index) => {
            cell.onclick = () => makeMove(index);
        });

        function makeMove(index) {
            if (gameBoard[index] !== '' || !gameActive) return;
            
            gameBoard[index] = currentPlayer === 1 ? 'x' : 'o';
            const cell = document.getElementById(index + 1);
            cell.textContent = gameBoard[index];
            cell.className = `cell ${gameBoard[index]}`;
            
            if (checkWin()) {
                document.getElementById('message').textContent = 
                    `${currentPlayer === 1 ? player1Name : player2Name}, congratulations you won!`;
                gameActive = false;
                return;
            }
            
            if (gameBoard.every(cell => cell !== '')) {
                document.getElementById('message').textContent = "It's a draw!";
                gameActive = false;
                return;
            }
            
            currentPlayer = 3 - currentPlayer; // Switch 1<->2
            updateMessage();
        }

        function updateMessage() {
            const name = currentPlayer === 1 ? player1Name : player2Name;
            document.getElementById('message').textContent = `${name}, you're up`;
        }

        function checkWin() {
            return winningCombos.some(combo => {
                return combo.every(i => gameBoard[i] === gameBoard[combo[0]]);
            });
        }