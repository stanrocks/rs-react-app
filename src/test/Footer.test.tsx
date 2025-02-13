import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';

describe('Footer', () => {
  it('renders the footer with a button', () => {
    render(<Footer onClick={() => {}} />);

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Crash the whole app/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const mockOnClick = vi.fn();

    render(<Footer onClick={mockOnClick} />);

    const button = screen.getByRole('button', { name: /Crash the whole app/i });

    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('has the correct class for styling', () => {
    render(<Footer onClick={() => {}} />);

    const button = screen.getByRole('button', { name: /Crash the whole app/i });

    expect(button).toHaveClass('button-danger');
  });
});
