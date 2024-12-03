"use client";
import { useState, useEffect, useRef } from "react";
import calculateBounds from "./calculations";
import calculatePath from "../calculations/calculatePath.js";
import { mapBounds, scale } from "../utils/constants";

const InteractiveMap = () => {
  const [features, setFeatures] = useState([]);
  const svgRef = useRef(null);
  const [graph, setGraph] = useState({});
  const [coord1, setCoord1] = useState([19.9166232, 50.0660631]);
  const [coord2, setCoord2] = useState([19.9027846, 50.0691655]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState([]);

  const convertToSVGCoordinates = ([x, y]) => {
    return `${(x - mapBounds.xMin) * scale},${(mapBounds.yMax - y) * scale}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [d, p] = calculatePath(coord1, coord2, graph);
    setDistance(p);
    setPath(p);
  };

  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        const [polygonsResponse, linesResponse, graphResponse] =
          await Promise.all([
            fetch("/agh_map_poligons.json"),
            fetch("/agh_map_lines.json"),
            fetch("/graph.json"),
          ]);
        const polygonsGeoJSON = await polygonsResponse.json();
        const linesGeoJSON = await linesResponse.json();
        const graphJSON = await graphResponse.json();
        setGraph(graphJSON);
        const allFeatures = [
          ...polygonsGeoJSON.features,
          ...linesGeoJSON.features,
        ];
        setFeatures(allFeatures);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    loadGeoJSON();
  }, []);

  const handleClick = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const elementWidth = e.currentTarget.getBoundingClientRect().width;
    const elementHeight = e.currentTarget.getBoundingClientRect().height;
    const coordX =
      (offsetX / elementWidth) * (mapBounds.xMax - mapBounds.xMin) +
      mapBounds.xMin;
    const coordY =
      mapBounds.yMax -
      (offsetY / elementHeight) * (mapBounds.yMax - mapBounds.yMin);
    setPath([]);
    setCoord1([coordX, coordY]);
  };

  return (
    <>
      <div className="relative  overflow-hidden bg-background border rounded-[15px] h-[500px] flex items-center">
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-auto absolute mx-10"
          viewBox={`0 0 ${(mapBounds.xMax - mapBounds.xMin) * scale} ${
            (mapBounds.yMax - mapBounds.yMin) * scale
          }`}
          onClick={handleClick}
        >
          {features.map((feature, index) => {
            const { geometry } = feature;
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
              .map(([x, y]) => convertToSVGCoordinates([x, y]))
              .join(" ")}
            stroke="black"
            fill="none"
            strokeWidth="2"
          />
          <circle
            cx={`${(coord2[0] - mapBounds.xMin) * scale}`}
            cy={`${(mapBounds.yMax - coord2[1]) * scale}`}
            r="2"
            fill="black"
          />
          <circle
            cx={`${(coord1[0] - mapBounds.xMin) * scale}`}
            cy={`${(mapBounds.yMax - coord1[1]) * scale}`}
            r="2"
            fill="black"
          />
        </svg>
      </div>
      <button onClick={handleSubmit}>Calculate</button>

      <div>
        <h3>Coordinates:</h3>
        <p>
          Coord 1: X = {coord1[0]}, Y = {coord1[1]}
        </p>
        <p>
          Coord 2: X = {coord2[0]}, Y = {coord2[1]}
        </p>
      </div>
      <div>
        <h3>Distance: {distance}</h3>
      </div>
    </>
  );
};

export default InteractiveMap;
