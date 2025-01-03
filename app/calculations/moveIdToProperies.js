import fs from "fs/promises";

async function moveIdToProperties(inputPath, outputPath) {
  try {
    const data = await fs.readFile(inputPath, "utf-8");
    const json = JSON.parse(data);

    if (!Array.isArray(json.features)) {
      throw new Error("Неверный формат данных: отсутствует массив 'features'.");
    }

    json.features = json.features.map((feature) => {
      if (feature.id && feature.properties) {
        feature.properties.id = feature.id;
        delete feature.id;
      }
      return feature;
    });

    await fs.writeFile(outputPath, JSON.stringify(json, null, 2), "utf-8");
    console.log("Jest git:", outputPath);
  } catch (err) {
    console.error("Nie jest git:", err);
  }
}

const inputPath = "./app/components/agh-map-lines.json";
const outputPath = "./app/components/agh-map-lines.json";

moveIdToProperties(inputPath, outputPath);
