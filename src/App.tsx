import React, { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput.tsx';
import SearchResults from './components/SearchResults.tsx';
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

interface FormState {
  searchInputValue: string;
}

const App: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    results: [] as SearchItems,
    error: null,
    loading: false,
    shouldCrash: false,
  });

  const [formState, setFormState] = useState<FormState>({
    searchInputValue: localStorage.getItem('searchTerm') || '',
  });

  const fetchData = (searchTerm: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
    }));

    stapiService
      .searchCharacters(searchTerm)
      .then((apiResult) => {
        setSearchState((prevState) => ({
          ...prevState,
          loading: false,
          results: apiResult.data || [],
          error: apiResult.error || null,
        }));
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setSearchState((prevState) => ({
          ...prevState,
          loading: false,
          error: { message: 'Fetch error occurred' },
        }));
      });
  };

  useEffect(() => {
    fetchData(searchState.searchTerm);
  }, [searchState.searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ searchInputValue: event.target.value });
  };

  const handleSearch = () => {
    localStorage.setItem('searchTerm', formState.searchInputValue);
    setSearchState((prevState) => ({
      ...prevState,
      searchTerm: formState.searchInputValue,
    }));
  };

  const handleCrash = () => {
    setSearchState((prevState) => ({ ...prevState, shouldCrash: true }));
  };

  const { loading, error, shouldCrash, results } = searchState;

  if (shouldCrash) {
    throw new Error('I crashed!');
  }

  return (
    <>
      <SearchInput
        searchTerm={formState.searchInputValue}
        onSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
      <SearchResults items={results} loading={loading} error={error} />
      <footer className="footer">
        <button className="button-danger" onClick={handleCrash}>
          Crash the whole app!
        </button>
      </footer>
    </>
  );
};

export default App;
