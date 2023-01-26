import { GameStatus, TeamStatus } from "@/types";
import { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";

interface Props {
  game: GameStatus;
  status: string;
  onFavoriteToggle: (id: number) => void;
}

const Scoreboard = ({ game, status, onFavoriteToggle }: Props) => {
  console.log("scoreboard", game.awayTeam.isFavorite, game.homeTeam.isFavorite);
  const teamA = game.awayTeam;
  const teamB = game.homeTeam;
  const scoreA = game.awayTeam.score;
  const scoreB = game.homeTeam.score;
  const getRankString = (team: TeamStatus): string => {
    if (team.rank) {
      return `(${team.rank}) `;
    }
    return "";
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg m-4">
      <div className="flex">
        <div className="w-3/5">
          <div className="flex items-center">
            <div
              className="text-xl cursor-pointer"
              title="Click to favorite"
              onClick={() => onFavoriteToggle(teamA.id)}
            >
              {`${getRankString(teamA)} ${teamA.name}`}
            </div>
            {game.awayTeam.isFavorite && (
              <div className="ml-2">
                <AiFillStar className="text-xl" />
              </div>
            )}
          </div>
          <div className="flex items-center">
            <div
              className="text-xl cursor-pointer"
              title="Click to favorite"
              onClick={() => onFavoriteToggle(teamB.id)}
            >{`${getRankString(teamB)} ${teamB.name}`}</div>
            {game.homeTeam.isFavorite && (
              <div className="ml-2">
                <AiFillStar className="text-xl" />
              </div>
            )}
          </div>
        </div>
        <div className="w-1/5">
          <div className="text-xl">{scoreA}</div>
          <div className="text-xl">{scoreB}</div>
        </div>
        <div className="w-1/5 flex justify-center items-center">
          <div className="text-sm ">{status}</div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
