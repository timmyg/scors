import { TeamStatus } from "@/types";
import { useFavorites } from "hooks/useFavorites";
import { AiFillStar } from "react-icons/ai";

interface Props {
  teamA: TeamStatus;
  teamB: TeamStatus;
  scoreA: number;
  scoreB: number;
  status: string;
  onFavoriteToggle: (id: number) => void;
}

const Scoreboard = ({
  teamA,
  teamB,
  scoreA,
  scoreB,
  status,
  onFavoriteToggle,
}: Props) => {
  const [favorites] = useFavorites();
  const getRankString = (team: TeamStatus): string => {
    if (team.rank) {
      return `(${team.rank}) `;
    }
    return "";
  };
  console.log(favorites);
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
            {favorites.includes(teamA.id) && (
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
            {favorites.includes(teamB.id) && (
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
