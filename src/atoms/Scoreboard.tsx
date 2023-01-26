interface Props {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  status: string;
}
const Scoreboard = ({ teamA, teamB, scoreA, scoreB, status }: Props) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex">
        <div className="w-1/2">
          <div className="text-white font-medium">{teamA}</div>
          <div className="text-3xl font-medium text-white">{scoreA}</div>
        </div>
        <div className="w-1/2">
          <div className="text-white font-medium">{teamB}</div>
          <div className="text-3xl font-medium text-white">{scoreB}</div>
        </div>
      </div>
      <div className="text-white text-sm font-medium mt-2">{status}</div>
    </div>
  );
};

export default Scoreboard;
