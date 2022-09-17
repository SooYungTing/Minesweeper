var minefield = [];
function buryMine(width, height, mines) {
    var size = width * height;
    for (var i = 0; i < height; i++)
        minefield.push([]);
    for (var i = 0; i < height; i++)
        for (var j = 0; j < width; j++)
            minefield[i].push(mines-- > 0 ? -1 : 0);
    // Shuffle
    function swap(i, j, x, y) {
        var tmp = minefield[i][j];
        minefield[i][j] = minefield[x][y];
        minefield[x][y] = tmp;
    }
    for (var i = 0; i < size - 1; i++) {
        var rnd = Math.floor(Math.random() * (size - i));
        swap(Math.floor(i / width), i % width, Math.floor(rnd / width), rnd % width);
    }
}
function analyseField() {
    var m = minefield.length, n = minefield[0].length;
    // Fill numbers
    function countMine(x, y) {
        var res = 0;
        for (var i = Math.max(0, y - 1); i <= Math.min(y + 1, m - 1); i++)
            for (var j = Math.max(0, x - 1); j <= Math.min(x + 1, n - 1); j++)
                if (minefield[i][j] < 0)
                    res++;
        return res;
    }
    for (var i = 0; i < m; i++)
        for (var j = 0; j < n; j++)
            if (minefield[i][j] >= 0)
                minefield[i][j] = countMine(j, i);
}
