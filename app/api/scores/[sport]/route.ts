import { GameActionNetwork, GameStatus } from "@/types";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { NextRequest, NextResponse } from "next/server";
import wretch from "wretch";

export async function GET(req: NextRequest, { params }: any) {
  console.log("params...", params);
  console.log("search params...", req.nextUrl.searchParams);
  //   const sport: string = req.query.sport as string;
  const { sport } = params;
  console.log({ sport });
  if (["ncaab", "nfl", "nba", "nhl", "soccer"].indexOf(sport) === -1) {
    // return res.status(400).json({ message: "Invalid sport" });
    return NextResponse.json(
      {
        body: "Invalid sport",
      },
      {
        status: 400,
      }
    );
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
  // console.log("game", JSON.stringify(response.games[0]));
  const games: GameStatus[] = response.games.map((game: GameActionNetwork) => {
    const [awayTeam, homeTeam] = game.teams;
    const homePoints = game.boxscore?.total_home_points || 0;
    const awayPoints = game.boxscore?.total_away_points || 0;
    return {
      id: game.id,
      statusDisplay: game.status_display,
      startTime: game.start_time,
      statusId: game.status.toLowerCase(),
      awayTeam: {
        name: awayTeam.display_name,
        score: awayPoints,
        rank: game.ranks?.find((t: any) => t.team_id === awayTeam.id)?.rank,
        id: awayTeam.id,
        conferenceId: awayTeam.conference_type, // BIGEAST
        isWinner: game.status === "complete" && awayPoints > homePoints,
        isLoser: game.status === "complete" && homePoints > awayPoints,
      },
      homeTeam: {
        name: homeTeam.display_name,
        score: homePoints,
        rank: game.ranks?.find((t: any) => t.team_id === homeTeam.id)?.rank,
        id: homeTeam.id,
        conferenceId: homeTeam.conference_type,
        isWinner: game.status === "complete" && homePoints > awayPoints,
        isLoser: game.status === "complete" && awayPoints > homePoints,
      },
    } as GameStatus;
  });

  //   const search = req.query.search as string;
  const search = req.nextUrl.searchParams.get("search");

  // Filter the games if there is a search term
  let filteredGames = games;
  // console.log(games[2]);
  if (search) {
    filteredGames = games.filter((game) => {
      // Check if the search term is in the team names or conference type
      return (
        game.awayTeam.name.toLowerCase().includes(search.toLowerCase()) ||
        game.homeTeam.name.toLowerCase().includes(search.toLowerCase()) ||
        game.awayTeam.conferenceId
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        game.homeTeam.conferenceId?.toLowerCase().includes(search.toLowerCase())
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

  //   return res.status(200).json({
  return NextResponse.json({
    data: { games: gamesSorted },
    timestamp: new Date().toISOString(),
  });
}
