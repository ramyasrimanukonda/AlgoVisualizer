/**
 * DIJKSTRA'S ALGORITHM LOGIC
 * Returns an array of visited nodes in the order they were explored.
 */
function dijkstra(grid, startNode, targetNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
        // Sort unvisited nodes by distance (Priority Queue behavior)
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        const closestNode = unvisitedNodes.shift();

        // If we encounter a wall, skip it
        if (closestNode.isWall) continue;

        // If the closest node is at a distance of infinity, we are trapped
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        // If we reach the target, we are done
        if (closestNode === targetNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function updateUnvisitedNeighbors(node, grid) {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const { r, c } = node;
    if (r > 0) neighbors.push(grid[r - 1][c]);
    if (r < grid.length - 1) neighbors.push(grid[r + 1][c]);
    if (c > 0) neighbors.push(grid[r][c - 1]);
    if (c < grid[0].length - 1) neighbors.push(grid[r][c + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Function to backtrack from target to start to find the shortest path
function getNodesInShortestPathOrder(targetNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = targetNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}