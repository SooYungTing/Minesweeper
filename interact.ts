let board: Status[][] = [];
let field: HTMLElement[][] = [];

enum Status {
    Default = 0,
    Revealed,
    Marked,
    Suspected
}

function initBoard(width: number, height: number) {
    const size: number = width*height;
    for (let i=0; i<height; i++) board.push([]);
    for (let i=0; i<height; i++) for (let j=0; j<width; j++) board[i].push(Status.Default);
}

// Front-end function
function drawBoard(container: HTMLElement, width: number, height: number): void {
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
        field.push(row);
    }
}

// Pre: (x,y) is a set of valid coordinates;
// Post: returns whether revealing the cell lead to loss of game;
function reveal(x: number, y: number): boolean {
    if (board[y][x]==Status.Revealed) return false;
    board[y][x] = Status.Revealed;

    switch (minefield[y][x]) {
        case -1: {
            field[y][x].className = "explode";
            field[y][x].innerText = "💣";
            return true;
        }
        case 0: {
            field[y][x].className = "reveal";
            const m: number = minefield.length, n: number = minefield[0].length;
            // Propagate to surrounding cells (which are guaranteed to be non-bomb as well)
            for (let i=Math.max(0,y-1); i<=Math.min(y+1,m-1); i++)
                for (let j=Math.max(0,x-1); j<=Math.min(x+1,n-1); j++) 
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
function mark(x: number, y: number): void {
    if (board[y][x]==Status.Revealed) return;
    board[y][x] = Status.Marked;
    field[y][x].innerText = "🚩";
}

function suspect(x: number, y: number): void {
    if (board[y][x]==Status.Revealed) return;
    board[y][x] = Status.Marked;
    // TODO: Show suspect icon
}