import React, { Component } from 'react';
import SearchInput from './components/SearchInput.tsx';
import SearchResult from './components/SearchResults.tsx';
import { stapiService } from './services/stapiService';
import { SearchItems } from './types/searchItems';
import './App.css';

interface SearchState {
  searchTerm: string;
  results: SearchItems;
  error: { message: string; status?: number } | null;
  loading: boolean;
  shouldCrash: boolean;
}

class App extends Component<Record<string, never>, SearchState> {
  state: SearchState = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    results: [] as SearchItems,
    error: null,
    loading: false,
    shouldCrash: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(
    prevProps: Readonly<Record<string, never>>,
    prevState: Readonly<SearchState>
  ) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      localStorage.setItem('searchTerm', this.state.searchTerm);
    }
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.fetchData(this.state.searchTerm);
  };

  fetchData = (searchTerm: string = this.state.searchTerm) => {
    this.setState({ error: null, loading: true });

    stapiService
      .searchCharacters(searchTerm)
      .then((apiResult) => {
        this.setState({ loading: false });
        if (apiResult.data) {
          this.setState({ results: apiResult.data });
        } else if (apiResult.error) {
          console.log('API Result Error: ', apiResult.error);
          if (apiResult.error) {
            console.log('HTTP Error Status: ', apiResult.error.status);
            this.setState({ error: apiResult.error });
          }
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        this.setState({
          loading: false,
          error: { message: 'Fetch error occurred' },
        });
      });
  };

  handleCrash = () => {
    this.setState({ shouldCrash: true });
  };

  render() {
    const { searchTerm, loading, error, shouldCrash } = this.state;

    if (shouldCrash) {
      throw new Error('I crashed!');
    }

    return (
      <div>
        <h1>Search App</h1>
        <SearchInput
          searchTerm={searchTerm}
          onSearchChange={this.handleSearchChange}
          onSearch={this.handleSearch}
        />
        <SearchResult
          items={this.state.results}
          loading={loading}
          error={error}
        />
        <button onClick={this.handleCrash}>Crash the whole app!</button>
      </div>
    );
  }
}

export default App;
