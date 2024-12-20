"use client";
import { useState, useEffect, useRef } from "react";
import { mapBounds, scale } from "../utils/constants";
import useGeoData from "../hooks/useGeoData.js";
import MapPath from "./MapPath";
import MapLayers from "./MapLayers";
import MapControls from "./MapControls";
import useMapControls from "../hooks/useMapControls";
import { useMap } from "../context/MapContext";

const InteractiveMap = () => {
  const { svgRef, center, zoom, containerRef, isDragging} = useMap();
  const { handleMouseDown, handleMouseMove, handleMouseUp, handleWheel } =
    useMapControls();

  return (
    <>
      <div
        className="relative overflow-hidden h-screen flex items-center"
        ref={containerRef}
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          viewBox={`0 0 ${(mapBounds.xMax - mapBounds.xMin) * scale} ${
            (mapBounds.yMax - mapBounds.yMin) * scale
          }`}
          style={{
            transform: `translate(${center[0]}px, ${center[1]}px) scale(${zoom})`,
            transformOrigin: `0 0`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <MapLayers />
          <MapPath />
        </svg>
      </div>
      <MapControls />
    </>
  );
};

export default InteractiveMap;
