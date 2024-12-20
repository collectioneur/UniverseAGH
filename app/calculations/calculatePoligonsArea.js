import fs from "fs/promises";

async function calculatePoligonsArea(inputPath, outputPath) {
  try {
    const data = await fs.readFile(inputPath, "utf-8");
    const json = JSON.parse(data);

    if (!Array.isArray(json.features)) {
      throw new Error("Неверный формат данных: отсутствует массив 'features'.");
    }
    json.features.forEach((feature) => {
      let coordinates = feature.geometry.coordinates;
      if (feature.geometry.type === "Polygon") {
        coordinates = coordinates[0];
      } else if (feature.geometry.type === "MultiPolygon") {
        coordinates = coordinates[0][0];
      }
      let area = 0;
      let zoom = 1;
      let centroidX = 0,
        centroidY = 0;
      coordinates.forEach((coord, index) => {
        let [x1, y1] = coord;
        let [x2, y2] = coordinates[(index + 1) % coordinates.length];
        centroidX += (x1 + x2) * (x1 * y2 - x2 * y1);
        centroidY += (y1 + y2) * (x1 * y2 - x2 * y1);
        // x1 *= 77300;
        // x2 *= 77300;
        // y1 *= 111111;
        // y2 *= 111111;
        area += x1 * y2 - x2 * y1;
      });
      area = Math.abs(area / 2);
      centroidX = centroidX / (area * 6);
      centroidY = centroidY / (area * 6);
      feature.properties.centroid = [centroidX, centroidY];
      //   console.log([centroidX.toFixed(10), centroidY.toFixed(10)]);
      //   if (area > 300) zoom = 1;
      //   else if (area > 100) zoom = 2;
      //   else if (area > 50) zoom = 3;
      //   else zoom = 4;
      //   feature.properties.zoom = zoom;
    });
    await fs.writeFile(outputPath, JSON.stringify(json, null, 2), "utf-8");
    console.log("Jest git:", outputPath);
  } catch (err) {
    console.error("Nie jest git:", err);
  }
}

const inputPath = "./public/agh-map-poligons.json";
const outputPath = "./public/agh-map-poligons.json";

calculatePoligonsArea(inputPath, outputPath);
