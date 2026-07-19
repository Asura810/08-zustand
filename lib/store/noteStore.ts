import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: {
    title: string;
    content: string;
    tag: string;
  };

  setDraft: (note: { title: string; content: string; tag: string }) => void;

  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialDraft,

      setDraft: note =>
        set(state => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),

      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: 'note-draft',

      partialize: state => ({
        draft: state.draft,
      }),
    }
  )
);
