import { useState, useEffect, useCallback } from 'react';
import { fetchField, fetchWinner, makeMove, resetGame, ApiError } from '@/services/api';
import type { GameField, Player } from '@/types/game';

interface UseGameReturn {
  field: GameField;
  winner: Player;
  isLoading: boolean;
  error: string | null;
  move: (x: number, y: number) => Promise<void>;
  reset: () => Promise<void>;
  clearError: () => void;
}

const INITIAL_FIELD: GameField = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const POLL_INTERVAL = 10000;

export function useGame(): UseGameReturn {
  const [field, setField] = useState<GameField>(INITIAL_FIELD);
  const [winner, setWinner] = useState<Player>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: unknown): void => {
    if (err instanceof ApiError) {
      setError(err.message);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred');
    }
  }, []);

  const updateField = useCallback(async (): Promise<void> => {
    try {
      const data = await fetchField();
      setField(data);
      setError(null);
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  const updateWinner = useCallback(async (): Promise<void> => {
    try {
      const data = await fetchWinner();
      setWinner(data.winner);
    } catch (err) {
      handleError(err);
    }
  }, [handleError]);

  const move = useCallback(
    async (x: number, y: number): Promise<void> => {
      try {
        await makeMove({ x, y });
        await updateField();
        await updateWinner();
      } catch (err) {
        handleError(err);
      }
    },
    [updateField, updateWinner, handleError]
  );

  const reset = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await resetGame();
      await updateField();
      await updateWinner();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [updateField, updateWinner, handleError]);

  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  useEffect(() => {
    const init = async (): Promise<void> => {
      setIsLoading(true);
      await Promise.all([updateField(), updateWinner()]);
      setIsLoading(false);
    };

    init();

    const intervalId = setInterval(() => {
      updateField();
      updateWinner();
    }, POLL_INTERVAL);

    return (): void => clearInterval(intervalId);
  }, [updateField, updateWinner]);

  return {
    field,
    winner,
    isLoading,
    error,
    move,
    reset,
    clearError,
  };
}
