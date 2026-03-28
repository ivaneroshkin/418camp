import type React from 'react';
import type { Player } from '@/types/game';
import styles from './gameStatus.module.scss';

interface GameStatusProps {
  winner: Player;
  isLoading: boolean;
}

export function GameStatus({ winner, isLoading }: GameStatusProps): React.ReactElement {
  if (isLoading) {
    return (
      <div className={styles.status} aria-live="polite">
        <span className={styles.loading}>Loading...</span>
      </div>
    );
  }

  return (
    <div className={styles.status} aria-live="polite">
      {winner ? (
        <span className={styles.winner}>Winner: {winner}</span>
      ) : (
        <span className={styles.playing}>Game in progress</span>
      )}
    </div>
  );
}
