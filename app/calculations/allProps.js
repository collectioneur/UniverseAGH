import fs from "fs/promises";

async function showAllProps(inputPath, outputPath) {
  try {
    const data = await fs.readFile(inputPath, "utf-8");
    const json = JSON.parse(data);

    if (!Array.isArray(json.features)) {
      throw new Error("Неверный формат данных: отсутствует массив 'features'.");
    }

    let map = new Map();
    json.features.forEach((feature) => {
      for (let key in feature.properties) {
        if (!map.has(key)) {
          map.set(
            key,
            feature.properties[key] ? [feature.properties[key]] : []
          );
        } else {
          let arr = map.get(key);
          if (!arr.includes(feature.properties[key])) {
            map
              .get(key)
              .push(feature.properties[key] ? feature.properties[key] : null);
          }
        }
      }
    });
    await fs.writeFile(
      outputPath,
      JSON.stringify(Object.fromEntries(map)),
      "utf-8"
    );
    console.log("Jest git: ", outputPath);
  } catch (err) {
    console.error("Nie jest git:", err);
  }
}

const inputPath = "./public/agh-map-points.json";
const outputPath = "./public/all-about-points.json";

showAllProps(inputPath, outputPath);
