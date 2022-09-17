function buryMine(width: number, height: number, mines: number): boolean[][] {
    const size: number = width*height;
    let minefield: boolean[][] = [];
    for (let i=0; i<height; i++) minefield.push([]);
    for (let i=0; i<height; i++) for (let j=0; j<width; j++) minefield[i].push(mines-->0);
    // Shuffle
    function swap(i: number, j: number, x: number, y: number) {
        const tmp: boolean = minefield[i][j];
        minefield[i][j] = minefield[x][y];
        minefield[x][y] = tmp;
    }
    for (let i=0; i<size-1; i++) {
        const rnd = Math.random()*(size-i);
        swap(Math.trunc(i/width), i%width, Math.trunc(rnd/width), rnd%width);
    }
    return minefield;
}