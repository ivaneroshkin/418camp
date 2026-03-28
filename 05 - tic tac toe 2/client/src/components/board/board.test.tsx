import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Board } from './board';
import type { GameField } from '@/types/game';

describe('Board', () => {
  const emptyField: GameField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const partialField: GameField = [
    [1, 0, 2],
    [0, 1, 0],
    [2, 0, 0],
  ];

  it('renders a 3x3 grid of cells', () => {
    render(<Board field={emptyField} onCellClick={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(9);
  });

  it('displays X and O correctly', () => {
    render(<Board field={partialField} onCellClick={() => {}} />);
    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveTextContent('X');
    expect(buttons[1]).toHaveTextContent('');
    expect(buttons[2]).toHaveTextContent('O');
    expect(buttons[4]).toHaveTextContent('X');
    expect(buttons[6]).toHaveTextContent('O');
  });

  it('calls onCellClick with correct coordinates', () => {
    const handleClick = vi.fn();
    render(<Board field={emptyField} onCellClick={handleClick} />);
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[4]);
    expect(handleClick).toHaveBeenCalledWith(1, 1);

    fireEvent.click(buttons[2]);
    expect(handleClick).toHaveBeenCalledWith(2, 0);
  });

  it('has proper accessibility attributes', () => {
    render(<Board field={emptyField} onCellClick={() => {}} />);
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', 'Tic-Tac-Toe board');
  });
});
