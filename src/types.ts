export interface TeamStatus {
  name: string;
  score: number;
  rank: number;
}
export interface GameStatus {
  id: number;
  name: string;
  status: string;
  awayTeam: TeamStatus;
  homeTeam: TeamStatus;
}
