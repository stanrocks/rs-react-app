import React, { Component } from 'react';
import SearchInput from './components/SearchInput.tsx';
import { stapiService } from './services/stapiService';
import { StapiCharacter } from './types/stapi';
import './App.css';

interface SearchState {
  searchTerm: string;
  results: StapiCharacter[];
  error: string | null;
}

class App extends Component<undefined, SearchState> {
  state: SearchState = {
    searchTerm: '',
    results: [],
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

    stapiService
      .searchCharacters(searchTerm)
      .then((results) => {
        console.log(results);
        this.setState({ results });
      })
      .catch((error) => {
        this.setState({ error: error.message });
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
      </div>
    );
  }
}

export default App;
