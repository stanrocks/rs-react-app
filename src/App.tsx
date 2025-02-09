import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import SearchInput from './components/SearchInput.tsx';
import SearchResults from './components/SearchResults.tsx';
import Pagination from './components/Pagination.tsx';
import { stapiService } from './services/stapiService';
import { SearchItems } from './types/searchItems';
import { useRestoreSearchQuery } from './hooks/useRestoreSearchQuery';
import './App.css';

interface SearchState {
  searchTerm: string;
  results: SearchItems;
  error: { message: string; status?: number } | null;
  loading: boolean;
  shouldCrash: boolean;
  currentPage: number;
  totalPages: number;
}

interface FormState {
  searchInputValue: string;
}

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const restoredSearchTerm = useRestoreSearchQuery();

  const [searchState, setSearchState] = useState<SearchState>({
    searchTerm: restoredSearchTerm,
    results: [] as SearchItems,
    error: null,
    loading: false,
    shouldCrash: false,
    currentPage: Number(searchParams.get('page')) || 1,
    totalPages: 0,
  });

  const [formState, setFormState] = useState<FormState>({
    searchInputValue: restoredSearchTerm,
  });

  useEffect(() => {
    if (!searchParams.get('search') || !searchParams.get('page')) {
      setSearchParams({ search: restoredSearchTerm, page: '1' });
    }
  }, [restoredSearchTerm, searchParams, setSearchParams]);

  const fetchData = (searchTerm: string, page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      error: null,
      loading: true,
    }));

    stapiService
      .searchCharacters(searchTerm, page)
      .then((apiResult) => {
        setSearchState((prevState) => ({
          ...prevState,
          loading: false,
          results: apiResult.data || [],
          error: apiResult.error || null,
          totalPages: apiResult.totalPages || 0,
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
    fetchData(searchState.searchTerm, searchState.currentPage);
  }, [searchState.searchTerm, searchState.currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ searchInputValue: event.target.value });
  };

  const handleSearch = () => {
    const searchTerm = formState.searchInputValue;
    localStorage.setItem('searchTerm', searchTerm);
    setSearchParams({ search: searchTerm, page: '1' });
    setSearchState((prevState) => ({
      ...prevState,
      searchTerm: searchTerm,
      currentPage: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ search: searchState.searchTerm, page: page.toString() });
    setSearchState((prevState) => ({ ...prevState, currentPage: page }));
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
        <Pagination
          currentPage={searchState.currentPage}
          totalPages={searchState.totalPages}
          onPageChange={handlePageChange}
        />
        <button className="button-danger" onClick={handleCrash}>
          Crash the whole app!
        </button>
      </footer>
    </>
  );
};

export default App;
