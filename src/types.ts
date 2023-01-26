export interface TeamStatus {
  name: string;
  score: number;
  rank: number;
  id: number;
  isFavorite: boolean;
}
export interface GameStatus {
  id: number;
  name: string;
  statusId: string;
  statusDisplay: string;
  awayTeam: TeamStatus;
  homeTeam: TeamStatus;
}
