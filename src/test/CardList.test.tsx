import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CardList from '../components/CardList';
import { SearchItem, SearchItems } from '../types/searchItems';
import { describe, it, expect, vi } from 'vitest';

vi.mock('./Card', () => {
  return {
    default: ({ item }: { item: SearchItem }) => (
      <tr>
        <td>{item.name}</td>
        <td>{item.description}</td>
      </tr>
    ),
  };
});

describe('CardList Component', () => {
  it('renders the CardList with correct header', () => {
    const items: SearchItems = [];

    render(
      <MemoryRouter>
        <CardList items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders the CardList with correct number of Card components', () => {
    const items: SearchItems = [
      { uid: '1', name: 'Item 1', description: 'Description 1' },
      { uid: '2', name: 'Item 2', description: 'Description 2' },
      { uid: '3', name: 'Item 3', description: 'Description 3' },
    ];

    render(
      <MemoryRouter>
        <CardList items={items} />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('row')).toHaveLength(items.length + 1);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('renders correct data in Card components', () => {
    const items: SearchItems = [
      { uid: '1', name: 'Item 1', description: 'Description 1' },
      { uid: '2', name: 'Item 2', description: 'Description 2' },
    ];

    render(
      <MemoryRouter>
        <CardList items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });
});
