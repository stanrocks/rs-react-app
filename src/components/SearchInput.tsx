import React from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onSearchChange,
  onSearch,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <>
      <header className="search-header">
        <h1>Star Trek Characters Search App</h1>
        <form className="search-header-form" onSubmit={handleSubmit}>
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
    </>
  );
};

export default SearchInput;
