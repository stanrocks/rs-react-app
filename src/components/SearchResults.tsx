import React, { Component } from 'react';
import CardList from './CardList';
import { SearchItems } from '../types/searchItems';

interface SearchResultsProps {
  items: SearchItems;
  loading: boolean;
  error: { message: string; status?: number } | null;
  className?: string;
}

class SearchResult extends Component<SearchResultsProps> {
  render() {
    const { items, loading, error } = this.props;
    return (
      <main className="search-results">
        <h2 className="search-results-header">Results</h2>
        {loading && <p>Loading...</p>}
        {error && (
          <p>
            Error: {error.message} {error.status && `(Status: ${error.status})`}
          </p>
        )}
        {!loading && !error && items?.length === 0 && <p>No results found</p>}
        {!loading && !error && items?.length > 0 && <CardList items={items} />}
      </main>
    );
  }
}

export default SearchResult;
