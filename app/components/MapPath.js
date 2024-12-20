import { mapBounds, scale } from "../utils/constants";
import { useState } from "react";
import { useMap } from "../context/MapContext";

export default function MapPath() {
  const { points, path, zoom } = useMap();
  const [strokeWidth, setStrokeWidth] = useState(2 / zoom);
  const scaleElement = (scaledValue, basicValue, zoom) => {
    return `${Math.min(scaledValue / zoom, basicValue)}`;
  };
  return (
    <svg>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C73E3E" />
          <stop offset="100%" stopColor="#F58584" />
        </linearGradient>
      </defs>
      <polyline
        points={path
          .map(
            ([x, y]) =>
              `${(x - mapBounds.xMin) * 15000},${(mapBounds.yMax - y) * 15000}`
          )
          .join(" ")}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth={`${scaleElement(6, 2, zoom)}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((point, index) => (
        <svg key={index}>
          <image
            key={index}
            href="/pointer.svg"
            x={`${
              (point.coordinates[0] - mapBounds.xMin) * 15000 -
              scaleElement(20, 10, zoom) / 2
            }`}
            y={`${
              (mapBounds.yMax - point.coordinates[1]) * 15000 -
              scaleElement(20, 10, zoom)
            }`}
            width={`${scaleElement(20, 10, zoom)}`}
            height={`${scaleElement(20, 10, zoom)}`}
          />
          <text
            x={`${(point.coordinates[0] - mapBounds.xMin) * 15000}`}
            y={`${
              (mapBounds.yMax - point.coordinates[1]) * 15000 -
              scaleElement(20, 10, zoom) * 1.05
            }`}
            fill="rgba(var(--foreground), 1)"
            stroke="black"
            strokeWidth={`${scaleElement(0.5, 0.25, zoom)}`}
            textAnchor="middle"
            fontWeight="800"
            fontSize={`${scaleElement(10, 5, zoom)}`}
          >
            {index + 1}
          </text>
        </svg>
      ))}
    </svg>
  );
}
