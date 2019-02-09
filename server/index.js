let bodyParser = require('body-parser');
let express = require('express');
let cors = require('cors');
let app = express();
let game = true;
let field = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send();
});

app.get('/field', function (req, res) {
    res.send(field);
});

app.get('/clear', function (req, res) {
    field = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    res.send(field);
});

app.post('/move', function (req, res) {
    const i = req.body.column;
    const player = req.body.player;

    if (game) {
        const newField = [...field];
        if (newField[i].lastIndexOf(0) >= 0) {
            const horizontal = [];
            const mainDiagonal = [];
            const sideDiagonal = [];
            newField[i][newField[i].lastIndexOf(0)] = player;
            newField.forEach(field => {
                horizontal.push(field[newField[i].lastIndexOf(0) + 1]);
            });

            for (
                let x = 0, y = newField[i].lastIndexOf(0) + 1 + i;
                y >= 0;
                x++, y--
            ) {
                if (newField[x] !== undefined && newField[x][y] !== undefined) {
                    mainDiagonal.push(newField[x][y]);
                }
            }

            for (
                let x = 0, y = newField[i].lastIndexOf(0) + 1 - i;
                x < newField.length && y <= newField[i].length;
                x++, y++
            ) {
                if (newField[x][y] !== undefined) {
                    sideDiagonal.push(newField[x][y]);
                }
            }
            if (
                checkGame(newField[i], player) ||
                checkGame(horizontal, player) ||
                checkGame(sideDiagonal, player) ||
                checkGame(mainDiagonal, player)
            ) {
                res.send({field: newField, player: player, game: false})
            } else {
                res.send({field: newField, player: player === 1 ? 2 : 1, game: game})
            }
        }
    }

    function checkGame(field, player) {
        if (game) {
            let count = 0;
            let maxCount = 0;
            field.forEach(cell => {
                if (cell === player) {
                    count++;
                    maxCount = maxCount < count ? count : maxCount;
                } else {
                    count = 0;
                }
            });
            return maxCount === 4;
        }
    }
});

app.listen(5000, () => {
    console.log('Server is ready')
});
