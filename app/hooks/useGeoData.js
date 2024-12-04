import { useState, useEffect } from "react";
import { mapBounds, scale } from "../utils/constants";
import calculatePath from "../calculations/calculatePath.js";

function useGeoData() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coord1, setCoord1] = useState([19.9166232, 50.0660631]);
  const [coord2, setCoord2] = useState([19.9027846, 50.0691655]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState([]);
  const [graph, setGraph] = useState([]);

  const convertToSVGCoordinates = ([x, y]) => {
    return `${(x - mapBounds.xMin) * scale},${(mapBounds.yMax - y) * scale}`;
  };

  const findShortestPath = (e) => {
    e.preventDefault();
    const [d, p] = calculatePath(coord1, coord2, graph);
    setDistance(d.toFixed(0));
    setPath(p);
  };

  const choosePoint = (e) => {
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

  useEffect(() => {
    const loadGeoJSON = async () => {
      setLoading(true);
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

        const allFeatures = [
          ...polygonsGeoJSON.features,
          ...linesGeoJSON.features,
        ];
        setFeatures(allFeatures);
        setGraph(graphJSON);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadGeoJSON();
  }, []);

  return {
    features,
    loading,
    error,
    coord1,
    coord2,
    distance,
    path,
    graph,
    findShortestPath,
    choosePoint,
    convertToSVGCoordinates,
  };
}

export default useGeoData;
