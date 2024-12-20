import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default function Header() {
  return (
    <header className="z-[10] grid items-center gap-5 p-4 grid-cols-3 bg-background/[.8] fixed left-0 right-0 backdrop-blur">
      <Logo />
      <SearchBar />
    </header>
  );
}
