import calculateDistance from "./calculateDistance.js";
import PriorityQueue from "js-priority-queue";

function findNearestPoint([x1, y1], graph) {
  let minDistance = Infinity;
  let nearestPoint = null;
  for (const key in graph) {
    const [x2, y2] = key.split(",").map(Number);
    const distance = calculateDistance(x1, y1, x2, y2);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPoint = `${x2},${y2}`;
    }
  }
  return [nearestPoint, minDistance];
}

export default function calculatePath(points, graph) {
  let fullDistance = 0,
    fullPath = [];
  for (let i = 0; i < points.length - 1; i++) {
    let [startPoint, distanceFromStart] = findNearestPoint(
      points[i].coordinates,
      graph
    );
    let [endPoint, distanceFromEnd] = findNearestPoint(
      points[i + 1].coordinates,
      graph
    );
    const distances = new Map();
    const previous = new Map();
    const visited = new Set();
    for (const key in graph) {
      distances.set(key, Infinity);
    }
    distances.set(startPoint, distanceFromStart);
    const pq = new PriorityQueue({ comparator: (a, b) => a[0] - b[0] });
    pq.queue([distanceFromStart, startPoint]);
    while (pq.length > 0) {
      const [distance, node] = pq.dequeue();
      if (visited.has(node)) continue;
      visited.add(node);
      for (const [neighbor, edgeDistance] of graph[node]) {
        const newDistance = distance + edgeDistance;
        if (newDistance < distances.get(neighbor)) {
          distances.set(neighbor, newDistance);
          previous.set(neighbor, node);
          pq.queue([newDistance, neighbor]);
        }
      }
    }
    let path = [];
    for (let node = endPoint; node !== startPoint; node = previous.get(node)) {
      path.push(node.split(",").map(Number));
    }
    path.push(startPoint.split(",").map(Number));
    const distance = distances.get(endPoint) + distanceFromEnd;
    fullDistance += distance;
    fullPath.push(...path.reverse());
  }
  return [fullDistance, fullPath];
}
