import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: 'quero_ler' | 'lendo' | 'lido';
  startDate?: string;
  endDate?: string;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const booksApi = {
  getAll: () => api.get<Book[]>('/books'),
  getById: (id: string) => api.get<Book>(`/books/${id}`),
  create: (book: Omit<Book, '_id' | 'createdAt' | 'updatedAt'>) => api.post<Book>('/books', book),
  update: (id: string, book: Partial<Book>) => api.put<Book>(`/books/${id}`, book),
  delete: (id: string) => api.delete(`/books/${id}`),
};