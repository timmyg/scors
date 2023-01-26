import Scoreboard from "@/components/Scoreboard";
import { GameStatus } from "@/types";
import { useFavorites } from "hooks/useFavorites";
interface Props {
  games: GameStatus[];
  onFavoriteToggle: (id: number) => void;
}

export const ScoreboardAll = ({ games, onFavoriteToggle }: Props) => {
  const [favorites] = useFavorites();
  console.log({ favorites });
  const renderGames = (games: GameStatus[]) => {
    return games.map((game: GameStatus, i: number) => (
      <Scoreboard
        teamA={game.awayTeam}
        teamB={game.homeTeam}
        scoreA={game.awayTeam.score}
        scoreB={game.homeTeam.score}
        isTeamAFavorite={favorites.includes(game.awayTeam.id)}
        isTeamBFavorite={favorites.includes(game.homeTeam.id)}
        status={game.statusDisplay}
        key={i}
        onFavoriteToggle={onFavoriteToggle}
      />
    ));
  };

  return <>{renderGames(games)}</>;
};
