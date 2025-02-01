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
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={searchTerm} onChange={onSearchChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchInput;
