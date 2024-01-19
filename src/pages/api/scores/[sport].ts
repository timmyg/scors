import { GameStatus } from "@/types";
import { VercelRequest, VercelResponse } from "@vercel/node";
import wretch from "wretch";

export default async function sport(req: VercelRequest, res: VercelResponse) {
  const sport: string = req.query.sport as string;
  if (["ncaab", "nfl", "nba", "nhl", "soccer"].indexOf(sport) === -1) {
    return res.status(400).json({ message: "Invalid sport" });
  }
  const actionNetworkURL = new URL(
    `https://api.actionnetwork.com/web/v1/scoreboard/${sport}`
  );
  actionNetworkURL.searchParams.append("bookIds", "15");
  actionNetworkURL.searchParams.append("period", "game");
  if (sport === "ncaab") {
    actionNetworkURL.searchParams.append("division", "D1");
  }
  const actionNetworkEndpoint = actionNetworkURL.href;
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
      startTime: game.start_time,
      statusId: game.status.toLowerCase(),
      awayTeam: {
        name: awayTeam.display_name,
        score: game.boxscore?.total_away_points || 0,
        rank: game.ranks?.find((t: any) => t.team_id === awayTeam.id)?.rank,
        id: awayTeam.id,
        conferenceName: awayTeam.conference_type, // BIGEAST
      },
      homeTeam: {
        name: homeTeam.display_name,
        score: game.boxscore?.total_home_points || 0,
        rank: game.ranks?.find((t: any) => t.team_id === homeTeam.id)?.rank,
        id: homeTeam.id,
        conferenceName: homeTeam.conference_type,
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
        game.awayTeam.conferenceName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        game.homeTeam.conferenceName
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
