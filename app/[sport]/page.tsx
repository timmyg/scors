import { GameStatus } from "@/types";
import { ScoreboardAll } from "@/components/ScoreboardAll";
import { NetworkStatus } from "@/components/StatusNetwork";
import { SportsPicker } from "@/components/SportsPicker";
import Search from "@/components/Search";
import { Header } from "@/components/Header";
import { ScoreboardPage } from "@/components/ScoreboardPage";
import { fetcher } from "@/lib/fetcher";

interface Response {
  data: ResponseGames;
  timestamp: string;
}

interface ResponseGames {
  games: GameStatus[];
}

async function Home({ params }: { params: { response: any; sport: string } }) {
  const initialSport = params.sport as string; // Getting sport from the URL query parameter

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

  const games = await fetcher({ sport: initialSport });

  const handleSearchResults = () => {};

  // const handleSearchResults = useCallback((searchedGames: GameStatus[]) => {
  //   setGames(searchedGames);
  // }, []);

  return (
    <main>
      <Header />
      <SportsPicker />
      <ScoreboardPage initialGames={games} initialSport={initialSport} />
      <NetworkStatus />
    </main>
  );
}

export default Home;
