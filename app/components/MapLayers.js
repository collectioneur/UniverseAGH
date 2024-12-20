import { mapBounds, scale } from "../utils/constants";
import useGeoData from "../hooks/useGeoData";
import { useState } from "react";
import { useMap } from "../context/MapContext";

export default function MapLayers() {
  const { features, zoom, containerRef, svgRef } = useMap();
  const { convertToSVGCoordinates } = useGeoData();
  const bounds = [
    (mapBounds.xMax - mapBounds.xMin) * scale,
    (mapBounds.yMax - mapBounds.yMin) * scale,
  ];
  const poligonsColor = {
    parking: "#7A706E",
  };
  const landuseColor = {
    grass: "#4B7A61",
    agh: "#42195055",
  };
  const building = {
    university: "#FAC7BD",
    sports_centre: "#FAC7BD",
    dormitory: "#CFFFF5",
    library: "#FAC7BD",
  };
  const isVisible = ([x, y]) => {
    let svgCoords = convertToSVGCoordinates([x, y]).split(",");
    let rect = svgRef.current.getBoundingClientRect();
    let containerRect = containerRef.current.getBoundingClientRect();
    let coordinateX = (svgCoords[0] / bounds[0]) * rect.width + rect.left;
    let coordinateY = (svgCoords[1] / bounds[1]) * rect.height + rect.top;
    let offset = 20 * zoom;
    if (
      coordinateX + offset < containerRect.left ||
      coordinateX - offset > containerRect.left + containerRect.width ||
      coordinateY + offset < containerRect.top ||
      coordinateY - offset > containerRect.top + containerRect.height
    ) {
      return false;
    }
    return true;
  };
  return (
    <svg>
      <defs>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="white" />
        </filter>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>
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
        } else if (
          geometry.type === "Polygon" &&
          2 ** (properties.zoom - 1) <= zoom &&
          (isVisible(properties.centroid) || properties.landuse === "agh")
        ) {
          return geometry.coordinates.map((ring, i) => {
            const points = ring
              .map(([x, y]) => convertToSVGCoordinates([x, y]))
              .join(" ");
            let color =
              building[properties.building] ||
              landuseColor[properties.landuse] ||
              poligonsColor[properties.amenity] ||
              "#655C7A";
            let filter = building[properties.building]
              ? "url(#glow)"
              : properties.landuse === "agh"
              ? "url(#blur)"
              : "";
            return (
              <polygon
                key={`${index}-${i}`}
                points={points}
                fill={color}
                filter={filter}
              />
            );
          });
        }
        return null;
      })}
      {features.map((feature, index) => {
        const { geometry, properties } = feature;
        if (geometry.type === "Polygon" && 2 ** (properties.zoom - 1) <= zoom) {
          let name = properties.ref || properties.name || "";
          let textCoords = convertToSVGCoordinates(properties.centroid).split(
            ","
          );
          return (
            <text
              key={index}
              x={textCoords[0]}
              y={textCoords[1]}
              fill="rgba(var(--foreground), 1)"
              textAnchor="middle"
              fontWeight="800"
              fontSize="1"
              stroke="black"
              strokeWidth="0.05"
            >
              {name}
            </text>
          );
        }
        return null;
      })}
    </svg>
  );
}
