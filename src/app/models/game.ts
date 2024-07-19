export interface GameData {
  [key: string]: { moves: number[]; symbol: SymbolType };
}
export type SymbolType = 'X' | 'O' | undefined | string;
