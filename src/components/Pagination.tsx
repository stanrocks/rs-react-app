import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const maxVisibleMiddlePages = 5;
const sidePages = 2;

const shouldShowEllipsisBefore = (currentPage: number) =>
  currentPage > sidePages + 2;

const shouldShowEllipsisAfter = (currentPage: number, totalPages: number) =>
  currentPage < totalPages - sidePages - 1;

const generatePageNumbers = (currentPage: number, totalPages: number) => {
  if (totalPages <= maxVisibleMiddlePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];

  if (shouldShowEllipsisBefore(currentPage)) {
    pages.push('...');
  }

  const startPage = Math.max(2, currentPage - sidePages);
  const endPage = Math.min(totalPages - 1, currentPage + sidePages);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (shouldShowEllipsisAfter(currentPage, totalPages)) {
    pages.push('...');
  }

  pages.push(totalPages);

  return pages;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = generatePageNumbers(currentPage, totalPages);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pageNumbers.map((pageNumber, index) => (
          <li key={index} className="pagination-item">
            {pageNumber === '...' ? (
              <span className="pagination-ellipsis">…</span>
            ) : (
              <button
                className={`pagination-item-button ${
                  currentPage === pageNumber ? 'active' : ''
                }`}
                onClick={() => onPageChange(pageNumber as number)}
              >
                {pageNumber}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
