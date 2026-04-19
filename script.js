let currentPlayer = 1;
        let board = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        let p1Name = 'Player 1';
        let p2Name = 'Player 2';

        const wins = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        document.getElementById('submit').addEventListener('click', e => {
            e.preventDefault();
            p1Name = document.getElementById('player1').value || 'Player 1';
            p2Name = document.getElementById('player2').value || 'Player 2';
            document.getElementById('nameForm').style.display = 'none';
            document.getElementById('gameBoard').style.display = 'block';
            updateMessage();
        });

        document.querySelectorAll('.cell').forEach((cell, i) => {
            cell.addEventListener('click', () => {
                if (board[i] !== '' || !gameActive) return;
                board[i] = currentPlayer === 1 ? 'x' : 'o';
                cell.textContent = board[i];
                cell.classList.add(board[i]);
                if (checkWin()) {
                    document.getElementById('message').textContent = 
                        `${currentPlayer === 1 ? p1Name : p2Name}, congratulations you won!`;
                    gameActive = false;
                    return;
                }
                if (!board.includes('')) {
                    document.getElementById('message').textContent = 'Draw!';
                    gameActive = false;
                    return;
                }
                currentPlayer = 3 - currentPlayer;
                updateMessage();
            });
        });

        function updateMessage() {
            const name = currentPlayer === 1 ? p1Name : p2Name;
            document.getElementById('message').textContent = `${name}, you're up`;
        }

        function checkWin() {
            return wins.some(combo => combo.every(i => board[i] === board[combo[0]] && board[i]));
        }
