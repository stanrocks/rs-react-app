import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import NotFound from '../components/NotFound';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('NotFound', () => {
  it('renders all expected text elements', () => {
    renderWithRouter(<NotFound />);

    expect(
      screen.getByRole('heading', { level: 2, name: /Live Long and Prosper!/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: /But not here/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: /Because nothing is here/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 5, name: /Page not found/i })
    ).toBeInTheDocument();
  });

  it('renders a "Go Home" button with a link to "/"', () => {
    renderWithRouter(<NotFound />);

    const button = screen.getByRole('button', { name: /Go Home/i });
    expect(button).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Go Home/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
