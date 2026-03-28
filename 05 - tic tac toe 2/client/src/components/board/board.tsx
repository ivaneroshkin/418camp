import type React from 'react';
import { Cell } from '@/components/cell';
import type { GameField } from '@/types/game';
import styles from './board.module.scss';

interface BoardProps {
  field: GameField;
  onCellClick: (x: number, y: number) => void;
  disabled?: boolean;
}

export function Board({ field, onCellClick, disabled = false }: BoardProps): React.ReactElement {
  return (
    <div className={styles.board} role="grid" aria-label="Tic-Tac-Toe board">
      {field.map((row, y) => (
        <div key={y} className={styles.row} role="row">
          {row.map((cell, x) => (
            <Cell
              key={`${x}-${y}`}
              value={cell}
              onClick={() => onCellClick(x, y)}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
