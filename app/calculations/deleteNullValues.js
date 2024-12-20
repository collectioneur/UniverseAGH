import fs from "fs/promises";

function removeNullValues(obj) {
  if (obj === null) {
    return null;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeNullValues).filter((item) => item !== null);
  } else if (typeof obj === "object" && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = removeNullValues(value);
      if (cleanedValue !== null) {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {});
  }

  return obj;
}

async function processJsonFile(inputFilePath, outputFilePath) {
  try {
    const fileContent = await fs.readFile(inputFilePath, "utf8");
    const jsonData = JSON.parse(fileContent);

    const cleanedData = removeNullValues(jsonData);

    await fs.writeFile(
      outputFilePath,
      JSON.stringify(cleanedData, null, 2),
      "utf8"
    );
    console.log(`Jest git: ${outputFilePath}`);
  } catch (error) {
    console.error("Nie jest git:", error);
  }
}

const inputFile = "app/components/agh-map-points.json";
const outputFile = "app/components/agh-map-points.json";

processJsonFile(inputFile, outputFile);
