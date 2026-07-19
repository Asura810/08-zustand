import axios from 'axios';
import type { Note } from '@/types/note';

const API_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
}
export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>('/notes', {
    params,
  });

  return response.data;
};

export const getNotes = (
  params: FetchNotesParams = {
    page: 1,
    perPage: 9,
    search: '',
  }
) => {
  return fetchNotes({
    page: params.page,
    perPage: params.perPage ?? 9,
    search: params.search ?? '',
    tag: params.tag,
  });
};

export const createNote = async (note: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};
