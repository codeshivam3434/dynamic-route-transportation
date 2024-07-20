class Graph {
    constructor() {
        this.nodes = new Set();
        this.edges = new Map();
    }

    addNode(node) {
        this.nodes.add(node);
        this.edges.set(node, []);
    }

    addEdge(startNode, endNode, weight) {
        this.edges.get(startNode).push({ node: endNode, weight });
        this.edges.get(endNode).push({ node: startNode, weight });
    }

    dijkstra(startNode) {
        let distances = {};
        let previous = {};
        let pq = new PriorityQueue();

        if (!this.nodes.has(startNode)) {
            throw new Error('Start node does not exist in the graph');
        }

        this.nodes.forEach(node => {
            distances[node] = node === startNode ? 0 : Infinity;
            previous[node] = null;
            pq.enqueue(node, distances[node]);
        });

        while (!pq.isEmpty()) {
            let minNode = pq.dequeue().element;
            let currentNode = minNode;

            this.edges.get(currentNode).forEach(neighbor => {
                let alt = distances[currentNode] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    previous[neighbor.node] = currentNode;
                    pq.enqueue(neighbor.node, distances[neighbor.node]);
                }
            });
        }

        return { distances, previous };
    }
}

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element, priority) {
        const node = { element, priority };
        if (this.isEmpty()) {
            this.collection.push(node);
        } else {
            const index = this.collection.findIndex(x => x.priority > node.priority);
            if (index === -1) {
                this.collection.push(node);
            } else {
                this.collection.splice(index, 0, node);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

module.exports = Graph;
