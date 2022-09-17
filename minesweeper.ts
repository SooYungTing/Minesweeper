var minefield: boolean[];
var width: number, height: number;

function buryMine(width: number, height: number, mines: number): boolean[] {
    const size: number = width*height;
    let minefield: boolean[] = [];
    for (let i=0; i<mines; i++) minefield.push(true);
    for (let i=0; i<size-mines; i++) minefield.push(false);
    // Shuffle
    function swap(i: number, j: number) {
        const tmp: boolean = minefield[i];
        minefield[i] = minefield[j];
        minefield[j] = tmp;
    }
    for (let i=0; i<size-1; i++) swap(i, Math.floor(Math.random()*(size-i)));
    return minefield;
}