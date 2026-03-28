import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Cell } from './cell';

describe('Cell', () => {
  it('renders an empty cell', () => {
    render(<Cell value={0} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('');
    expect(button).toHaveAttribute('aria-label', 'Empty cell');
  });

  it('renders X for value 1', () => {
    render(<Cell value={1} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('X');
    expect(button).toHaveAttribute('aria-label', 'Cell marked with X');
  });

  it('renders O for value 2', () => {
    render(<Cell value={2} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('O');
    expect(button).toHaveAttribute('aria-label', 'Cell marked with O');
  });

  it('calls onClick when clicked on empty cell', () => {
    const handleClick = vi.fn();
    render(<Cell value={0} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when cell is filled', () => {
    render(<Cell value={1} onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Cell value={0} onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
