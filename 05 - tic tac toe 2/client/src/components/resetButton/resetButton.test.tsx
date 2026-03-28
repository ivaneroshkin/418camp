import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ResetButton } from './resetButton';

describe('ResetButton', () => {
  it('renders with correct text', () => {
    render(<ResetButton onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /reset game/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ResetButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<ResetButton onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is enabled by default', () => {
    render(<ResetButton onClick={() => {}} />);
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
