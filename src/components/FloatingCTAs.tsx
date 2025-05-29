'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

export default function FloatingCTAs() {
  const [showBlogBar, setShowBlogBar] = useState(false);
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    // Show blog bar after 3 seconds
    const timer = setTimeout(() => {
      setShowBlogBar(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const openCalendly = () => {
    if (calendlyLoaded && window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/josh-buzzwordstrategies/discovery-call',
        text: 'Book 15-Min Call with Founder',
        color: '#f59e0b',
        textColor: '#ffffff',
        branding: false
      });
    }
  };

  return (
    <>
      {/* Calendly Script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setCalendlyLoaded(true)}
      />
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      {/* Right Float - Calendly Button */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openCalendly}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="hidden lg:inline">Book 15-Min Call</span>
          <span className="lg:hidden">Call</span>
        </motion.button>
      </motion.div>

      {/* Left Float - SEO Audit Badge */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50"
      >
        <motion.a
          href="#seo-audit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative block"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(251, 191, 36, 0.4)",
                "0 0 0 20px rgba(251, 191, 36, 0)",
                "0 0 0 0 rgba(251, 191, 36, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span className="hidden lg:inline">Free AI SEO Audit</span>
            <span className="lg:hidden">SEO</span>
          </motion.div>
          
          {/* "FREE" badge */}
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            FREE
          </span>
        </motion.a>
      </motion.div>

      {/* Bottom Float Bar - Blog Generator */}
      <AnimatePresence>
        {showBlogBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
          >
            <div className="max-w-4xl mx-auto">
              <motion.a
                href="#blog-generator"
                whileHover={{ scale: 1.02 }}
                className="block bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-4 relative overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-30"
                  animate={{
                    x: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        Free AI Blog Post Generator
                      </h3>
                      <p className="text-sm opacity-90">
                        Generate SEO-optimized content for your dental lab in seconds
                      </p>
                    </div>
                  </div>
                  
                  <button
                    className="bg-white text-purple-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '#blog-generator';
                    }}
                  >
                    Try Now
                  </button>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Add to window type for Calendly
declare global {
  interface Window {
    Calendly: any;
  }
}
