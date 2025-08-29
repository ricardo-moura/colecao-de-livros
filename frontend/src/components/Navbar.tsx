'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBook } from 'react-icons/fa';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <FaBook />
            <span>Coleção de livros</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Minha coleção
            </Link>
            <Link 
              href="/books/new" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/books/new' ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Adicionar livro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}