'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { booksApi } from '@/lib/api';
import { FaStar, FaRegStar, FaEdit, FaTrash } from 'react-icons/fa';

interface Book {
  _id: string;
  title: string;
  author: string;
  startDate?: string;
  endDate?: string;
  status: 'lido' | 'lendo' | 'quero_ler';
  rating?: number;
}

export default function BookDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await booksApi.getById(id);
        setBook(response.data);
        setError('');
      } catch (err) {
        console.error('Erro ao buscar livro:', err);
        setError('Não foi possível carregar os dados do livro. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);
  
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await booksApi.delete(id);
      router.push('/');
    } catch (err) {
      console.error('Erro ao excluir livro:', err);
      setError('Não foi possível excluir o livro. Tente novamente mais tarde.');
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };
  
  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      lido: { label: 'Lido', color: 'bg-green-100 text-green-800' },
      lendo: { label: 'Lendo', color: 'bg-blue-100 text-blue-800' },
      quero_ler: { label: 'Quero Ler', color: 'bg-yellow-100 text-yellow-800' },
    };

    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informada';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const renderRating = (rating?: number) => {
    if (!rating) return 'Não avaliado';
    
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
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-primary hover:underline">
              &larr; Voltar para a coleção
            </Link>
          </div>
          <div className="card bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }
  
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="text-primary hover:underline">
              &larr; Voltar para a coleção
            </Link>
          </div>
          <div className="card">
            <p>Livro não encontrado.</p>
          </div>
        </div>
      </div>
    );
  }
  
  const status = getStatusLabel(book.status);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline">
            &larr; Voltar para a coleção
          </Link>
        </div>
        
        <div className="card">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-gray-600 mt-1">por {book.author}</p>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full ${status.color}`}>
              {status.label}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Informações</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span>{status.label}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Data de início:</span>
                  <span>{formatDate(book.startDate)}</span>
                </li>
                {book.status === 'lido' && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Data de término:</span>
                    <span>{formatDate(book.endDate)}</span>
                  </li>
                )}
              </ul>
            </div>
            
            {book.status === 'lido' && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Avaliação</h2>
                <div className="flex items-center">
                  {renderRating(book.rating)}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <Link href={`/books/${book._id}/edit`} className="btn-outline flex items-center gap-1">
              <FaEdit /> Editar
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
            >
              <FaTrash /> Excluir
            </button>
          </div>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Confirmar exclusão</h2>
            <p className="mb-6">Tem certeza que deseja excluir o livro "{book.title}"? Esta ação não pode ser desfeita.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-outline"
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-red-600 text-white hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? 'Excluindo...' : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}