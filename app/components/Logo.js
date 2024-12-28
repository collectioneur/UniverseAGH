import Image from "next/image";
export default function Logo() {
  return (
    <div className="basis-1/4">
      <Image src="./big-logo.svg" alt="Logo" width={150} height={1} />
      <h2 className="font-bold mt-1 text-xs md:text-base">Events, Cafes, Dormitories On One Map</h2>
    </div>
  );
}
