"use client";
import { useState, useEffect, useRef } from "react";
import { mapBounds, scale } from "../utils/constants";
import useGeoData from "../hooks/useGeoData.js";
import MapPath from "./MapPath";
import MapLayers from "./MapLayers";
import MapControls from "./MapControls";

const InteractiveMap = () => {
  const {
    features,
    coord1,
    coord2,
    distance,
    path,
    graph,
    findShortestPath,
    choosePoint,
    convertToSVGCoordinates,
  } = useGeoData();
  const svgRef = useRef(null);

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
          onClick={choosePoint}
        >
          <MapLayers
            features={features}
            convertToSVGCoordinates={convertToSVGCoordinates}
          />
          <MapPath coord1={coord1} coord2={coord2} path={path} />
        </svg>
      </div>
      <MapControls
        findShortestPath={findShortestPath}
        coord1={coord1}
        coord2={coord2}
        distance={distance}
      />
    </>
  );
};

export default InteractiveMap;
