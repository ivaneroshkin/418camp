import { endpoints } from '@/config/env';
import type { GameField, MovePayload, WinnerResponse } from '@/types/game';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(`HTTP error: ${response.status} ${response.statusText}`, response.status);
  }
  return response.json() as Promise<T>;
}

export async function fetchField(): Promise<GameField> {
  const response = await fetch(endpoints.field);
  return handleResponse<GameField>(response);
}

export async function makeMove(payload: MovePayload): Promise<void> {
  const response = await fetch(endpoints.move, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  await handleResponse<void>(response);
}

export async function fetchWinner(): Promise<WinnerResponse> {
  const response = await fetch(endpoints.winner);
  return handleResponse<WinnerResponse>(response);
}

export async function resetGame(): Promise<void> {
  const response = await fetch(endpoints.reset, {
    method: 'POST',
  });
  await handleResponse<void>(response);
}

export { ApiError };
