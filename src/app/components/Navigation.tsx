'use client';

import { useTheme } from '../providers/ThemeProvider';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link href="https://www.buzzwordstrategies.com" className="flex items-center gap-3">
              <Image 
                src="https://images.squarespace-cdn.com/content/v1/673fc8d414047c5c20a42e65/ab4663d3-4840-47f0-88cf-a5b1144ed31a/Remove+background+project+%281%29.png?format=300w"
                alt="Buzzword Strategies"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="https://www.buzzwordstrategies.com" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="https://www.buzzwordstrategies.com/blog" 
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-surface/50 hover:bg-surface transition-colors backdrop-blur-sm"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
