class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isTarget = false;
        this.isWall = false;
        this.distance = Infinity;
        this.isVisited = false;
        this.previousNode = null;
    }
}