import calculateDistance from "./calculateDistance.js";

export default function calculateNearestLocation(features, coordinates) {
  let location = "";
  let minDistance = Infinity;
  features.forEach((feature) => {
    const { properties, geometry } = feature;
    if (geometry.type === "LineString") return;
    const objectCoordinates =
      geometry.type === "Point" ? geometry.coordinates : properties.centroid;
    const distance = calculateDistance(
      coordinates[0],
      coordinates[1],
      objectCoordinates[0],
      objectCoordinates[1]
    );
    if (distance < minDistance && (properties.name || properties.ref)) {
      minDistance = distance;
      location = properties.name || properties.ref;
    }
  });
  return location;
}
