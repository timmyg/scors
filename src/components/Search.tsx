// src/components/Search.tsx
import { GameStatus } from "@/types";
import { useState, useEffect, useCallback } from "react";

interface SearchProps {
  initialSport: string;
  onSearch: (games: GameStatus[]) => void;
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
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      fetch(`/api/scores/${initialSport}?search=${term}`)
        .then((response) => response.json())
        .then((data) => {
          onSearch(data?.data?.games || []);
        });
    }, 1000),
    [initialSport, onSearch]
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  return (
    <input
      style={{
        width: "100%", // full width
        padding: "10px", // bigger
        borderRadius: "6px", // rounded corners
        fontSize: "16px", // bigger text
        margin: "1rem",
        // boxSizing: "border-box", // include padding and border in element's total width and height
        border: "2px solid lightgray", // border
      }}
      type="text"
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
      placeholder="Search..."
    />
  );
};

export default Search;
