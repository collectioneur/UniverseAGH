import { mapBounds, scale } from "../utils/constants";

export default function MapLayers({ features, convertToSVGCoordinates }) {
  const poligonsColor = {
    parking: "#5E6B65",
    library: "#768FEC",
    fast_food: "#FFD334",
  };
  const landuseColor = {
    residential: "#572703",
    grass: "#057C44",
    construction: "#494343",
    flowerbed: "#057C44",
  };
  const building = {
    university: "#BD1334",
    // "roof",
    sports_centre: "#E484E5",
    dormitory: "#ABC2ED",
    library: "#768FEC",
    // "construction",
    // "yes",
    // "college",
    // "warehouse",
    // "hotel",
    // "apartments",
    // "hut",
    // "shed",
    // "retail",
    // "service",
    // "trash_shed",
    // "house",
    // "bridge",
    // "garage",
    // "outbuilding",
    guardhouse: "#F7B7A3",
  };
  return (
    <svg>
      {features.map((feature, index) => {
        const { geometry, properties } = feature;
        if (geometry.type === "LineString") {
          const points = geometry.coordinates
            .map(([x, y]) => convertToSVGCoordinates([x, y]))
            .join(" ");
          return (
            <polyline
              key={index}
              points={points}
              stroke="#f2f2f288"
              fill="none"
              strokeWidth="0.25"
            />
          );
        } else if (geometry.type === "Polygon") {
          return geometry.coordinates.map((ring, i) => {
            const points = ring
              .map(([x, y]) => convertToSVGCoordinates([x, y]))
              .join(" ");
            let color =
              building[properties.building] ||
              landuseColor[properties.landuse] ||
              poligonsColor[properties.amenity];
            return (
              <polygon
                key={`${index}-${i}`}
                points={points}
                fill={color ? color : "var(--lightred)"}
                stroke="var(--foreground)"
                strokeWidth="0"
              />
            );
          });
        }
        return null;
      })}
    </svg>
  );
}
