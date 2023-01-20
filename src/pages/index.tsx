import { Inter } from "@next/font/google";
import wretch from "wretch";
import { GetServerSidePropsContext } from "next";
import { GameStatus, TeamStatus } from "@/types";
import { ThemeProvider } from "next-themes";
import { NetworkStatus } from "@/components/networkStatus";
import { Scoreboard } from "@/components/scoreboard";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  games: GameStatus[];
}

function Home({ games }: Props) {
  return (
    <ThemeProvider attribute="class">
      <main className={inter.className}>
        <NetworkStatus />
        <Scoreboard games={games} />
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
    return { props: { games: response.data.games } };
  } catch (e) {
    console.error({ e });
  }
}

export default Home;
