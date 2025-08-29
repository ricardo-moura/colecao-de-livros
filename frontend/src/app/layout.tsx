import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Coleção de livros',
  description: 'Aplicação para gerenciar coleção de livros pessoais',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}