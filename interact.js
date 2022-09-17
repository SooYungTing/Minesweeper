var board = [];
var field = [];
var Status;
(function (Status) {
    Status[Status["Default"] = 0] = "Default";
    Status[Status["Revealed"] = 1] = "Revealed";
    Status[Status["Marked"] = 2] = "Marked";
    Status[Status["Suspected"] = 3] = "Suspected";
})(Status || (Status = {}));
function initBoard(width, height) {
    var size = width * height;
    for (var i = 0; i < height; i++)
        board.push([]);
    for (var i = 0; i < height; i++)
        for (var j = 0; j < width; j++)
            board[i].push(Status.Default);
}
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
        field.push(row);
    };
    for (var r = 0; r < height; r++) {
        _loop_1(r);
    }
}
// Pre: (x,y) is a set of valid coordinates;
// Post: returns whether revealing the cell lead to loss of game;
function reveal(x, y) {
    if (board[y][x] == Status.Revealed)
        return false;
    board[y][x] = Status.Revealed;
    switch (minefield[y][x]) {
        case -1: {
            field[y][x].className = "explode";
            field[y][x].innerText = "💣";
            return true;
        }
        case 0: {
            field[y][x].className = "reveal";
            var m = minefield.length, n = minefield[0].length;
            // Propagate to surrounding cells (which are guaranteed to be non-bomb as well)
            for (var i = Math.max(0, y - 1); i <= Math.min(y + 1, m - 1); i++)
                for (var j = Math.max(0, x - 1); j <= Math.min(x + 1, n - 1); j++)
                    reveal(j, i);
            break;
        }
        default: {
            field[y][x].className = "reveal";
            field[y][x].innerText = minefield[y][x].toString();
            break;
        }
    }
    return false;
}
// Pre: (x,y) is a set of valid coordinates, same below
function mark(x, y) {
    if (board[y][x] == Status.Revealed)
        return;
    board[y][x] = Status.Marked;
    field[y][x].innerText = "🚩";
}
function suspect(x, y) {
    if (board[y][x] == Status.Revealed)
        return;
    board[y][x] = Status.Marked;
    // TODO: Show suspect icon
}
