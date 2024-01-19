import wretch from "wretch";
import useSWR from "swr";
// import { Inter } from "@next/font/google";
import { GetServerSidePropsContext } from "next";
import { GameStatus, TeamStatus } from "@/types";
import { ThemeProvider } from "next-themes";
import { ScoreboardAll } from "@/components/ScoreboardAll";
import { NetworkStatus } from "@/components/StatusNetwork";
import { SportsPicker } from "@/components/SportsPicker";
import { LastUpdated } from "@/components/LastUpdated";
import { useFavorites } from "hooks/useFavorites";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Search from "@/components/Search";

// import "./global.css";

// const inter = Inter({ subsets: ["latin"] });

const fetcher = async (url: string) => {
  const response = await wretch(url).get().json();
  return response;
};

interface ResponseGames {
  games: GameStatus[];
}
interface Response {
  data: ResponseGames;
  timestamp: string;
}
interface Props {
  response: Response;
  initialSport: string;
}

function Home({ response, initialSport }: Props) {
  // console.log("home");
  const router = useRouter();
  const { data: newResponse, timestamp }: any = useSWR(
    `/api/scores/${initialSport}`,
    fetcher,
    {
      initialData: response,
      refreshInterval: 15000,
    }
  );
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    console.log({ hash });
  }, [router.asPath]);
  const [toggleFavorite, { favorites }] = useFavorites();
  // const [games, setGames] = useState<GameStatus[]>([]);
  const [games, setGames] = useState<GameStatus[]>(
    newResponse?.data?.games || []
  );
  useEffect(() => {
    if (newResponse?.data?.games) {
      newResponse?.data?.games.map((game: GameStatus) => {
        game.awayTeam.isFavorite = favorites.includes(game.awayTeam.id);
        game.homeTeam.isFavorite = favorites.includes(game.homeTeam.id);
      });
      const sortedGames = newResponse?.data?.games.sort(
        (a: GameStatus, b: GameStatus) => {
          if (
            (a.homeTeam.isFavorite || a.awayTeam.isFavorite) ===
            (b.homeTeam.isFavorite || b.awayTeam.isFavorite)
          ) {
            return 0;
          }
          return a.homeTeam.isFavorite || a.awayTeam.isFavorite ? -1 : 1;
        }
      );
      setGames(sortedGames);
    }
  }, [newResponse?.data?.games, favorites]);
  if (!newResponse) {
    return "";
  }
  const onFavoriteToggle = (id: number) => {
    // console.log("toggle1");
    typeof window !== "undefined" && toggleFavorite(id);
    router.reload();
  };

  const handleSearchResults = (searchedGames: GameStatus[]) => {
    console.log(searchedGames);
    setGames(searchedGames);
  };

  return (
    <ThemeProvider attribute="class">
      <main
      // className={inter.className}
      >
        <SportsPicker />

        <Search initialSport={initialSport} onSearch={handleSearchResults} />
        {/* <LastUpdated timestamp={newResponse?.timestamp} /> */}

        <ScoreboardAll
          games={games as any}
          onFavoriteToggle={onFavoriteToggle}
        />
        <NetworkStatus />
      </main>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    // const { hash } = context.query;
    // console.log("getSSP", context?.resolvedUrl);
    const sportFromUrl = context?.resolvedUrl?.split("/")?.[1];
    // console.log({ sportFromUrl });
    // return;
    if (!sportFromUrl) {
      context.res.writeHead(302, {
        Location: `/ncaab`,
      });
      context.res.end();
      return { props: {} };
    } else {
      const protocol = process.env.VERCEL_URL ? "https" : "http";
      const baseUrl = context.req
        ? `${protocol}://${context.req.headers.host}`
        : "";
      const response: any = await wretch(
        `${baseUrl}/api/scores/${sportFromUrl}`
      )
        .get()
        .json();
      return { props: { response, initialSport: sportFromUrl } };
    }
  } catch (e) {
    console.error({ e });
    // throw new Error("Error fetching data");
    return { props: { response: {} } };
  }
}

export default Home;
