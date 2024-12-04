export default function MapControls({
  findShortestPath,
  coord1,
  coord2,
  distance,
}) {
  return (
    <div className="flex flex-row justify-between items-center p-2">
      <button onClick={findShortestPath}>Calculate</button>

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
        <h3>Distance: {distance} m</h3>
      </div>
    </div>
  );
}
