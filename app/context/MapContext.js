"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState([]);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState([]);
  const [graph, setGraph] = useState([]);
  const svgRef = useRef({});
  const [center, setCenter] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef({});
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [pathFinderIsOn, setPathFinderIsOn] = useState(false);

  useEffect(() => {
    const loadGeoJSON = async () => {
      setLoading(true);
      try {
        const [pointsResponse, polygonsResponse, linesResponse, graphResponse] =
          await Promise.all([
            fetch("/agh-map-points.json"),
            fetch("/agh-map-poligons.json"),
            fetch("/agh-map-lines.json"),
            fetch("/graph.json"),
          ]);
        const pointsGeoJSON = await pointsResponse.json();
        const polygonsGeoJSON = await polygonsResponse.json();
        const linesGeoJSON = await linesResponse.json();
        const graphJSON = await graphResponse.json();

        const allFeatures = [
          ...pointsGeoJSON.features,
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

  return (
    <MapContext.Provider
      value={{
        features,
        setFeatures,
        loading,
        setLoading,
        error,
        setError,
        points,
        setPoints,
        distance,
        setDistance,
        path,
        setPath,
        graph,
        setGraph,
        svgRef,
        center,
        setCenter,
        zoom,
        setZoom,
        containerRef,
        isDragging,
        setIsDragging,
        startPoint,
        setStartPoint,
        pathFinderIsOn,
        setPathFinderIsOn,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  return useContext(MapContext);
};
