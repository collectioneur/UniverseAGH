import ToggleSwitch from "./ToggleSwitch";
import { useMap } from "../context/MapContext";
import useGeoData from "../hooks/useGeoData";
export default function MapControls() {
  const { points, distance, pathFinderIsOn } = useMap();
  const { findShortestPath, deletePoint, swapPoints } = useGeoData();
  return (
    <div
      className={`flex flex-col justify-between items-start p-4 fixed bottom-0 gap-5 left-0 z-10 bg-background/[.8] backdrop-blur rounded-tr-[15px] transition-opacity`}
    >
      <div
        id="togglePathFinder"
        className="flex justify-between items-center w-full pointer-events-auto"
      >
        <h2 className="font-bold text-2xl">Path Finder</h2>
        <ToggleSwitch />
      </div>
      <div
        className={`flex justify-between items-center min-w-[250px] w-full ${
          pathFinderIsOn
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-50"
        }`}
      >
        <button
          onClick={findShortestPath}
          className=" p-2 rounded-full bg-customred/75 font-bold"
        >
          Find path
        </button>
        <div>
          <h3 className="font-semibold">
            <span className="font-bold">Distance:</span> {distance} m
          </h3>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-center">Points:</h3>
        <div className="pl-5">
          <div className="h-full">
            {points.map((point, i) => (
              <div key={i} className="flex flex-col justify-center w-full">
                <div className="flex justify-between items-center font-semibold w-full">
                  <p>
                    {i + 1} point: {point.location}
                  </p>
                  <button
                    className="p-2"
                    onClick={(e) => {
                      deletePoint(i);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <image
                        href="/delete.svg"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                      ></image>
                    </svg>
                  </button>
                </div>
                {i < points.length - 1 && (
                  <button
                    className="p-2 absolute left-0 origin-center translate-y-1/2"
                    onClick={(e) => {
                      swapPoints(i, i + 1);
                    }}
                  >
                    <svg
                      width="30"
                      height="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <image
                        href="/swap.svg"
                        x="0"
                        y="0"
                        width="30"
                        height="30"
                      ></image>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
