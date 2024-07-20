export interface GameData {
  [key: string]: { moves: number[]; symbol: SymbolType };
}
export type SymbolType = 'X' | 'O' | undefined;
export type PlayerName = string | undefined;
