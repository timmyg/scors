import Scoreboard from "@/atoms/Scoreboard";
import { GameStatus, TeamStatus } from "@/types";

interface Props {
  games: GameStatus[];
}

export const ScoreboardAll = ({ games }: Props) => {
  const getRankString = (team: TeamStatus): string => {
    if (team.rank) {
      return `(${team.rank}) `;
    }
    return "";
  };

  const renderGames = (games: GameStatus[]) => {
    console.log({ games });
    return games.map((game: GameStatus, i: number) => (
      <Scoreboard
        teamA={`${getRankString(game.awayTeam)} ${game.awayTeam.name}`}
        teamB={`${getRankString(game.homeTeam)} ${game.homeTeam.name}`}
        scoreA={game.awayTeam.score}
        scoreB={game.homeTeam.score}
        status={game.statusDisplay}
        key={i}
      />
    ));
  };

  return <>{renderGames(games)}</>;
};
