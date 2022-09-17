enum Status {
    Default = 0,
    Revealed,
    Marked,
    Suspected
}

// Pre: (x,y) is a set of valid coordinates;
// Post: returns whether revealing the cell lead to loss of game;
function reveal(board: Status[][], minefield: number[][], x: number, y: number): boolean {
    if (board[y][x]==Status.Revealed) return false;
    board[y][x] = Status.Revealed;

    switch (minefield[y][x]) {
        case -1: {
            // TODO: Show bomb icon
            return true;
        }
        case 0: {
            // TODO: Show empty count
            const m: number = minefield.length, n: number = minefield[0].length;
            // Propagate to surrounding cells (which are guaranteed to be non-bomb as well)
            for (let i=Math.max(0,y-1); i<Math.min(y+1,m-1); i++)
                for (let j=Math.max(0,x-1); j<Math.min(x+1,n-1); j++) 
                    reveal(board, minefield, j, i);
            break;
        }
        default: {
            // TODO: Show mine count
            break;
        }
    }
    return false;
}

// Pre: (x,y) is a set of valid coordinates, same below
function mark(board: Status[][], x: number, y: number): void {
    if (board[y][x]==Status.Revealed) return;
    board[y][x] = Status.Marked;
    // TODO: Show mark icon
}

function suspect(board: Status[][], x: number, y: number): void {
    if (board[y][x]==Status.Revealed) return;
    board[y][x] = Status.Marked;
    // TODO: Show suspect icon
}