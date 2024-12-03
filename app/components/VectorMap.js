import React from "react";

export default function VectorMap() {
  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      className="absolute mx-10"
      viewBox={`0 0 ${(bounds.xMax - bounds.xMin) * 15000} ${
        (bounds.yMax - bounds.yMin) * 15000
      }`}
      onClick={handleClick}
      style={
        {
          // transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          // transformOrigin: "center",
          // cursor: dragging ? "grabbing" : "grab",
        }
      }
    >
      {features.map((feature, index) => {
        const { geometry } = feature;
        if (geometry.type === "LineString") {
          const points = geometry.coordinates
            .map(
              ([x, y]) =>
                `${(x - bounds.xMin) * 15000},${(bounds.yMax - y) * 15000}`
            )
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
              .map(
                ([x, y]) =>
                  `${(x - bounds.xMin) * 15000},${(bounds.yMax - y) * 15000}`
              )
              .join(" ");
            return (
              <polygon
                key={`${index}-${i}`}
                points={points}
                fill="var(--customred)"
                stroke="var(--foreground)"
                strokeWidth="0.25"
              />
            );
          });
        }
        return null;
      })}
      <polyline
        points={path
          .map(
            ([x, y]) =>
              `${(x - bounds.xMin) * 15000},${(bounds.yMax - y) * 15000}`
          )
          .join(" ")}
        stroke="black"
        fill="none"
        strokeWidth="2"
      />
      <circle
        cx={`${(coord2[0] - bounds.xMin) * 15000}`}
        cy={`${(bounds.yMax - coord2[1]) * 15000}`}
        r="2"
        fill="var(--customgreen)"
      />
      <circle
        cx={`${(coord1[0] - bounds.xMin) * 15000}`}
        cy={`${(bounds.yMax - coord1[1]) * 15000}`}
        r="2"
        fill="var(--customgreen)"
      />
    </svg>
  );
}
