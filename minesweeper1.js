var board = [];
var rows = 8;
var columns = 8;

var minesCount = 0;
var minesLocation = []; // "2-2", "3-4", "2-1"

var tilesClicked = 0; //goal to click all tiles except the ones containing mines
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    startGame();
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;

    //populate our board
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}