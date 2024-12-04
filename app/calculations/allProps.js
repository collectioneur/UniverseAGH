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
    console.log(map);
    await fs.writeFile(
      outputPath,
      JSON.stringify(Object.fromEntries(map)),
      "utf-8"
    );
    console.log("Файл успешно обработан и сохранен:", outputPath);
  } catch (err) {
    console.error("Ошибка обработки файла:", err);
  }
}

const inputPath = "./public/agh_map_poligons.json";
const outputPath = "./public/allAboutPoligons.json";

showAllProps(inputPath, outputPath);
