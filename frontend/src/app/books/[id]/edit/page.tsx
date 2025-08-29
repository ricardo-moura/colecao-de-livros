'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { booksApi } from '@/lib/api';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface BookFormData {
  title: string;
  author: string;
  startDate: string;
  endDate?: string;
  status: 'lido' | 'lendo' | 'quero_ler';
  rating?: number;
}

export default function EditBook({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookFormData>();
  
  const watchStatus = watch('status');
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await booksApi.getById(id);
        const book = response.data;
        
        setValue('title', book.title);
        setValue('author', book.author);
        setValue('status', book.status);
        
        if (book.startDate) {
          setValue('startDate', new Date(book.startDate).toISOString().split('T')[0]);
        }
        
        if (book.endDate) {
          setValue('endDate', new Date(book.endDate).toISOString().split('T')[0]);
        }
        
        if (book.rating) {
          setRating(book.rating);
        }
        
        setError('');
      } catch (err) {
        console.error('Erro ao buscar livro:', err);
        setError('Não foi possível carregar os dados do livro. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, setValue]);
  
  const onSubmit = async (data: BookFormData) => {
    try {
      setSubmitting(true);
      setError('');
      
      const bookData = {
        ...data,
        rating,
      };
      
      await booksApi.update(id, bookData);
      router.push('/');
    } catch (err) {
      console.error('Erro ao atualizar livro:', err);
      setError('Não foi possível atualizar o livro. Tente novamente mais tarde.');
    } finally {
      setSubmitting(false);
    }
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline">
            &larr; Voltar para a coleção
          </Link>
          <h1 className="text-3xl font-bold mt-2">Editar livro</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="card">
          <div className="mb-4">
            <label htmlFor="title" className="form-label">Título *</label>
            <input
              id="title"
              type="text"
              className="form-input"
              {...register('title', { required: 'O título é obrigatório' })}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="author" className="form-label">Autor *</label>
            <input
              id="author"
              type="text"
              className="form-input"
              {...register('author', { required: 'O autor é obrigatório' })}
            />
            {errors.author && (
              <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="status" className="form-label">Status *</label>
            <select
              id="status"
              className="form-input"
              {...register('status', { required: 'O status é obrigatório' })}
            >
              <option value="quero_ler">Quero Ler</option>
              <option value="lendo">Lendo</option>
              <option value="lido">Lido</option>
            </select>
            {errors.status && (
              <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
          
          {(watchStatus === 'lendo' || watchStatus === 'lido') && (
            <div className="mb-4">
              <label htmlFor="startDate" className="form-label">
                Data de Início {watchStatus === 'lendo' || watchStatus === 'lido' ? '*' : ''}
              </label>
              <input
                id="startDate"
                type="date"
                className="form-input"
                {...register('startDate', {
                  required: watchStatus === 'lendo' || watchStatus === 'lido'
                    ? 'A data de início é obrigatória para livros que estão sendo lidos ou já foram lidos'
                    : false,
                })}
              />
              {errors.startDate && (
                <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>
              )}
            </div>
          )}
          
          {watchStatus === 'lido' && (
            <div className="mb-4">
              <label htmlFor="endDate" className="form-label">Data de Término</label>
              <input
                id="endDate"
                type="date"
                className="form-input"
                {...register('endDate')}
              />
            </div>
          )}
          
          {watchStatus === 'lido' && (
            <div className="mb-6">
              <label className="form-label">Avaliação</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= (rating || 0) ? (
                      <FaStar className="text-yellow-400" />
                    ) : (
                      <FaRegStar className="text-gray-300 hover:text-yellow-200" />
                    )}
                  </button>
                ))}
                {rating && (
                  <button
                    type="button"
                    onClick={() => setRating(undefined)}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <Link href="/" className="btn-outline">
              Cancelar
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}