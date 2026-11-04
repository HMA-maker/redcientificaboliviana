import './globals.css';
import type { Metadata } from 'next';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { ProfileModal } from '@/components/ProfileModal';

export const metadata: Metadata = {
  metadataBase: new URL('https://redcientificaboliviana.org'),
  title: {
    default: 'Red Científica Boliviana | Ciencia, Investigación y Comunidad',
    template: '%s | Red Científica Boliviana',
  },
  description: 'Red abierta y colaborativa para conectar a investigadores, científicos e instituciones de Bolivia y el mundo.',
  keywords: [
    'Red Científica Boliviana',
    'Ciencia en Bolivia',
    'Investigadores bolivianos',
    'Científicos de Bolivia',
    'Directorio científico Bolivia',
    'ORCID Bolivia',
    'Investigación científica',
    'Charlas científicas',
    'Universidades de Bolivia',
  ],
  authors: [
    { name: 'Julio Chávez' },
    { name: 'Kenji Shoji' },
    { name: 'Natalia Machaca' },
  ],
  creator: 'Red Científica Boliviana',
  publisher: 'Red Científica Boliviana',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: 'https://redcientificaboliviana.org',
    siteName: 'Red Científica Boliviana',
    title: 'Red Científica Boliviana | Ciencia, Investigación y Comunidad',
    description: 'Conectamos a quienes hacen y acompañan la ciencia relacionada con Bolivia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Red Científica Boliviana',
    description: 'Conectamos a quienes hacen y acompañan la ciencia relacionada con Bolivia.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ResearchOrganization',
      '@id': 'https://redcientificaboliviana.org/#organization',
      name: 'Red Científica Boliviana',
      alternateName: 'RCB',
      url: 'https://redcientificaboliviana.org',
      logo: 'https://redcientificaboliviana.org/favicon.svg',
      description: 'Red abierta para conectar a personas interesadas en la ciencia y la investigación relacionadas con Bolivia.',
      foundingLocation: {
        '@type': 'Place',
        name: 'Bolivia',
      },
      founder: [
        { '@type': 'Person', name: 'Julio Chávez' },
        { '@type': 'Person', name: 'Kenji Shoji' },
        { '@type': 'Person', name: 'Natalia Machaca' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://redcientificaboliviana.org/#website',
      url: 'https://redcientificaboliviana.org',
      name: 'Red Científica Boliviana',
      publisher: { '@id': 'https://redcientificaboliviana.org/#organization' },
      inLanguage: ['es-BO', 'en-US'],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue focus:text-white focus:rounded-lg focus:shadow-xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-white"
        >
          Saltar al contenido principal / Skip to main content
        </a>
        <LanguageProvider>
          <AuthProvider>
            {children}
            <AuthModal />
            <ProfileModal />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
