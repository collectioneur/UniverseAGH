export default function calculateBounds(features) {
  let xMin = Infinity,
    xMax = -Infinity,
    yMin = Infinity,
    yMax = -Infinity;
  features.forEach((feature) => {
    const { geometry } = feature;
    if (!geometry || !geometry.coordinates) return;

    const coordinates = geometry.coordinates;

    if (geometry.type === "Point") {
      updateBounds(coordinates);
    } else if (geometry.type === "LineString") {
      coordinates.forEach(updateBounds);
    } else if (geometry.type === "Polygon") {
      coordinates.flat(1).forEach(updateBounds);
    } else if (
      geometry.type === "MultiPolygon" ||
      geometry.type === "MultiLineString"
    ) {
      coordinates.flat(2).forEach(updateBounds);
    }
  });

  function updateBounds([x, y]) {
    if (isFinite(x) && isFinite(y)) {
      xMin = Math.min(xMin, x);
      xMax = Math.max(xMax, x);
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    }
  }
  console.log({ xMin, xMax, yMin, yMax });
  return { xMin, xMax, yMin, yMax };
}
