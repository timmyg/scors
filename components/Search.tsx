"use client";
// src/components/Search.tsx
import { GameStatus } from "@/types";
import { useState, useEffect, useCallback } from "react";

interface SearchProps {
  initialSport: string;
  onSearch?: (games: GameStatus[]) => void;
}

const Search = ({ initialSport, onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Custom debounce function
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Debounced API call
  // const debouncedSearch = useCallback(
  //   debounce((term: string) => {
  //     fetch(`/api/scores/${initialSport}?search=${term}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         onSearch(data?.data?.games || []);
  //       });
  //   }, 1000),
  //   [initialSport, onSearch]
  // );

  // useEffect(() => {
  //   if (searchTerm) {
  //     debouncedSearch(searchTerm);
  //   }
  // }, [searchTerm, debouncedSearch]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/scores/${initialSport}?search=${searchTerm}`
      );
      const data = await response.json();
      onSearch?.(data?.data?.games || []);
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm, initialSport]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
      {/* <div style={{ display: "relative" }}> */}
      <input
        className="search"
        style={{
          // padding: "10px", // bigger
          // paddingLeft: "20px",
          borderRadius: "8px", // rounded corners
          fontSize: "16px", // bigger text
          background: "transparent",
          // width: "inherit",
          // boxSizing: "border-box",
          flexGrow: 1,
          padding: "10px 20px",
        }}
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search..."
      />
      {/* {searchTerm && (
            <button
              onClick={clearSearch}
              style={{ position: "absolute", right: "10px" }}
            >
              x
            </button>
          )} */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Search;
