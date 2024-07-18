export interface PlayerMoves {
  [playerName: string]: number[];
}

export interface GameData {
  players: PlayerMoves;
  winner: string;
  draw: boolean;
}
