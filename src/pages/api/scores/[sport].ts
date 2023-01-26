import { GameStatus } from "@/types";
import { VercelRequest, VercelResponse } from "@vercel/node";
import wretch from "wretch";

export default async function (req: VercelRequest, res: VercelResponse) {
  const sport: string = req.query.sport as string;
  if (["ncaab", "nfl", "nba", "nhl"].indexOf(sport) === -1) {
    return res.status(400).json({ message: "Invalid sport" });
  }
  const actionNetworkEndpoint = `https://api.actionnetwork.com/web/v1/scoreboard/${sport}?bookIds=15&period=game`;
  const response: any = await wretch(actionNetworkEndpoint)
    .headers({
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_API_KEY",
    })
    .get()
    .json();
  const games: GameStatus[] = response.games.map((game: any) => {
    const [awayTeam, homeTeam] = game.teams;
    return {
      id: game.id,
      statusDisplay: game.status_display,
      statusId: game.status.toLowerCase(),
      awayTeam: {
        name: awayTeam.display_name,
        score: game.boxscore?.total_away_points || 0,
        rank: game.ranks?.find((t: any) => t.team_id === awayTeam.id)?.rank,
        id: awayTeam.id,
      },
      homeTeam: {
        name: homeTeam.display_name,
        score: game.boxscore?.total_home_points || 0,
        rank: game.ranks?.find((t: any) => t.team_id === homeTeam.id)?.rank,
        id: homeTeam.id,
      },
    } as GameStatus;
  });

  // sort by in-progress, then scheduled, then the rest
  const gamesGrouped = {
    inProgress: games.filter((g) => g.statusId === "in_progress"),
    scheduled: games.filter((g) => g.statusId === "scheduled"),
    completed: games.filter((g) => g.statusId === "complete"),
    others: games.filter(
      (g) => !["in_progress", "scheduled", "complete"].includes(g.statusId)
    ),
  };

  const gamesSorted = [
    ...gamesGrouped.inProgress,
    ...gamesGrouped.scheduled,
    ...gamesGrouped.completed,
    ...gamesGrouped.others,
  ];

  return res.status(200).json({
    data: { games: gamesSorted },
    timestamp: new Date().toISOString(),
  });
}
