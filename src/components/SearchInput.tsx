import React, { Component } from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

class SearchInput extends Component<SearchInputProps> {
  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onSearch();
  };

  render() {
    const { searchTerm, onSearchChange } = this.props;

    return (
      <header className="search-header">
        <h1>Star Trek Characters Search App</h1>
        <form className="search-header-form" onSubmit={this.handleSubmit}>
          <input
            className="search-header-field"
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button className="search-header-button" type="submit">
            Search
          </button>
        </form>
      </header>
    );
  }
}

export default SearchInput;
