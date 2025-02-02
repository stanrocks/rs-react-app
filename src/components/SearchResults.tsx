import React, { Component } from 'react';
import CardList from './CardList';
import { SearchItems } from '../types/searchItems';
import { HTTPError } from '../services/stapiService';

interface SearchResultsProps {
  items: SearchItems;
  loading: boolean;
  error: string | HTTPError | null;
}

class SearchResult extends Component<SearchResultsProps> {
  render() {
    const { items, loading, error } = this.props;
    return (
      <>
        <h2>Results</h2>
        {loading && <p>Loading...</p>}
        {error && (
          <p>
            Error: {error instanceof Error ? error.message : error}
            {error instanceof Error &&
              error.status &&
              ` (Status: ${error.status})`}
          </p>
        )}
        {!loading && !error && items?.length === 0 && <p>No results found</p>}
        {!loading && !error && items?.length > 0 && <CardList items={items} />}
      </>
    );
  }
}

export default SearchResult;
