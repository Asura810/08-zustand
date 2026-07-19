import css from './NoteList.module.css';
import type { Note } from '../../types/note';
import Link from 'next/link';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>

          <div className={css.footer}>
            <span>{note.tag}</span>

            <div>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>

              <button className={css.button} onClick={() => handleDelete(note.id)}>
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
