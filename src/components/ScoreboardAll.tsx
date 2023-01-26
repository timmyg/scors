import Scoreboard from "@/components/Scoreboard";
import { GameStatus, TeamStatus } from "@/types";

interface Props {
  games: GameStatus[];
  onFavoriteToggle: (id: number) => void;
}

export const ScoreboardAll = ({ games, onFavoriteToggle }: Props) => {
  const renderGames = (games: GameStatus[]) => {
    console.log({ games });
    return games.map((game: GameStatus, i: number) => (
      <Scoreboard
        teamA={game.awayTeam}
        teamB={game.homeTeam}
        scoreA={game.awayTeam.score}
        scoreB={game.homeTeam.score}
        status={game.statusDisplay}
        key={i}
        onFavoriteToggle={onFavoriteToggle}
      />
    ));
  };

  return <>{renderGames(games)}</>;
};
