import { NowRequest, NowResponse } from "@vercel/node";
import wretch from "wretch";

export default async function (req: NowRequest, res: NowResponse) {
  //   console.log("SCORES!");
  const actionNetworkEndpoint =
    "https://api.actionnetwork.com/web/v1/scoreboard/ncaab?bookIds=15&division=D1&tournament=0&period=game";
  const response = await wretch(actionNetworkEndpoint)
    .headers({
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_API_KEY",
    })
    .get()
    .json();
  console.log({ response });
  //   console.log(response.games[0]);

  const scores = response.games.map((game) => {
    const [awayTeam, homeTeam] = game.teams;
    return {
      id: game.id,
      name: `${awayTeam.display_name} vs ${homeTeam.display_name}`,
      // score: `${event.competitions[0].competitors[0].score} - ${event.competitions[0].competitors[1].score}`,
    };
  });

  //   ));

  //   return res.status(200).json({ scores: 1 });
  return res.status(200).json(scores);
}
