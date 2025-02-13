import React from 'react';
import { SearchItems } from '../types/searchItems';
import { Outlet } from 'react-router';
import Pagination from './Pagination';
import CardList from './CardList';

interface SearchResultsProps {
  items: SearchItems;
  loading: boolean;
  error: { message: string; status?: number } | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const SearchResult: React.FC<SearchResultsProps> = ({
  items,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <main className="search-results">
      <h2 className="search-results-header">Results</h2>
      {loading && <p>Loading...</p>}
      {error && (
        <p>
          Error: {error.message} {error.status && `(Status: ${error.status})`}
        </p>
      )}
      {!loading && !error && items?.length === 0 && <p>No results found</p>}
      {!loading && !error && items?.length > 0 && (
        <>
          <CardList items={items} />
          <Outlet />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </main>
  );
};

export default SearchResult;
