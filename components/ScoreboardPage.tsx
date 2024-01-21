"use client";

import { GameStatus } from "@/types";
import { ScoreboardAll } from "./ScoreboardAll";
import Search from "./Search";
import { useState } from "react";

interface Props {
  initialGames: GameStatus[];
  initialSport: string;
  // onFavoriteToggle?: (id: number) => void;
}

export const ScoreboardPage = ({
  initialGames,
  initialSport,
}: // onFavoriteToggle
Props) => {
  const [games, setGames] = useState(initialGames);
  const handleSearchResults = (gamesSearch: any) => {
    setGames(gamesSearch);
  };
  //   console.log("handle");
  return (
    <>
      <Search initialSport={initialSport} onSearch={handleSearchResults} />
      <ScoreboardAll
        games={games as any}
        // onFavoriteToggle={onFavoriteToggle}
      />
    </>
  );
};
