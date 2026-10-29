import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'Red Científica Boliviana',
  description: 'Una red abierta para conectar a personas interesadas en la ciencia y la investigación relacionadas con Bolivia.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
