import { useMemo } from "react";
import Scoreboard from "@/components/Scoreboard";
import { GameStatus } from "@/types";
// import { formatDistance } from "date-fns";

interface Props {
  games: GameStatus[];
  onFavoriteToggle?: (id: number) => void;
}

export const ScoreboardAll = ({ games, onFavoriteToggle }: Props) => {
  // console.log({ games });
  const renderGames = useMemo(() => {
    if (games.length === 0) {
      return (
        <div style={{ textAlign: "center", width: "100%", padding: "24px" }}>
          <span>No results</span>
        </div>
      );
    }
    return games.map((game: GameStatus, i: number) => (
      <Scoreboard
        game={game}
        status={
          game.statusDisplay ||
          new Date(game.startTime).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            timeZoneName: "short",
          })
        }
        key={i}
        // onFavoriteToggle={onFavoriteToggle}
      />
    ));
  }, [games]);
  return <div className="scoreboard-wrapper">{renderGames}</div>;
};
