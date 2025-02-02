import React, { Component } from 'react';
import CardList from './CardList';
import { SearchItems } from '../types/searchItems';

interface SearchResultsProps {
  items: SearchItems;
  loading: boolean;
  error: string | null;
}

class SearchResult extends Component<SearchResultsProps> {
  render() {
    const { items, loading, error } = this.props;
    return (
      <>
        <h2>Results</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {this.props.error}</p>}
        {items?.length === 0 && !loading && !error && <p>No results found</p>}
        {items?.length > 0 && !loading && !error && <CardList items={items} />}
      </>
    );
  }
}

export default SearchResult;
