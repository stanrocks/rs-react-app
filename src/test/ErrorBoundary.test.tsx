import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { describe, it, expect, vi } from 'vitest';

const ThrowError = () => {
  throw new Error('Test error');
};

const renderWithErrorBoundary = (ui: React.ReactNode) =>
  render(<ErrorBoundary>{ui}</ErrorBoundary>);

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    renderWithErrorBoundary(<p>Safe Component</p>);
    expect(screen.getByText('Safe Component')).toBeInTheDocument();
  });

  it('displays error message when a component inside it throws an error', () => {
    renderWithErrorBoundary(<ThrowError />);

    expect(
      screen.getByText('Oooops! I crashed, but I did it so gracefully.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reload app/i })
    ).toBeInTheDocument();
  });

  it('reloads the page when "Reload App" button is clicked', async () => {
    const user = userEvent.setup();

    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: reloadMock },
    });

    renderWithErrorBoundary(<ThrowError />);

    const reloadButton = screen.getByRole('button', { name: /reload app/i });
    await user.click(reloadButton);

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
