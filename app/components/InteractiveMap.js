"use client";
import { useState, useEffect, useRef } from "react";
import calculateBounds from "./calculations";
import calculatePath from "../calculations/calculatePath.js";

const InteractiveMap = ({ height, width }) => {
  const [features, setFeatures] = useState([]);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [bounds, setBounds] = useState({ xMin: 0, xMax: 0, yMin: 0, yMax: 0 });
  const svgRef = useRef(null);
  const [graph, setGraph] = useState({});
  const [coord1, setCoord1] = useState([19.9166232, 50.0660631]);
  const [coord2, setCoord2] = useState([19.9027846, 50.0691655]);
  const [ans, setAns] = useState(0);
  const [path, setPath] = useState([]);

  const handleCoordChange = (e, setCoord) => {
    const { name, value } = e.target;
    setCoord((prev) => {
      const newCoord = [...prev];
      newCoord[name === "x" ? 0 : 1] = Number(value);
      console.log(newCoord);
      return newCoord;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Coord1:", coord1);
    console.log("Coord2:", coord2);
    const [a, p] = calculatePath(coord1, coord2, graph);
    setAns(a);
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
        setBounds(calculateBounds(allFeatures));
        setFeatures(allFeatures);
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    };

    loadGeoJSON();
  }, []);

  const handleMouseDown = (e) => {
    setDragging(true);
    svgRef.current.startX = e.clientX - position.x;
    svgRef.current.startY = e.clientY - position.y;
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - svgRef.current.startX,
      y: e.clientY - svgRef.current.startY,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -scale * 0.2 : scale * 0.2;
    setScale((prev) => Math.max(1, prev + delta));
  };

  return (
    <>
      <div
        className="relative  overflow-hidden h-[500px] bg-background border rounded-[15px] flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          className="w-auto h-auto absolute mx-10"
          onMouseDown={handleMouseDown}
          viewBox={`0 0 ${(bounds.xMax - bounds.xMin) * 15000} ${
            (bounds.yMax - bounds.yMin) * 15000
          }`}
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
                      `${(x - bounds.xMin) * 15000},${
                        (bounds.yMax - y) * 15000
                      }`
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
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            name="x"
            value={coord1[0]}
            onChange={(e) => handleCoordChange(e, setCoord1)}
            placeholder="X1"
            className="mr-10"
          />
          <input
            type="number"
            name="y"
            value={coord1[1]}
            onChange={(e) => handleCoordChange(e, setCoord1)}
            placeholder="Y1"
            className="mr-10"
          />
        </div>

        <div>
          <input
            type="number"
            name="x"
            value={coord2[0]}
            onChange={(e) => handleCoordChange(e, setCoord2)}
            placeholder="X2"
            className="mr-10"
          />
          <input
            type="number"
            name="y"
            value={coord2[1]}
            onChange={(e) => handleCoordChange(e, setCoord2)}
            placeholder="Y2"
            className="mr-10"
          />
        </div>

        <button type="submit">Calculate</button>

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
          <h3>Distance: {ans}</h3>
        </div>
      </form>
    </>
  );
};

export default InteractiveMap;
