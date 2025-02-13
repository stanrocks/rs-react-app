import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import NotFound from '../components/NotFound';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('NotFound', () => {
  it('renders a 404 message', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
