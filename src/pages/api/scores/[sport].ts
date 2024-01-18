import { GameStatus } from "@/types";
import { VercelRequest, VercelResponse } from "@vercel/node";
import wretch from "wretch";

export default async function sport(req: VercelRequest, res: VercelResponse) {
  const sport: string = req.query.sport as string;
  if (["ncaab", "nfl", "nba", "nhl", "soccer"].indexOf(sport) === -1) {
    return res.status(400).json({ message: "Invalid sport" });
  }
  const actionNetworkEndpoint = `https://api.actionnetwork.com/web/v1/scoreboard/${sport}?bookIds=15&period=game&division=D1`;
  const response: any = await wretch(actionNetworkEndpoint)
    .headers({
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_API_KEY",
    })
    .get()
    .json();
  // console.log({ games: response.games });
  const games: GameStatus[] = response.games.map((game: any) => {
    const [awayTeam, homeTeam] = game.teams;
    // console.log({ game });
    return {
      id: game.id,
      statusDisplay: game.status_display,
      startTime: game.start_time,
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

  const search = req.query.search as string;

  // Filter the games if there is a search term
  let filteredGames = games;
  if (search) {
    filteredGames = games.filter((game) => {
      // Check if the search term is in the team names or conference type
      return (
        game.awayTeam.name.toLowerCase().includes(search.toLowerCase()) ||
        game.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
        game.awayTeam.conferenceType
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        game.homeTeam.conferenceType
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }

  // sort by in-progress, then scheduled, then the rest
  const gamesGrouped = {
    inProgress: filteredGames.filter((g) => g.statusId === "in_progress"),
    scheduled: filteredGames.filter((g) => g.statusId === "scheduled"),
    completed: filteredGames.filter((g) => g.statusId === "complete"),
    others: filteredGames.filter(
      (g) => !["in_progress", "scheduled", "complete"].includes(g.statusId)
    ),
  };

  // test
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
