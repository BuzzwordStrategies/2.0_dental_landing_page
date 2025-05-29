import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { PricingProvider } from '../contexts/PricingContext';
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dental Lab Digital Survival - Stop Losing to Offshore Competition',
  description: '22% of dental labs have closed. Learn how digital marketing can save yours from offshore competition and DSO consolidation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PricingProvider>
          <ThemeProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
          </ThemeProvider>
        </PricingProvider>
      </body>
    </html>
  );
}
