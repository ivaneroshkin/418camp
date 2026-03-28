import type React from 'react';
import { Board, ErrorMessage, GameStatus, ResetButton } from '@/components';
import { useGame } from '@/hooks/useGame';
import styles from './App.module.scss';

export function App(): React.ReactElement {
  const { field, winner, isLoading, error, move, reset, clearError } = useGame();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Tic-Tac-Toe v.2</h1>

      {error && <ErrorMessage message={error} onDismiss={clearError} />}

      <div className={styles.gameContainer}>
        <Board field={field} onCellClick={move} disabled={isLoading || !!winner} />
      </div>

      <GameStatus winner={winner} isLoading={isLoading} />

      <ResetButton onClick={reset} disabled={isLoading} />
    </div>
  );
}
