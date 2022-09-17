let count: number = 0;
let board: HTMLElement[][] = [];

// Front-end function
function drawBoard(container: HTMLElement, width: number, height: number, mines: number): void {
    updateCount(mines);
    for (let r = 0; r < height; r++) {
        let row: HTMLElement[] = [];
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("div");
            tile.className = "default"
            tile.onclick = function() { reveal(c, r); };
            tile.oncontextmenu = function() { mark(c, r); return false; };
            container.append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function updateCount(cnt: number) {
    count = cnt;
    document.getElementById("mines-count")!.innerText = count.toString();
}

// Pre: (x,y) is a set of valid coordinates;
// Post: returns whether revealing the cell lead to loss of game;
function reveal(x: number, y: number): boolean {
    if (board[y][x].className!="default") return false;

    switch (minefield[y][x]) {
        case -1: {
            board[y][x].className = "explode";
            board[y][x].innerText = "💣";
            return true;
        }
        case 0: {
            board[y][x].className = "reveal";
            const m: number = minefield.length, n: number = minefield[0].length;
            // Propagate to surrounding cells (which are guaranteed to be non-bomb as well)
            for (let i=Math.max(0,y-1); i<=Math.min(y+1,m-1); i++)
                for (let j=Math.max(0,x-1); j<=Math.min(x+1,n-1); j++) 
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
function mark(x: number, y: number): void {
    switch (board[y][x].className) {
        case "default": {
            board[y][x].className = "flagged";
            board[y][x].innerText = "🚩";
            updateCount(count-1);
            break;
        }
        case "flagged": {
            board[y][x].className = "default";
            board[y][x].innerText = "";
            updateCount(count+1);
            break;
        }
    }
}