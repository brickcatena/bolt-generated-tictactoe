const board = document.getElementById('board');
    const cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    function createBoard() {
      for (let i = 0; i < 9; i++) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.id = `cell-${i}`;
        board.appendChild(cellElement);
        cells.push(cellElement);
        cellElement.addEventListener('click', handleCellClick, { once: true });
      }
    }

    function handleCellClick(event) {
      const clickedCell = event.target;
      if (gameActive && !clickedCell.textContent) {
        clickedCell.textContent = currentPlayer;
        checkGameStatus();
      }
    }

    function switchPlayer() {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkGameStatus() {
      const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      let roundWon = false;

      for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = cells[winCondition[0]].textContent;
        const b = cells[winCondition[1]].textContent;
        const c = cells[winCondition[2]].textContent;

        if (a && a === b && b === c) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        gameActive = false;
        alert(`Player ${currentPlayer} has won!`);
        return;
      }

      const roundDraw = !cells.some(cell => cell.textContent === '');

      if (roundDraw) {
        gameActive = false;
        alert('Game ended in a draw!');
        return;
      }

      switchPlayer();
    }

    document.getElementById('reset').addEventListener('click', () => {
      cells.forEach(cell => cell.textContent = '');
      currentPlayer = 'X';
      gameActive = true;
    });

    createBoard();
