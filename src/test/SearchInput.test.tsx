import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../components/SearchInput';

describe('SearchInput', () => {
  const defaultProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    onSearch: vi.fn(),
  };

  test('renders the header and search form', () => {
    render(<SearchInput {...defaultProps} />);

    expect(
      screen.getByText('Star Trek Characters Search App')
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('displays the search term value', () => {
    const props = {
      ...defaultProps,
      searchTerm: 'Spock',
    };

    render(<SearchInput {...props} />);
    expect(screen.getByRole('textbox')).toHaveValue('Spock');
  });

  test('calls onSearchChange when input value changes', () => {
    render(<SearchInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Kirk' } });

    expect(defaultProps.onSearchChange).toHaveBeenCalled();
  });
});
