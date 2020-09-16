function startGame() {
    var cells = document.getElementsByTagName('td');
    var movesMap = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
    }
    var turn = 1;

    function fillCells(field, i) {
        if (field.innerHTML === "" && turn % 2 === 1) {
            field.innerHTML = movesMap[i] = 'X';
        }
        if (field.innerHTML === "" && turn % 2 === 0) {
            field.innerHTML = movesMap[i] = 'O';
            field.style.color = 'red';
        }

        turn++;
    }

    function computeWinner() {
        if (movesMap[1] === 'X' && movesMap[2] === 'X' && movesMap[3] === 'X') return 'p1';
        if (movesMap[1] === 'O' && movesMap[2] === 'O' && movesMap[3] === 'O') return 'p2';
        if (movesMap[4] === 'X' && movesMap[5] === 'X' && movesMap[6] === 'X') return 'p1';
        if (movesMap[4] === 'O' && movesMap[5] === 'O' && movesMap[6] === 'O') return 'p2';
        if (movesMap[7] === 'X' && movesMap[8] === 'X' && movesMap[9] === 'X') return 'p1';
        if (movesMap[7] === 'O' && movesMap[8] === 'O' && movesMap[9] === 'O') return 'p2';
        if (movesMap[1] === 'X' && movesMap[4] === 'X' && movesMap[7] === 'X') return 'p1';
        if (movesMap[1] === 'O' && movesMap[4] === 'O' && movesMap[7] === 'O') return 'p2';
        if (movesMap[2] === 'X' && movesMap[5] === 'X' && movesMap[8] === 'X') return 'p1';
        if (movesMap[2] === 'O' && movesMap[5] === 'O' && movesMap[8] === 'O') return 'p2';
        if (movesMap[3] === 'X' && movesMap[6] === 'X' && movesMap[9] === 'X') return 'p1';
        if (movesMap[3] === 'O' && movesMap[6] === 'O' && movesMap[9] === 'O') return 'p2';
        if (movesMap[1] === 'X' && movesMap[5] === 'X' && movesMap[9] === 'X') return 'p1';
        if (movesMap[1] === 'O' && movesMap[5] === 'O' && movesMap[9] === 'O') return 'p2';
        if (movesMap[3] === 'X' && movesMap[5] === 'X' && movesMap[7] === 'X') return 'p1';
        if (movesMap[3] === 'O' && movesMap[5] === 'O' && movesMap[7] === 'O') return 'p2';

        var draw = true;
        Object.keys(movesMap).forEach(key => {
            if ((movesMap[key]) === '') draw = false;
        })

        if (draw) return 'draw';
    }

    function stopGame(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function getResult() {
        var winner = computeWinner();

        if (winner) {
            document.addEventListener('click', stopGame, true);

            switch (winner) {
                case 'p1':
                    return alert('Player 1 wins!');
                case 'p2':
                    return alert('Player 2 wins!');
                case 'draw':
                    return alert('There is a draw!')
            }
        }
    }

    for (var i = 0; i < cells.length; i++) {
        (function () {
            var cell = cells[i];
            var index = i;

            cell.addEventListener('click', function () {
                fillCells(cell, index + 1);
                getResult();
            });
        })();
    }
}

startGame();