let game: boolean = true;
let correct: number = 0;
let incorrect: number = 0;
let board: HTMLElement[][] = [];

// Front-end function
function drawBoard(container: HTMLElement, width: number, height: number): void {
    updateCount();
    for (let r = 0; r < height; r++) {
        let row: HTMLElement[] = [];
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("div");
            tile.className = "default"
            tile.onclick = function() { if (game) if (reveal(c, r)) game=false; };
            tile.oncontextmenu = function() { if (game) if (mark(c, r)) { alert("You win!"); game = false; } return false; };
            container.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function updateCount() {
    document.getElementById("mines-count")!.innerText = (mines-correct-incorrect).toString();
}

// Pre: (x,y) is a set of valid coordinates;
// Post: returns whether revealing the cell lead to loss of game;
function reveal(x: number, y: number): boolean {
    if (board[y][x].className!="default") return false;

    switch (minefield[y][x]) {
        case -1: {
            board[y][x].className = "explode";
            board[y][x].innerText = "💣";
            for (let i=0; i<rows; i++) for (let j=0; j<cols; j++) {
                if (minefield[i][j]<0 && board[i][j].className=="default") {
                    board[i][j].className = "reveal";
                    board[i][j].innerText = "💣";
                } else if (minefield[i][j]>=0 && board[i][j].className=="flagged") {
                    board[i][j].className = "explode";
                    board[i][j].innerText = "❌";
                }
            }
            return true;
        }
        case 0: {
            board[y][x].className = "reveal";
            // Propagate to surrounding cells (which are guaranteed to be non-bomb as well)
            for (let i=Math.max(0,y-1); i<=Math.min(y+1,rows-1); i++)
                for (let j=Math.max(0,x-1); j<=Math.min(x+1,cols-1); j++) 
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
// Post: returns whether revealing the cell lead to winning of game;
function mark(x: number, y: number): boolean {
    switch (board[y][x].className) {
        case "default": {
            board[y][x].className = "flagged";
            board[y][x].innerText = "🚩";
            if (minefield[y][x]<0) correct++; else incorrect++;
            break;
        }
        case "flagged": {
            board[y][x].className = "default";
            board[y][x].innerText = "";
            if (minefield[y][x]<0) correct--; else incorrect--;
            break;
        }
    }
    updateCount();
    return correct==mines && incorrect==0;
}