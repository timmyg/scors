import { GameStatus } from "@/types";
import { VercelRequest, VercelResponse } from "@vercel/node";
import wretch from "wretch";

export default async function (req: VercelRequest, res: VercelResponse) {
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
  //   game: response.games[3],
  //   x: response.games[3].ranks,
  // });
  const scores: GameStatus[] = response.games.map((game: any) => {
    const [awayTeam, homeTeam] = game.teams;
    return {
      id: game.id,
      status: game.status_display,
      awayTeam: {
        name: awayTeam.display_name,
        score: game.boxscore?.total_away_points || 0,
        rank: game.ranks?.find((t: any) => t.team_id === awayTeam.id)?.rank,
      },
      homeTeam: {
        name: homeTeam.display_name,
        score: game.boxscore?.total_home_points || 0,
        rank: game.ranks?.find((t: any) => t.team_id === homeTeam.id)?.rank,
      },
    } as GameStatus;
  });
  return res.status(200).json(scores);
}
