function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function getConfig() {
    var config = await fetch('/config');
    return config.json();
}

function setSessionId() {
    var sessionId = uuidv4();
    return localStorage.setItem('gameId', sessionId);
}

function getSessionId() {
    var sessionId = localStorage.getItem('gameId');
    if (!sessionId) window.location.reload();
    return sessionId;
}

function clearSessionId() {
    return localStorage.removeItem('gameId');
}

function rebuildFooter() {
    var footer = document.getElementsByTagName('footer')[0];
    footer.parentNode.removeChild(footer);
    var newFooter = document.createElement('footer');
    document.body.appendChild(newFooter);
    var footer = document.getElementsByTagName('footer')[0];
    return footer;
}

function appendData(data) {
    var footer = rebuildFooter();
    data.forEach(function(item) {
        var p = document.createElement('p');
        var text = document.createTextNode(`${item.action}`);
        p.appendChild(text);
        footer.appendChild(p);
    })
}

async function postRequest(url, data) {
    return await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
}


async function startGame() {
    setSessionId();

    var _id = getSessionId();
    var config = await getConfig();
    var apiUrl = config.apiUrl;

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
    };
    var turn = 1;

    async function handleData(field, i) {
        var player, move;

        if (field.innerHTML === '' && turn % 2 === 1) {
            player = 1;
            move = 'X';
            field.innerHTML = movesMap[i] = move;
            turn++;
        } else if (field.innerHTML === '' && turn % 2 === 0) {
            player = 2;
            move = 'O';
            field.innerHTML = movesMap[i] = move;
            field.style.color = 'red';
            turn++;
        }
        field.style.cursor = 'auto';

        if (player) {
            var currentDate = new window.Date();

            var payload = {
                id: _id,
                action: `Player ${player} has checked ${move} on cell ${i} at ${currentDate.toLocaleString()}.`,
            }

            await postRequest(apiUrl + '/moves', payload);
            var history = await postRequest(apiUrl + '/history', { id: _id });
            var result = await history.json();
            appendData(result.history);
        }
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
        Object.keys(movesMap).forEach(function (key) {
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
            clearSessionId();

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
                handleData(cell, index + 1);
                getResult();
            });
        })();
    }
}

startGame();