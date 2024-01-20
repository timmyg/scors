import { GameStatus, TeamStatus } from "@/types";
import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

interface Props {
  game: GameStatus;
  status: string;
  onFavoriteToggle: (id: number) => void;
}

const Scoreboard = ({ game, status, onFavoriteToggle }: Props) => {
  // console.log("scoreboard", game.awayTeam.isFavorite, game.homeTeam.isFavorite);
  const teamA = game.awayTeam;
  const teamB = game.homeTeam;
  const scoreA = game.awayTeam.score;
  const scoreB = game.homeTeam.score;
  // const getRankString = (team: TeamStatus): string => {
  //   if (team.rank) {
  //     return `(${team.rank}) `;
  //   }
  //   return "";
  // };

  return (
    <div
      className="scoreboard-container"
      style={
        {
          // padding: "1rem",
          // borderRadius: "1rem",
        }
      }
    >
      <div style={{ display: "flex" }} className="scoreboard-inner">
        <div style={{ width: "60%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: teamA.isWinner ? "bold" : "normal",
            }}
          >
            <div
              style={{ fontSize: "1.25rem", cursor: "pointer" }}
              title="Click to favorite"
              onClick={() => onFavoriteToggle(teamA.id)}
            >
              {teamA.name}
              {teamA.rank && (
                <span
                  style={{
                    verticalAlign: "super",
                    fontSize: "smaller",
                    paddingLeft: "4px",
                  }}
                >
                  {teamA.rank}
                </span>
              )}
            </div>
            {game.awayTeam.isFavorite && (
              <div style={{ marginLeft: "0.5rem" }}>
                <AiFillStar style={{ fontSize: "1.25rem" }} />
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: teamB.isWinner ? "bold" : "normal",
            }}
          >
            <div
              style={{ fontSize: "1.25rem", cursor: "pointer" }}
              title="Click to favorite"
              onClick={() => onFavoriteToggle(teamB.id)}
            >
              {teamB.name}
              {teamB.rank && (
                <span
                  style={{
                    verticalAlign: "super",
                    fontSize: "smaller",
                    paddingLeft: "4px",
                  }}
                >
                  {teamB.rank}
                </span>
              )}
            </div>
            {game.homeTeam.isFavorite && (
              <div style={{ marginLeft: "0.5rem" }}>
                <AiFillStar style={{ fontSize: "1.25rem" }} />
              </div>
            )}
          </div>
        </div>
        <div style={{ width: "20%" }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: teamA.isWinner ? "bold" : "normal",
            }}
          >
            {scoreA}
          </div>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: teamB.isWinner ? "bold" : "normal",
            }}
          >
            {scoreB}
          </div>
        </div>
        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "0.875rem" }}>{status}</div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
