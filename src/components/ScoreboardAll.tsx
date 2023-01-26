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
    return games.map((game: GameStatus) => (
      <p key={game.id}>
        <span>
          {getRankString(game.awayTeam)} {game.awayTeam.name}{" "}
          <b>{game.awayTeam.score}</b> @ {getRankString(game.homeTeam)}
          {game.homeTeam.name} <b>{game.homeTeam.score}</b>
        </span>
        <span style={{ paddingLeft: "8px" }}>{game.statusDisplay}</span>
      </p>
    ));
  };

  return <>{renderGames(games)}</>;
};
