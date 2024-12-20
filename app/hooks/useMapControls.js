import { useState } from "react";
import { useEffect, useRef } from "react";
import useGeoData from "./useGeoData";
import { useMap } from "../context/MapContext";

const useMapControls = () => {
  const {
    center,
    setCenter,
    zoom,
    setZoom,
    containerRef,
    isDragging,
    setIsDragging,
    startPoint,
    setStartPoint,
    svgRef,
  } = useMap();
  const { chooseNewPoint } = useGeoData();

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
    }
  }, []);

  const moveMap = (deltaX, deltaY) => {
    setCenter([center[0] + deltaX, center[1] + deltaY]);
  };

  const zoomMap = (zoomFactor) => {
    setZoom((prevZoom) => Math.max(1, Math.min(prevZoom * zoomFactor, 10)));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const { clientX, clientY, deltaY } = e;
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    const zoomFactor = Math.exp(-deltaY * 0.005);
    const newZoom = zoom * zoomFactor;
    if (newZoom > 10 || newZoom < 1) return;
    moveMap(mouseX * (1 - zoomFactor), mouseY * (1 - zoomFactor));
    zoomMap(zoomFactor);
  };

  const handleMouseDown = (e) => {
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!startPoint) return;
    const deltaX = e.clientX - startPoint.x;
    const deltaY = e.clientY - startPoint.y;
    const draggingDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    if (!isDragging && draggingDistance > 0) {
      setIsDragging(true);
    }
    if (startPoint && isDragging) {
      setStartPoint({ x: e.clientX, y: e.clientY });
      moveMap(deltaX, deltaY);
    }
  };

  const handleMouseUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
    } else {
      const ee = e;
      chooseNewPoint(ee);
    }
    setStartPoint(null);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  };
};

export default useMapControls;
