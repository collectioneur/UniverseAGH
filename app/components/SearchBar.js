"use client";
import Image from "next/image";
import { useMap } from "../context/MapContext";
import { useState } from "react";
import useGeoData from "../hooks/useGeoData";
export default function SearchBar() {
  const { searchCategories } = useMap();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { findSearchResults, addNewPoint } = useGeoData();
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value != "") setSearchResults(findSearchResults(value));
    else setSearchResults([]);
    
  }
  return (
    <div className="mx-auto w-[200px] md:w-[375px] lg:w-[500px] flex-none relative">
      <div className="flex items-center justify-center gap-2 relative z-[1] ">
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={handleSearch}
          className="px-2 py-1 w-full rounded-full text-xl font-semibold border border-foreground bg-transparent placeholder:font-semibold outline-none placeholder-foreground/[.5]"
        />
      </div>
      <div className={`absolute top-0 left-0 right-0 rounded-[18px] pt-[36px] bg-background border ${searchResults.length ? `p-2` : ``}`}>
        {searchResults.map((result, i) => i < 5 ? (
          <button key={i} className="border rounded-[18px] mr-2 mt-2" onClick={() => {
            addNewPoint(result.coordinates);
            setSearch("");
            setSearchResults([]);
          }}>
          <div className="flex items-center justify-between p-2">
              <h3 className="font-semibold">{result.name}</h3>
            </div>
            </button>
        ) : null)}
      </div>
    </div>
  );
}
