let mines = 0;
let minefield: number[][] = [];

function buryMine(width: number, height: number): void {
    const size: number = width*height;
    for (let i=0; i<height; i++) minefield.push([]);
    let remaining: number = mines;
    for (let i=0; i<height; i++) for (let j=0; j<width; j++) minefield[i].push(remaining-->0? -1: 0);
    // Shuffle
    function swap(i: number, j: number, x: number, y: number): void {
        const tmp: number = minefield[i][j];
        minefield[i][j] = minefield[x][y];
        minefield[x][y] = tmp;
    }
    for (let i=0; i<size-1; i++) {
        const rnd: number = Math.floor(Math.random()*(size-i));
        swap(Math.floor(i/width), i%width, Math.floor(rnd/width), rnd%width);
    }
}

function analyseField(): void {
    const m: number = minefield.length, n: number = minefield[0].length;
    // Fill numbers
    function countMine(x: number, y: number): number {
        let res: number = 0;
        for (let i=Math.max(0,y-1); i<=Math.min(y+1,m-1); i++)
            for (let j=Math.max(0,x-1); j<=Math.min(x+1,n-1); j++) 
                if (minefield[i][j]<0) res++;
        return res;
    }
    for (let i=0; i<m; i++) 
        for (let j=0; j<n; j++)
            if (minefield[i][j]>=0) minefield[i][j] = countMine(j,i);
}