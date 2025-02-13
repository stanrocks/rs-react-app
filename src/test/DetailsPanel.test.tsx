import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { MemoryRouter, useSearchParams } from 'react-router';
import type { SetURLSearchParams } from 'react-router';
import DetailsPanel from '../components/DetailsPanel';
import { stapiService } from '../services/stapiService';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

vi.mock('../services/stapiService', () => ({
  stapiService: {
    getCharacterDetails: vi.fn(),
  },
}));

describe('DetailsPanel', () => {
  const mockSetSearchParams = vi.fn() as SetURLSearchParams;

  beforeEach(() => {
    vi.clearAllMocks();

    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ details: '123' }),
      mockSetSearchParams,
    ]);
  });

  it('renders loading state when fetching details', () => {
    vi.mocked(stapiService.getCharacterDetails).mockReturnValue(
      new Promise(() => {})
    );

    render(
      <MemoryRouter>
        <DetailsPanel />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('returns null when no itemId is present', () => {
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({}),
      mockSetSearchParams,
    ]);

    const { container } = render(
      <MemoryRouter>
        <DetailsPanel />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });
});
