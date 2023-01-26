import { useMemo } from "react";
import Scoreboard from "@/components/Scoreboard";
import { GameStatus } from "@/types";
import { useFavorites } from "hooks/useFavorites";
interface Props {
  games: GameStatus[];
  onFavoriteToggle: (id: number) => void;
}

export const ScoreboardAll = ({ games, onFavoriteToggle }: Props) => {
  const renderGames = useMemo(() => {
    return games.map((game: GameStatus, i: number) => (
      <Scoreboard
        game={game}
        status={game.statusDisplay}
        key={i}
        onFavoriteToggle={onFavoriteToggle}
      />
    ));
  }, [games]);
  return <>{renderGames}</>;
};
