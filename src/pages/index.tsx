// import Image from "next/image";
// import { Inter } from "@next/font/google";
import wretch from "wretch";
// import Paper from "@mui/material/Paper";
import { GetServerSidePropsContext } from "next";
import { GameStatus, TeamStatus } from "@/types";

// const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "@emotion/react";
// import theme from "@rebass/preset";
interface Props {
  games: GameStatus[];
}
function Home({ games }: Props) {
  // const classes = useStyles();
  const theme = {};
  const getRankString = (team: TeamStatus) => {
    if (team.rank) {
      return `(${team.rank}) `;
    }
    return "";
  };
  return (
    <ThemeProvider theme={theme}>
      {games.map((game: GameStatus) => (
        <p key={game.id}>
          <span>
            {getRankString(game.awayTeam)} {game.awayTeam.name}{" "}
            <b>{game.awayTeam.score}</b> @ {getRankString(game.homeTeam)}
            {game.homeTeam.name} <b>{game.homeTeam.score}</b>
          </span>
          <span style={{ paddingLeft: "8px" }}>{game.status}</span>
        </p>
      ))}
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
