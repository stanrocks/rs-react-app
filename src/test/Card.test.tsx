import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Card from '../components/Card';
import { SearchItem } from '../types/searchItems';
import { describe, it, expect } from 'vitest';

describe('Card Component', () => {
  it('renders card information correctly', () => {
    const item: SearchItem = {
      uid: '123',
      name: 'Test Item',
      description: 'A test description',
    };

    render(
      <MemoryRouter>
        <Card item={item} />
      </MemoryRouter>
    );

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
  });

  it('renders the Link components with correct "to" prop', () => {
    const item: SearchItem = {
      uid: '123',
      name: 'Test Item',
      description: 'A test description',
    };

    render(
      <MemoryRouter>
        <Card item={item} />
      </MemoryRouter>
    );

    const nameLink = screen.getByRole('link', { name: item.name });
    const descriptionLink = screen.getByRole('link', {
      name: item.description,
    });

    expect(nameLink).toHaveAttribute(
      'href',
      `/?query=null&page=null&details=${item.uid}`
    );
    expect(descriptionLink).toHaveAttribute(
      'href',
      `/?query=null&page=null&details=${item.uid}`
    );
  });

  it('renders Link with correct name and description', () => {
    const item: SearchItem = {
      uid: '123',
      name: 'Test Item',
      description: 'A test description',
    };

    render(
      <MemoryRouter>
        <Card item={item} />
      </MemoryRouter>
    );

    const nameLink = screen.getByRole('link', { name: item.name });
    const descriptionLink = screen.getByRole('link', {
      name: item.description,
    });

    expect(nameLink).toHaveTextContent(item.name);
    expect(descriptionLink).toHaveTextContent(item.description);
  });
});
