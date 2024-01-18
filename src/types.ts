export interface TeamStatus {
  name: string;
  score: number;
  rank: number;
  id: number;
  isFavorite: boolean;
  conferenceType: string;
}
export interface GameStatus {
  id: number;
  name: string;
  statusId: string;
  statusDisplay: string;
  startTime: string;
  awayTeam: TeamStatus;
  homeTeam: TeamStatus;
}
