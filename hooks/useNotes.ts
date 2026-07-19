import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

const PER_PAGE = 12;

export const useNotes = (page: number, search: string) => {
  return useQuery({
    queryKey: ['notes', page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search,
      }),
  });
};
