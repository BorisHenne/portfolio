import { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLanguageStore } from './stores/useStore';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy load sections pour code splitting optimal
const Navbar = lazy(() => import('./components/layout/Navbar'));
const Hero = lazy(() => import('./components/sections/Hero'));
const About = lazy(() => import('./components/sections/About'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Education = lazy(() => import('./components/sections/Education'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ScrollToTop = lazy(() => import('./components/ui/ScrollToTop'));
const AdminModal = lazy(() => import('./components/admin/AdminModal'));

// Loading fallback optimisé
function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  const { language } = useLanguageStore();
  const [isReady, setIsReady] = useState(false);

  // Sync language with i18n
  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language, i18n]);

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-dark-950 transition-opacity duration-500 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Grid pattern background */}
      <div className="fixed inset-0 bg-grid opacity-50 pointer-events-none" />

      {/* Gradient orbs for ambiance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>

        <main>
          <Suspense fallback={<SectionLoader />}>
            <Hero />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Education />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        <Suspense fallback={null}>
          <AdminModal />
        </Suspense>
      </div>
    </div>
  );
}
