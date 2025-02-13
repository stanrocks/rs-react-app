import React, { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import Footer from './Footer';
import { Outlet, Route, Routes, useSearchParams } from 'react-router';
import { stapiService } from '../services/stapiService';
import { SearchItems } from '../types/searchItems';
import { useSearchTermStorage } from '../hooks/useSearchTermStorage.ts';

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

function Layout() {
  const [storedSearchTerm, updateStoredSearchTerm] = useSearchTermStorage();

  const [searchState, setSearchState] = useState<SearchState>({
    searchTerm: storedSearchTerm,
    results: [] as SearchItems,
    error: null,
    loading: false,
    shouldCrash: false,
    currentPage: 1,
    totalPages: 0,
  });

  const [, setSearchParams] = useSearchParams();

  const [formState, setFormState] = useState<FormState>({
    searchInputValue: storedSearchTerm,
  });

  const fetchData = (searchTerm: string, page: number) => {
    setSearchParams({
      query: searchTerm,
      page: String(page),
    });
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
    updateStoredSearchTerm(searchTerm);
    setSearchState((prevState) => ({
      ...prevState,
      searchTerm: searchTerm,
      currentPage: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchState((prevState) => ({ ...prevState, currentPage: page }));
  };

  const { loading, error, shouldCrash, results } = searchState;

  const handleCrash = () => {
    setSearchState((prevState) => ({ ...prevState, shouldCrash: true }));
  };

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
      <Routes>
        <Route
          path=""
          element={
            <SearchResults
              items={results}
              loading={loading}
              error={error}
              currentPage={searchState.currentPage}
              totalPages={searchState.totalPages}
              onPageChange={handlePageChange}
            />
          }
        ></Route>
      </Routes>
      <Outlet />
      <Footer onClick={handleCrash} />
    </>
  );
}

export default Layout;
