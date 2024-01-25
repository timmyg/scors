"use client";

import { GameStatus } from "@/types";
import { ScoreboardAll } from "./ScoreboardAll";
import Search from "./Search";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

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
  const [search, setSearch] = useState<string>();
  const [games, setGames] = useState(initialGames);
  const handleSearchResults = (gamesSearch: any) => {
    setGames(gamesSearch);
  };
  // console.log({ search });

  const configuredFetcher = useCallback(
    async (url: string) => {
      // console.log("new fetcher", { search });
      return fetcher({ sport: initialSport, search });
    },
    [search, initialSport]
  );

  // const { data: refreshedGames, error } = useSWR(
  //   `/api/scores/${initialSport}`,
  //   configuredFetcher,
  //   { refreshInterval: 3 * 1000 }
  // );
  const { data: refreshedGames, error } = useSWR(
    [`/api/scores/${initialSport}`, search],
    configuredFetcher,
    { refreshInterval: 30 * 1000 }
  );
  //   console.log("handle");
  useEffect(() => {
    if (refreshedGames) {
      setGames(refreshedGames);
    }
  }, [refreshedGames]);

  return (
    <>
      <Search
        initialSport={initialSport}
        onSearch={(searchString) => setSearch(searchString)}
      />
      <ScoreboardAll
        games={games as any}
        // onFavoriteToggle={onFavoriteToggle}
      />
    </>
  );
};
