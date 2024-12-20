import { useState } from "react";
import { useMap } from "../context/MapContext";
import useGeoData from "../hooks/useGeoData";
export default function ToggleSwitch() {
  const { pathFinderIsOn } = useMap();
  const { handlePathFinderToggle } = useGeoData();

  return (
    <div className="flex items-center">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" id="toggle" className="sr-only" />
          <div
            className="block bg-transparent border w-14 h-8 rounded-full"
            onClick={handlePathFinderToggle}
          ></div>
          <div
            onClick={handlePathFinderToggle}
            className={`dot absolute ${
              pathFinderIsOn ? "translate-x-7" : "translate-x-1"
            } bg-foreground top-1 w-6 h-6 rounded-full transition-transform
duration-300 ease-in-out
`}
          ></div>
        </div>
        <div className="ml-3 font-bold">
          <p className="opacity-50 px-2">{pathFinderIsOn ? "Off" : "On"}</p>
          <p className="scale-[1.2] text-background rounded-[10px] bg-foreground px-2">
            {pathFinderIsOn ? "On" : "Off"}
          </p>
        </div>
      </label>
    </div>
  );
}
