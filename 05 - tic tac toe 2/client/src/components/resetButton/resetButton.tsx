import type React from 'react';
import styles from './resetButton.module.scss';

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ResetButton({ onClick, disabled = false }: ResetButtonProps): React.ReactElement {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label="Reset game"
    >
      Reset Game
    </button>
  );
}
