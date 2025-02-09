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

const App: React.FC = () => {
  const [state, setState] = useState<SearchState>({
    searchTerm: localStorage.getItem('searchTerm') || '',
    results: [] as SearchItems,
    error: null,
    loading: false,
    shouldCrash: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchTerm: event.target.value });
  };

  const handleSearch = () => {
    localStorage.setItem('searchTerm', state.searchTerm);
    fetchData(state.searchTerm);
  };

  const handleCrash = () => {
    setState({ ...state, shouldCrash: true });
  };

  const fetchData = (searchTerm: string = state.searchTerm) => {
    setState({ ...state, error: null, loading: true });

    stapiService
      .searchCharacters(searchTerm)
      .then((apiResult) => {
        setState({ ...state, loading: false });
        if (apiResult.data) {
          setState({ ...state, results: apiResult.data });
        } else if (apiResult.error) {
          setState({ ...state, error: apiResult.error });
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setState({
          ...state,
          loading: false,
          error: { message: 'Fetch error occurred' },
        });
      });
  };

  const { searchTerm, loading, error, shouldCrash, results } = state;

  if (shouldCrash) {
    throw new Error('I crashed!');
  }

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
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
