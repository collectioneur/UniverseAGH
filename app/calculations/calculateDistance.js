export default function calculateDistance(x1, y1, x2, y2) {
  const distance = Math.sqrt(
    (Math.abs(x1 - x2) * 71298) ** 2 + (Math.abs(y1 - y2) * 111111) ** 2
  );
  return distance;
}
