import { useState } from 'react';

export const useRestoreSearchQuery = () => {
  const [storedSearchTerm] = useState(
    () => localStorage.getItem('searchTerm') || ''
  );

  return storedSearchTerm;
};
