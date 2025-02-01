import React, { Component } from 'react';
import SearchInput from '../components/SearchInput.tsx';
import './App.css';

interface SearchState {
  searchTerm: string;
}

class App extends Component<undefined, SearchState> {
  state: SearchState = {
    searchTerm: '',
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.fetchData(this.state.searchTerm.trim());
  };

  fetchData = (searchTerm: string) => {
    // TODO
    console.log(searchTerm);
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
