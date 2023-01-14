import { GameStatus } from "@/types";
import { NowRequest, NowResponse } from "@vercel/node";
import wretch from "wretch";

export default async function (req: NowRequest, res: NowResponse) {
  //   console.log("SCORES!");
  const actionNetworkEndpoint =
    "https://api.actionnetwork.com/web/v1/scoreboard/ncaab?bookIds=15&division=D1&tournament=0&period=game";
  const response: any = await wretch(actionNetworkEndpoint)
    .headers({
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_API_KEY",
    })
    .get()
    .json();
  // console.log({
  //   game: response.games[10],
  //   x: response.games[10].teams,
  // });
  const scores: GameStatus[] = response.games.map((game: any) => {
    const [awayTeam, homeTeam] = game.teams;
    return {
      id: game.id,
      status: game.status_display,
      awayTeam: awayTeam.display_name,
      awayScore: game.boxscore?.total_away_points || 0,
      homeTeam: homeTeam.display_name,
      homeScore: game.boxscore?.total_home_points || 0,
    } as GameStatus;
  });
  return res.status(200).json(scores);
}
