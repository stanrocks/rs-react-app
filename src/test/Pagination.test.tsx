import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { describe, it, expect, vi } from 'vitest';

describe('Pagination', () => {
  it('does not render when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination with multiple pages', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByLabelText('Page navigation')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights the current page', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={() => {}} />
    );
    const activePage = screen.getByText('2');
    expect(activePage).toHaveClass('active');
  });

  it('shows ellipses when needed', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
    );
    expect(screen.getAllByText('…')).toHaveLength(2);
  });

  it('calls onPageChange when a page is clicked', () => {
    const onPageChangeMock = vi.fn();
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const page4Button = screen.getByText('4');
    fireEvent.click(page4Button);

    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });
});
