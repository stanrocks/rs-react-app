import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import { MemoryRouter } from 'react-router';
import Layout from '../components/Layout';
import { stapiService } from '../services/stapiService';

vi.mock('../services/stapiService', () => ({
  stapiService: {
    searchCharacters: vi.fn(),
  },
}));

vi.mock('../hooks/useSearchTermStorage', () => ({
  useSearchTermStorage: () => ['', vi.fn()],
}));

const mockSearchCharacters = stapiService.searchCharacters as Mock;

describe('Layout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchCharacters.mockResolvedValue({
      data: [],
      totalPages: 0,
      error: null,
    });
  });

  const renderLayout = () => {
    return render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
  };

  it('renders search input and handles search', async () => {
    renderLayout();

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect(searchInput).toHaveValue('test query');

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSearchCharacters).toHaveBeenCalledWith('test query', 1);
    });
  });

  it('displays loading state while fetching data', async () => {
    mockSearchCharacters.mockImplementation(() => new Promise(() => {}));
    renderLayout();

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('handles successful API response', async () => {
    const mockData = [
      { id: 1, name: 'Character 1' },
      { id: 2, name: 'Character 2' },
    ];

    mockSearchCharacters.mockResolvedValue({
      data: mockData,
      totalPages: 2,
      error: null,
    });

    renderLayout();

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Character 1')).toBeInTheDocument();
      expect(screen.getByText('Character 2')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    mockSearchCharacters.mockRejectedValue(new Error('API Error'));
    renderLayout();

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText(/fetch error occurred/i)).toBeInTheDocument();
    });
  });
});
