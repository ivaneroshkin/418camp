export type CellValue = 0 | 1 | 2;
export type GameField = CellValue[][];
export type Player = 'X' | 'O' | '';

export interface GameState {
  field: GameField;
  winner: Player;
  isLoading: boolean;
  error: string | null;
}

export interface MovePayload {
  x: number;
  y: number;
}

export interface WinnerResponse {
  winner: Player;
}
