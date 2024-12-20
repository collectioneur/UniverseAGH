import { useState, useEffect, useRef } from "react";
import { mapBounds, scale } from "../utils/constants";
import calculatePath from "../calculations/calculatePath.js";
import calculateBounds from "../calculations/calculations";
import calculateNearestLocation from "../calculations/calculateNearestLocation";
import { useMap } from "../context/MapContext";

function useGeoData() {
  const {
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
    setPathFinderIsOn,
    pathFinderIsOn,
  } = useMap();

  const findSearchResults = (searchString) => {
    const filteredFeatures = features.filter((feature) =>
      feature.properties.name && feature.properties.name.toLowerCase().includes(searchString.toLowerCase())
    );
    return filteredFeatures.map((feature) => {
      if(feature.geometry.type === "Point") {
        return {
          name: feature.properties.name,
          coordinates: feature.geometry.coordinates,
        };
      }
      else if(feature.geometry.type === "LineString") {
        return {
          name: feature.properties.name,
          coordinates: feature.geometry.coordinates[0],
        };
      }
      else if(feature.geometry.type === "Polygon") {
        return {
          name: feature.properties.name,
          coordinates: feature.properties.centroid,
        };
      }
    });
  }
  const resetPathFinder = () => {
    setPoints([]);
    setDistance(0);
    setPath([]);
  };

  const handlePathFinderToggle = () => {
    if (pathFinderIsOn) {
      resetPathFinder();
    }
    setPathFinderIsOn(!pathFinderIsOn);
  };

  const convertToSVGCoordinates = ([x, y]) => {
    return `${(x - mapBounds.xMin) * scale},${(mapBounds.yMax - y) * scale}`;
  };

  const findShortestPath = (e) => {
    e.preventDefault();
    const [d, p] = calculatePath(points, graph);
    setDistance(d.toFixed(0));
    setPath(p);
  };

  const addNewPoint = (coordinates) => {
    if (points.length < 5) {
      const location = calculateNearestLocation(features, coordinates);
      setPoints([...points, { coordinates, location }]);
    } else alert("You can only choose up to 5 points");
  };

  const chooseNewPoint = (e) => {
    const { clientX, clientY } = e;
    const elementWidth = e.currentTarget.getBoundingClientRect().width;
    const elementHeight = e.currentTarget.getBoundingClientRect().height;
    const left = e.currentTarget.getBoundingClientRect().left;
    const top = e.currentTarget.getBoundingClientRect().top;
    const coordX =
      ((clientX - left) / elementWidth) * (mapBounds.xMax - mapBounds.xMin) +
      mapBounds.xMin;
    const coordY =
      mapBounds.yMax -
      ((clientY - top) / elementHeight) * (mapBounds.yMax - mapBounds.yMin);
    setPath([]);
    if (pathFinderIsOn) addNewPoint([coordX, coordY]);
    setDistance(0);
  };

  const deletePoint = (index) => {
    setPoints(points.filter((_, i) => i !== index));
    setPath([]);
    setDistance(0);
  };

  const swapPoints = (index1, index2) => {
    const newPoints = [...points];
    const temp = newPoints[index1];
    newPoints[index1] = newPoints[index2];
    newPoints[index2] = temp;
    setPoints(newPoints);
    setPath([]);
    setDistance(0);
  };

  return {
    findShortestPath,
    chooseNewPoint,
    convertToSVGCoordinates,
    deletePoint,
    swapPoints,
    handlePathFinderToggle,
    findSearchResults,
    addNewPoint,
  };
}

export default useGeoData;
