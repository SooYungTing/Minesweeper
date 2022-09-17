var board = [];
// Front-end function
function drawBoard(container, width, height) {
    var _loop_1 = function (r) {
        var row = [];
        var _loop_2 = function (c) {
            var tile = document.createElement("div");
            tile.className = "default";
            tile.onclick = function () { reveal(c, r); };
            tile.oncontextmenu = function () { mark(c, r); return false; };
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
// Pre: (x,y) is a set of valid coordinates;
// Post: returns whether revealing the cell lead to loss of game;
function reveal(x, y) {
    if (board[y][x].className == "reveal")
        return false;
    switch (minefield[y][x]) {
        case -1: {
            board[y][x].className = "explode";
            board[y][x].innerText = "💣";
            return true;
        }
        case 0: {
            board[y][x].className = "reveal";
            var m = minefield.length, n = minefield[0].length;
            // Propagate to surrounding cells (which are guaranteed to be non-bomb as well)
            for (var i = Math.max(0, y - 1); i <= Math.min(y + 1, m - 1); i++)
                for (var j = Math.max(0, x - 1); j <= Math.min(x + 1, n - 1); j++)
                    reveal(j, i);
            break;
        }
        default: {
            board[y][x].className = "reveal";
            board[y][x].innerText = minefield[y][x].toString();
            break;
        }
    }
    return false;
}
// Pre: (x,y) is a set of valid coordinates
function mark(x, y) {
    if (board[y][x].className == "reveal")
        return;
    board[y][x].innerText = "🚩";
}
