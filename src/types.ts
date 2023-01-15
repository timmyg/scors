export interface TeamStatus {
  name: string;
  score: number;
  rank: number;
}
export interface GameStatus {
  id: number;
  name: string;
  statusId: string;
  statusDisplay: string;
  awayTeam: TeamStatus;
  homeTeam: TeamStatus;
}
