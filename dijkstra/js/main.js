const ROWS = 20;
const COLS = 45;
let grid = [];
let startNode = null;
let targetNode = null;
let isRunning = false;

function init() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${COLS}, 25px)`;
    grid = [];
    isRunning = false;

    // Randomize Start and Target positions
    const sR = Math.floor(Math.random() * ROWS);
    const sC = Math.floor(Math.random() * 10);
    const tR = Math.floor(Math.random() * ROWS);
    const tC = Math.floor(Math.random() * 10) + (COLS - 11);

    for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
            const node = {
                r, c,
                isStart: r === sR && c === sC,
                isTarget: r === tR && c === tC,
                isWall: false,
                isVisited: false,
                distance: Infinity,
                previousNode: null
            };

            const cell = document.createElement('div');
            cell.id = `node-${r}-${c}`;
            cell.className = 'cell';
            if (node.isStart) { cell.classList.add('start'); startNode = node; }
            if (node.isTarget) { cell.classList.add('target'); targetNode = node; }

            cell.onmousedown = () => toggleWall(node, cell);
            cell.onmouseenter = (e) => { if (e.buttons === 1) toggleWall(node, cell); };

            container.appendChild(cell);
            grid[r][c] = node;
        }
    }
}

function toggleWall(node, el) {
    if (isRunning || node.isStart || node.isTarget) return;
    node.isWall = !node.isWall;
    el.classList.toggle('wall');
}

async function visualize() {
    if (isRunning) return;
    isRunning = true;

    // Run the algorithm from dijkstra.js
    const visitedNodesInOrder = dijkstra(grid, startNode, targetNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);

    // Animate the search process
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isTarget) {
            document.getElementById(`node-${node.r}-${node.c}`).classList.add('visited');
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }

    // Animate the winning path
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.r}-${node.c}`).classList.add('path');
        await new Promise(resolve => setTimeout(resolve, 30));
    }
    isRunning = false;
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', visualize);
document.getElementById('random-btn').addEventListener('click', init);
document.getElementById('clear-btn').addEventListener('click', init);

window.onload = init;