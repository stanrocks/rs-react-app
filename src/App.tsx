import React, { Component } from 'react';
import SearchInput from './components/SearchInput.tsx';
import SearchResult from './components/SearchResults.tsx';
import { stapiService } from './services/stapiService';
import { SearchItems } from './types/searchItems';
import './App.css';

interface SearchState {
  searchTerm: string;
  results: SearchItems;
  error: string | null;
}

class App extends Component<Record<string, never>, SearchState> {
  state: SearchState = {
    searchTerm: '',
    results: [] as SearchItems,
    error: null,
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.fetchData(this.state.searchTerm);
  };

  fetchData = (searchTerm: string = this.state.searchTerm) => {
    this.setState({ error: null });

    stapiService.searchCharacters(searchTerm).then((apiResult) => {
      if (apiResult.data) {
        this.setState({ results: apiResult.data });
      } else if (apiResult.error) {
        console.log(apiResult.error);
        this.setState({ error: apiResult.error.message });
      }
    });
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <h1>Search App</h1>
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={this.handleSearchChange}
          onSearch={this.handleSearch}
        />
        <SearchResult items={this.state.results} />
        {/* TODO - button to induce error */}
      </div>
    );
  }
}

export default App;
