import Image from "next/image";
import InteractiveMap from "./components/InteractiveMap";
import Header from "./components/Header";
import { MapProvider } from "./context/MapContext";
import Background from "./components/Background";
export default function Home() {
  return (
    <MapProvider>
      <div className="overflow-hidden fixed top-0 left-0 right-0">
        <Header />
        <InteractiveMap height={500} width={1000} />
        <Background />
      </div>
    </MapProvider>
  );
}
