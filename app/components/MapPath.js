import { mapBounds, scale } from "../utils/constants";

export default function MapPath({ coord1, coord2, path }) {
  return (
    <svg>
      <polyline
        points={path
          .map(
            ([x, y]) =>
              `${(x - mapBounds.xMin) * 15000},${(mapBounds.yMax - y) * 15000}`
          )
          .join(" ")}
        stroke="black"
        fill="none"
        strokeWidth="2"
      />
      <circle
        cx={`${(coord2[0] - mapBounds.xMin) * 15000}`}
        cy={`${(mapBounds.yMax - coord2[1]) * 15000}`}
        r="2"
        fill="black"
      />
      <circle
        cx={`${(coord1[0] - mapBounds.xMin) * 15000}`}
        cy={`${(mapBounds.yMax - coord1[1]) * 15000}`}
        r="2"
        fill="black"
      />
    </svg>
  );
}
