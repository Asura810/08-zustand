'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({ pageCount, page, setPage }: PaginationProps) {
  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
    />
  );
}
