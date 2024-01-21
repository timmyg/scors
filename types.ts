export interface TeamStatus {
  name: string;
  score: number;
  rank: number;
  id: number;
  isFavorite: boolean;
  conferenceId: string;
  isWinner: boolean;
  isLoser: boolean;
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

type TeamActionNetwork = {
  id: number;
  full_name: string;
  display_name: string;
  short_name: string;
  location: string;
  abbr: string;
  logo: string;
  primary_color: string;
  secondary_color: string;
  conference_type: string;
  division_type: string;
  url_slug: string;
  standings: {
    win: number;
    loss: number;
    ties: number | null;
    overtime_losses: number | null;
    draw: number | null;
  };
};

type OddsActionNetwork = {
  ml_away: number;
  ml_home: number;
  spread_away: number;
  spread_home: number;
  spread_away_line: number;
  spread_home_line: number;
  over: number;
  under: number;
  draw: number | null;
  total: number;
  away_total: number;
  away_over: number;
  away_under: number;
  home_total: number;
  home_over: number;
  home_under: number;
  ml_home_public: number;
  ml_away_public: number;
  spread_home_public: number;
  spread_away_public: number;
  total_under_public: number;
  total_over_public: number;
  ml_home_money: number;
  ml_away_money: number;
  spread_home_money: number;
  spread_away_money: number;
  total_over_money: number;
  total_under_money: number;
  meta: Record<string, unknown> | null;
  num_bets: number;
  book_id: number;
  type: string;
  inserted: string;
  line_status: {
    draw: number | null;
    over: number;
    under: number;
    ml_away: number;
    ml_home: number;
    away_over: number;
    home_over: number;
    away_under: number;
    home_under: number;
    spread_away: number;
    spread_home: number;
  };
};

export type GameActionNetwork = {
  id: number;
  status: string;
  real_status: string;
  status_display: string | null;
  start_time: string;
  away_team_id: number;
  home_team_id: number;
  winning_team_id: number | null;
  league_name: string;
  type: string;
  season: number;
  attendance: number;
  coverage: string;
  is_free: boolean;
  trending: boolean;
  away_rotation_number: number;
  home_rotation_number: number;
  teams: {
    id: number;
    full_name: string;
    display_name: string;
    short_name: string;
    location: string;
    abbr: string;
    logo: string;
    primary_color: string;
    secondary_color: string;
    conference_type: string;
    division_type: string;
    url_slug: string;
    standings: {
      win: number;
      loss: number;
      ties: number | null;
      overtime_losses: number | null;
      draw: number | null;
    };
  }[];
  meta: Record<string, unknown>;
  odds: {
    ml_away: number;
    ml_home: number;
    spread_away: number;
    spread_home: number;
    spread_away_line: number;
    spread_home_line: number;
    over: number;
    under: number;
    draw: number | null;
    total: number;
    away_total: number;
    away_over: number;
    away_under: number;
    home_total: number;
    home_over: number;
    home_under: number;
    ml_home_public: number;
    ml_away_public: number;
    spread_home_public: number;
    spread_away_public: number;
    total_under_public: number;
    total_over_public: number;
    ml_home_money: number;
    ml_away_money: number;
    spread_home_money: number;
    spread_away_money: number;
    total_over_money: number;
    total_under_money: number;
    meta: Record<string, unknown> | null;
    num_bets: number;
    book_id: number;
    type: string;
    inserted: string;
    line_status: {
      draw: number | null;
      over: number;
      under: number;
      ml_away: number;
      ml_home: number;
      away_over: number;
      home_over: number;
      away_under: number;
      home_under: number;
      spread_away: number;
      spread_home: number;
    };
  }[];
  broadcast: {
    type: string;
    locale: string;
    channel: string;
    network: string;
  };
  last_play?: {
    text: string;
    type: string;
    clock: string;
    possession: number;
    home_win_pct?: number;
    over_win_pct?: number;
    home_spread_win_pct?: number;
  };
  boxscore?: {
    bonus: {
      away: { double: boolean; single: boolean };
      home: { double: boolean; single: boolean };
    };
    clock: string;
    period: number;
    outcome: {
      times_tied: number;
      lead_changes: number;
    };
    linescore: {
      id: number;
      abbr: string;
      display_name: string;
      full_name: string;
      away_points: number;
      home_points: number | null;
    }[];
    away_timeouts: number;
    home_timeouts: number;
    possession_arrow: number;
    total_away_points: number;
    total_home_points: number;
    total_away_firsthalf_points: number;
    total_home_firsthalf_points: number;
    total_away_secondhalf_points: number;
    total_home_secondhalf_points: number;
  };
  ranks?: {
    team_id: number;
    rank: number;
    poll: string;
  }[];
};
