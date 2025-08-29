'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { booksApi } from '@/lib/api';
import { FaPlus, FaStar, FaRegStar } from 'react-icons/fa';

interface Book {
  _id: string;
  title: string;
  author: string;
  status: 'lido' | 'lendo' | 'quero_ler';
  rating?: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await booksApi.getAll();
        setBooks(response.data);
        setError('');
      } catch (err) {
        console.error('Erro ao buscar livros:', err);
        setError('Não foi possível carregar os livros. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      lido: { label: 'Lido', color: 'bg-green-100 text-green-800' },
      lendo: { label: 'Lendo', color: 'bg-blue-100 text-blue-800' },
      quero_ler: { label: 'Quero Ler', color: 'bg-yellow-100 text-yellow-800' },
    };

    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
  };

  const renderRating = (rating?: number) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < rating ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaRegStar className="text-gray-300" />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Minha coleção de livros</h1>
        <Link href="/books/new" className="btn-primary flex items-center gap-2">
          <FaPlus /> Adicionar livro
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="card bg-red-50 border border-red-200 text-red-700 p-4">
          {error}
        </div>
      ) : books.length === 0 ? (
        <div className="card text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Sua coleção está vazia</h2>
          <p className="text-gray-600 mb-6">Comece adicionando seu primeiro livro à coleção.</p>
          <Link href="/books/new" className="btn-primary inline-flex items-center gap-2">
            <FaPlus /> Adicionar livro
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => {
            const status = getStatusLabel(book.status);
            
            return (
              <div key={book._id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{book.title}</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">por {book.author}</p>
                {renderRating(book.rating)}
                <div className="flex justify-end gap-2 mt-4">
                  <Link href={`/books/${book._id}`} className="btn-outline text-sm">
                    Detalhes
                  </Link>
                  <Link href={`/books/${book._id}/edit`} className="btn-outline text-sm">
                    Editar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}