import { Inter } from "@next/font/google";
import wretch from "wretch";
import { GetServerSidePropsContext } from "next";
import { GameStatus, TeamStatus } from "@/types";
import { ThemeProvider } from "next-themes";
// import { ThemeProvider } from "@emotion/react";

const inter = Inter({ subsets: ["latin"] });
// export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface Props {
  games: GameStatus[];
}

function Home({ games }: Props) {
  // const classes = useStyles();
  const getRankString = (team: TeamStatus) => {
    if (team.rank) {
      return `(${team.rank}) `;
    }
    return "";
  };
  return (
    <ThemeProvider attribute="class">
      <main className={inter.className}>
        {games.map((game: GameStatus) => (
          <p key={game.id}>
            <span>
              {getRankString(game.awayTeam)} {game.awayTeam.name}{" "}
              <b>{game.awayTeam.score}</b> @ {getRankString(game.homeTeam)}
              {game.homeTeam.name} <b>{game.homeTeam.score}</b>
            </span>
            <span style={{ paddingLeft: "8px" }}>{game.statusDisplay}</span>
          </p>
        ))}
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
