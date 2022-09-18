var rows = 8, cols = 8, mines = 8;
var minefield = [];
function buryMine() {
    minefield = [];
    var size = rows * cols;
    for (var i = 0; i < rows; i++)
        minefield.push([]);
    var remaining = mines;
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++)
            minefield[i].push(remaining-- > 0 ? -1 : 0);
    // Shuffle
    function swap(i, j, x, y) {
        var tmp = minefield[i][j];
        minefield[i][j] = minefield[x][y];
        minefield[x][y] = tmp;
    }
    for (var i = 0; i < size - 1; i++) {
        var rnd = Math.floor(Math.random() * (size - i));
        swap(Math.floor(i / cols), i % cols, Math.floor(rnd / cols), rnd % cols);
    }
}
function analyseField() {
    // Fill numbers
    function countMine(x, y) {
        var res = 0;
        for (var i = Math.max(0, y - 1); i <= Math.min(y + 1, rows - 1); i++)
            for (var j = Math.max(0, x - 1); j <= Math.min(x + 1, cols - 1); j++)
                if (minefield[i][j] < 0)
                    res++;
        return res;
    }
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++)
            if (minefield[i][j] >= 0)
                minefield[i][j] = countMine(j, i);
}
