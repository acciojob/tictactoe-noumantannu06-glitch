 let currentPlayer = 1;
        let board = Array(9).fill('');
        let gameActive = true;
        let p1Name = 'Player 1';
        let p2Name = 'Player 2';

        const wins = [
            [0,1,2], [3,4,5], [6,7,8],  // rows
            [0,3,6], [1,4,7], [2,5,8],  // cols
            [0,4,8], [2,4,6]            // diags
        ];

        // Form submit
        document.getElementById('submit').onclick = (e) => {
            e.preventDefault();
            p1Name = document.getElementById('player1').value.trim() || 'Player 1';
            p2Name = document.getElementById('player2').value.trim() || 'Player 2';
            
            document.getElementById('nameForm').style.display = 'none';
            document.getElementById('gameBoard').style.display = 'block';
            document.getElementById('reset').style.display = 'block';
            updateMessage();
        };

        // Cell clicks (fixed indexing with data-index)
        document.querySelectorAll('.cell').forEach(cell => {
            cell.onclick = () => {
                const index = parseInt(cell.dataset.index);
                if (board[index] !== '' || !gameActive) return;
                
                board[index] = currentPlayer === 1 ? 'X' : 'O';
                cell.textContent = board[index];
                cell.classList.add(board[index].toLowerCase());
                
                if (checkWin()) {
                    document.getElementById('message').innerHTML = 
                        `${currentPlayer === 1 ? p1Name : p2Name} <strong>WINS!</strong>`;
                    gameActive = false;
                    return;
                }
                if (board.every(cell => cell !== '')) {
                    document.getElementById('message').textContent = "It's a DRAW!";
                    gameActive = false;
                    return;
                }
                currentPlayer = 3 - currentPlayer;
                updateMessage();
            };
        });

        // Reset
        document.getElementById('reset').onclick = () => {
            board = Array(9).fill('');
            gameActive = true;
            currentPlayer = 1;
            document.querySelectorAll('.cell').forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o');
            });
            document.getElementById('message').textContent = '';
            updateMessage();
        };

        function updateMessage() {
            const name = currentPlayer === 1 ? p1Name : p2Name;
            document.getElementById('message').textContent = `${name}'s turn (X/O)`;
        }

        function checkWin() {
            return wins.some(combo => 
                combo.every(i => board[i] === board[combo[0]] && board[i] !== '')
            );
        }