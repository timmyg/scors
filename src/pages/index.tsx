import { Inter } from "@next/font/google";
import wretch from "wretch";
import { GetServerSidePropsContext } from "next";
import { GameStatus, TeamStatus } from "@/types";
import { ThemeProvider } from "next-themes";
import { NetworkStatus } from "@/components/networkStatus";
import { Scoreboard } from "@/components/scoreboard";
import useSWR from "swr";
import { useEffect, useState } from "react";

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

function Home({ response }: Props) {
  // const { data, error } = useSWR(`/api/scores`, fetch, { initialGames });
  // const [tick, setTick] = useState(0);

  const { data: newResponse, timestamp }: any = useSWR("/api/scores", fetcher, {
    initialData: response,
    refreshInterval: 5000,
  });
  console.log({ newResponse, timestamp });

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTick(tick + 1);
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, [tick]);
  if (!newResponse) {
    return "Loading...";
  }

  return (
    <ThemeProvider attribute="class">
      <main className={inter.className}>
        <NetworkStatus />
        <p>{newResponse?.timestamp}</p>
        <Scoreboard games={newResponse?.data?.games as any} />
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
    const response: any = await wretch(`${baseUrl}/api/scores`).get().json();
    // return { props: { initialGames: response.data.games, initialTimestamp } };
    return { props: { response } };
  } catch (e) {
    console.error({ e });
  }
}

export default Home;
