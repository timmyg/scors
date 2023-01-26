interface Props {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  status: string;
}

const Scoreboard = ({ teamA, teamB, scoreA, scoreB, status }: Props) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg m-4">
      <div className="flex">
        <div className="w-3/5">
          <div className="text-xl">{teamA}</div>
          <div className="text-xl">{teamB}</div>
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
