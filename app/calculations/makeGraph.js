import calculateDistance from "./calculateDistance.js";

import fs from "fs/promises";

let graph = new Map();
let i = 0;

function findLargestComponent() {
  const visited = new Set();
  const components = [];

  function dfs(node, component) {
    visited.add(node);
    component.push(node);

    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor[0])) {
        dfs(neighbor[0], component);
      }
    }
  }
  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      const component = [];
      dfs(node, component);
      components.push(component);
    }
  }

  let largestComponent = [];
  for (const component of components) {
    if (component.length > largestComponent.length) {
      largestComponent = component;
    }
  }

  const largestGraph = new Map();
  for (const node of largestComponent) {
    largestGraph.set(node, graph.get(node));
  }
  return largestGraph;
}

async function makeGraph(inputPath, outputPath) {
  const data = await fs.readFile(inputPath, "utf-8");
  const json = JSON.parse(data);

  json.features.forEach((line) => {
    const coordinates = line.geometry.coordinates;
    coordinates.forEach(([x, y], k) => {
      const key = `${x},${y}`;
      i++;
      if (graph.has(key) !== true) {
        graph.set(key, []);
      }

      if (k === 0) {
        const distance = calculateDistance(
          x,
          y,
          coordinates[k + 1][0],
          coordinates[k + 1][1]
        );
        graph
          .get(key)
          .push([
            `${coordinates[k + 1][0]},${coordinates[k + 1][1]}`,
            distance,
          ]);
      } else if (k === coordinates.length - 1) {
        const distance = calculateDistance(
          x,
          y,
          coordinates[k - 1][0],
          coordinates[k - 1][1]
        );
        graph
          .get(key)
          .push([
            `${coordinates[k - 1][0]},${coordinates[k - 1][1]}`,
            distance,
          ]);
      } else {
        const distancePrev = calculateDistance(
          x,
          y,
          coordinates[k - 1][0],
          coordinates[k - 1][1]
        );
        const distanceNext = calculateDistance(
          x,
          y,
          coordinates[k + 1][0],
          coordinates[k + 1][1]
        );
        graph
          .get(key)
          .push([
            `${coordinates[k - 1][0]},${coordinates[k - 1][1]}`,
            distancePrev,
          ]);
        graph
          .get(key)
          .push([
            `${coordinates[k + 1][0]},${coordinates[k + 1][1]}`,
            distanceNext,
          ]);
      }
    });
  });
  graph = findLargestComponent();
  const graphJson = JSON.stringify(Object.fromEntries(graph));

  await fs.writeFile(outputPath, graphJson, "utf-8");
  console.log("Jest git:", outputPath);
}

const inputPath = "./public/agh-map-lines.json";
const outputPath = "./public/graph.json";

makeGraph(inputPath, outputPath);
