import { useMemo } from "react";
import Scoreboard from "@/components/Scoreboard";
import { GameStatus } from "@/types";
import { formatDistance } from "date-fns";

interface Props {
  games: GameStatus[];
  onFavoriteToggle: (id: number) => void;
}

export const ScoreboardAll = ({ games, onFavoriteToggle }: Props) => {
  const renderGames = useMemo(() => {
    return games.map((game: GameStatus, i: number) => (
      <Scoreboard
        game={game}
        status={
          game.statusDisplay ||
          new Date(game.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })
        }
        key={i}
        onFavoriteToggle={onFavoriteToggle}
      />
    ));
  }, [games, onFavoriteToggle]);
  return <>{renderGames}</>;
};
