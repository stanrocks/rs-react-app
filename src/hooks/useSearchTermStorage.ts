import { useState } from 'react';

export const useSearchTermStorage = () => {
  const [storedSearchTerm, setStoredSearchTerm] = useState(
    () => localStorage.getItem('searchTerm') || ''
  );

  const updateStoredSearchTerm = (newSearchTerm: string) => {
    localStorage.setItem('searchTerm', newSearchTerm);
    setStoredSearchTerm(newSearchTerm);
  };

  return [storedSearchTerm, updateStoredSearchTerm] as const;
};
