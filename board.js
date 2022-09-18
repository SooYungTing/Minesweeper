var game = true;
var flagged = 0;
var revealed = 0;
var board = [];
// Front-end function
function drawBoard(container, width, height) {
    updateCount();
    var _loop_1 = function (r) {
        var row = [];
        var _loop_2 = function (c) {
            var tile = document.createElement("div");
            tile.className = "default";
            tile.onclick = function () { if (game)
                if (reveal(c, r))
                    game = false; };
            tile.oncontextmenu = function () { if (game)
                mark(c, r); return false; };
            container.append(tile);
            row.push(tile);
        };
        for (var c = 0; c < width; c++) {
            _loop_2(c);
        }
        board.push(row);
    };
    for (var r = 0; r < height; r++) {
        _loop_1(r);
    }
}
function updateCount() {
    document.getElementById("mines-count").innerText = (mines - flagged).toString();
}
// Pre: (x,y) is a set of valid coordinates;
// Post: returns whether revealing the cell lead to end of game;
function reveal(x, y) {
    if (board[y][x].className != "default")
        return false;
    function lose() {
        for (var i = 0; i < rows; i++)
            for (var j = 0; j < cols; j++) {
                if (minefield[i][j] < 0 && board[i][j].className == "default") {
                    board[i][j].className = "hidden";
                    board[i][j].innerText = "💣";
                }
                else if (minefield[i][j] >= 0 && board[i][j].className == "flagged") {
                    board[i][j].innerText = "❌";
                }
            }
        return true;
    }
    function win() {
        flagged = mines;
        updateCount();
        for (var i = 0; i < rows; i++)
            for (var j = 0; j < cols; j++) {
                switch (board[i][j].className) {
                    case "default":
                    case "flagged": {
                        board[i][j].className = "lucky";
                        board[i][j].innerText = "🍀";
                        break;
                    }
                }
            }
        return true;
    }
    switch (minefield[y][x]) {
        case -1: {
            board[y][x].className = "explode";
            board[y][x].innerText = "💣";
            return lose();
        }
        case 0: {
            board[y][x].className = "reveal";
            // Propagate to surrounding cells (which are guaranteed to be non-bomb as well)
            for (var i = Math.max(0, y - 1); i <= Math.min(y + 1, rows - 1); i++)
                for (var j = Math.max(0, x - 1); j <= Math.min(x + 1, cols - 1); j++)
                    reveal(j, i);
            break;
        }
        default: {
            board[y][x].className = "reveal";
            board[y][x].innerText = minefield[y][x].toString();
            break;
        }
    }
    if (++revealed + mines == rows * cols)
        return win();
    return false;
}
// Pre: (x,y) is a set of valid coordinates
// Post: returns whether revealing the cell lead to winning of game;
function mark(x, y) {
    switch (board[y][x].className) {
        case "default": {
            board[y][x].className = "flagged";
            board[y][x].innerText = "🚩";
            flagged++;
            break;
        }
        case "flagged": {
            board[y][x].className = "default";
            board[y][x].innerText = "";
            flagged--;
            break;
        }
    }
    updateCount();
}
