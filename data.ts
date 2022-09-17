let rows: number = 0, cols: number = 0, mines: number = 0;
let minefield: number[][] = [];

function buryMine(): void {
    const size: number = rows*cols;
    for (let i=0; i<rows; i++) minefield.push([]);
    let remaining: number = mines;
    for (let i=0; i<rows; i++) for (let j=0; j<cols; j++) minefield[i].push(remaining-->0? -1: 0);
    // Shuffle
    function swap(i: number, j: number, x: number, y: number): void {
        const tmp: number = minefield[i][j];
        minefield[i][j] = minefield[x][y];
        minefield[x][y] = tmp;
    }
    for (let i=0; i<size-1; i++) {
        const rnd: number = Math.floor(Math.random()*(size-i));
        swap(Math.floor(i/cols), i%cols, Math.floor(rnd/cols), rnd%cols);
    }
}

function analyseField(): void {
    // Fill numbers
    function countMine(x: number, y: number): number {
        let res: number = 0;
        for (let i=Math.max(0,y-1); i<=Math.min(y+1,rows-1); i++)
            for (let j=Math.max(0,x-1); j<=Math.min(x+1,cols-1); j++) 
                if (minefield[i][j]<0) res++;
        return res;
    }
    for (let i=0; i<rows; i++) 
        for (let j=0; j<cols; j++)
            if (minefield[i][j]>=0) minefield[i][j] = countMine(j,i);
}