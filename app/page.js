import Image from "next/image";
import InteractiveMap from "./components/InteractiveMap";
export default function Home() {
  return (
    <div className="mx-5">
      <InteractiveMap height={500} width={1000} />
    </div>
  );
}
