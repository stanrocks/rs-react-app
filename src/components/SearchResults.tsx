import React, { Component } from 'react';
import CardList from './CardList';
import { SearchItems } from '../types/searchItems';

interface SearchResultsProps {
  items: SearchItems;
}

class SearchResult extends Component<SearchResultsProps> {
  render() {
    return (
      <>
        <h2>Results</h2>
        {/* TODO - check for errors. Show cardList if no errors */}
        <CardList items={this.props.items} />
      </>
    );
  }
}

export default SearchResult;
