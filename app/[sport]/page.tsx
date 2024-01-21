// "use client";

import wretch from "wretch";
import useSWR from "swr";
import { GameStatus } from "@/types";
// import { ThemeProvider } from "next-themes";
import { ScoreboardAll } from "@/components/ScoreboardAll";
import { NetworkStatus } from "@/components/StatusNetwork";
import { SportsPicker } from "@/components/SportsPicker";
import { LastUpdated } from "@/components/LastUpdated";
import { useFavorites } from "hooks/useFavorites";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/Search";
import { Header } from "@/components/Header";

const getBaseUrl = () => {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:4141`;
};

const fetcher = async (sport: string) => {
  // console.log({ baseUrl: getBaseUrl() });
  const response = await wretch(`${getBaseUrl()}/api/scores/${sport}`)
    .get()
    .json();
  return (response as any)?.data?.games || [];
};

interface Response {
  data: ResponseGames;
  timestamp: string;
}

interface ResponseGames {
  games: GameStatus[];
}
// interface Props {
//   response: Response;
//   initialSport: string;
// }

async function Home({ params }: { params: { response: any; sport: string } }) {
  // const router = useRouter();
  const initialSport = params.sport as string; // Getting sport from the URL query parameter
  // const [newResponse, setNewResponse] = useState(params.response);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`/api/scores/${initialSport}`).then(
  //         (res) => res.json()
  //       );
  //       console.log({ response });
  //       setNewResponse(response);
  //     } catch (error) {
  //       console.error("Error fetching data", error);
  //     }
  //   };

  //   fetchData();
  //   const intervalId = setInterval(fetchData, 15000);

  //   return () => clearInterval(intervalId);
  // }, [initialSport]);

  // const [games, setGames] = useState<GameStatus[]>(
  //   newResponse?.data?.games || []
  // );
  const games = await fetcher(initialSport);
  // const games = [];

  const handleSearchResults = () => {};

  // const handleSearchResults = useCallback((searchedGames: GameStatus[]) => {
  //   setGames(searchedGames);
  // }, []);

  return (
    // <ThemeProvider attribute="class">
    <main>
      <Header />
      <SportsPicker />
      <Search
        initialSport={initialSport}
        // onSearch={handleSearchResults}
      />
      <ScoreboardAll
        games={games as any}
        // onFavoriteToggle={onFavoriteToggle}
      />
      <NetworkStatus />
    </main>
    // </ThemeProvider>
  );
}

// With App Router, getServerSideProps can be replaced with a loader function
// For example:
async function loader({ params }: { params: { sport: string } }) {
  try {
    const sportFromUrl = params.sport;
    if (!sportFromUrl) {
      throw new Response("Not Found", { status: 404 });
    } else {
      const protocol = process.env.VERCEL_URL ? "https" : "http";
      const baseUrl = `${protocol}://${process.env.VERCEL_URL}`;
      const response = await wretch(`${baseUrl}/api/scores/${sportFromUrl}`)
        .get()
        .json();
      return response;
    }
  } catch (e) {
    console.error({ e });
    throw new Error("Error fetching data");
  }
}

export default Home;
