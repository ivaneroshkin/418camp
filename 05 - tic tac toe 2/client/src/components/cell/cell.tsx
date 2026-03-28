import type React from 'react';
import type { CellValue } from '@/types/game';
import styles from './cell.module.scss';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled?: boolean;
}

function getCellDisplay(value: CellValue): string {
  if (value === 0) return '';
  return value === 1 ? 'X' : 'O';
}

export function Cell({ value, onClick, disabled = false }: CellProps): React.ReactElement {
  const display = getCellDisplay(value);
  const isEmpty = value === 0;

  return (
    <button
      type="button"
      className={`${styles.cell} ${!isEmpty ? styles.filled : ''}`}
      onClick={onClick}
      disabled={disabled || !isEmpty}
      aria-label={isEmpty ? 'Empty cell' : `Cell marked with ${display}`}
    >
      {display}
    </button>
  );
}
