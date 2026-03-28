import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GameStatus } from './gameStatus';

describe('GameStatus', () => {
  it('shows loading state', () => {
    render(<GameStatus winner="" isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows game in progress when no winner', () => {
    render(<GameStatus winner="" isLoading={false} />);
    expect(screen.getByText('Game in progress')).toBeInTheDocument();
  });

  it('shows winner X', () => {
    render(<GameStatus winner="X" isLoading={false} />);
    expect(screen.getByText('Winner: X')).toBeInTheDocument();
  });

  it('shows winner O', () => {
    render(<GameStatus winner="O" isLoading={false} />);
    expect(screen.getByText('Winner: O')).toBeInTheDocument();
  });

  it('has aria-live attribute for accessibility', () => {
    render(<GameStatus winner="" isLoading={false} />);
    const statusText = screen.getByText('Game in progress');
    expect(statusText.parentElement).toHaveAttribute('aria-live', 'polite');
  });
});
