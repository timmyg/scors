import { Inter } from "@next/font/google";
import wretch from "wretch";
import { GetServerSidePropsContext } from "next";
import { GameStatus } from "@/types";
import { ThemeProvider } from "next-themes";
import { NetworkStatus } from "@/components/NetworkStatus";
import { ScoreboardAll } from "@/components/ScoreboardAll";
import useSWR from "swr";
import { SportsPicker } from "@/components/SportsPicker";
import { LastUpdated } from "@/components/LastUpdated";

const inter = Inter({ subsets: ["latin"] });

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
}

const sport = "ncaab";

function Home({ response }: Props) {
  const { data: newResponse, timestamp }: any = useSWR(
    `/api/scores/${sport}`,
    fetcher,
    {
      initialData: response,
      refreshInterval: 5000,
    }
  );
  if (!newResponse) {
    return "Loading...";
  }

  return (
    <ThemeProvider attribute="class">
      <main className={inter.className}>
        <SportsPicker />
        <NetworkStatus />
        <LastUpdated timestamp={newResponse?.timestamp} />
        <ScoreboardAll games={newResponse?.data?.games as any} />
      </main>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const protocol = process.env.VERCEL_URL ? "https" : "http";
    const baseUrl = context.req
      ? `${protocol}://${context.req.headers.host}`
      : "";
    const response: any = await wretch(`${baseUrl}/api/scores/${sport}`)
      .get()
      .json();
    return { props: { response } };
  } catch (e) {
    console.error({ e });
    // throw new Error("Error fetching data");
    return { props: { response: {} } };
  }
}

export default Home;
