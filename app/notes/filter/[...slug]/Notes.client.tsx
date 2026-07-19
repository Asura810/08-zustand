'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';

import css from './NotesPage.module.css';

export default function NotesClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        search: debouncedSearch,
        perPage: 9,
        tag,
      }),
    placeholderData: prev => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div className={css.wrapper}>
      <SearchBox onChange={setSearch} />

      <Link href="/notes/action/create" className={css.createButton}>
        Create note
      </Link>

      <NoteList notes={notes} />

      {totalPages > 1 && <Pagination page={page} pageCount={totalPages} setPage={setPage} />}
    </div>
  );
}
