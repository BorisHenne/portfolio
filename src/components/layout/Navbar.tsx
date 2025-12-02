import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Shield } from 'lucide-react';

import { useUIStore, useLanguageStore, useAuthStore } from '../../stores/useStore';
import { useScrollPosition, useKeyPress } from '../../hooks';
import { cn, scrollToElement } from '../../utils';

const NAV_ITEMS = ['home', 'about', 'experience', 'skills', 'projects', 'contact'] as const;

function NavbarComponent() {
  const { t, i18n } = useTranslation();
  const isScrolled = useScrollPosition(50);
  const { isMenuOpen, activeSection, toggleMenu, closeMenu, setActiveSection } = useUIStore();
  const { language, setLanguage } = useLanguageStore();
  const { isAuthenticated } = useAuthStore();

  // Close menu on Escape
  useKeyPress('Escape', closeMenu);

  // Handle nav click
  const handleNavClick = useCallback(
    (sectionId: string) => {
      closeMenu();
      setActiveSection(sectionId);
      scrollToElement(sectionId);
    },
    [closeMenu, setActiveSection]
  );

  // Toggle language
  const toggleLanguage = useCallback(() => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
    void i18n.changeLanguage(newLang);
  }, [language, setLanguage, i18n]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMenu();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeMenu]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-dark-950/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="font-display font-bold text-xl lg:text-2xl text-white hover:text-primary-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-primary-500">&lt;</span>
            BH
            <span className="text-primary-500">/&gt;</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                  activeSection === item
                    ? 'text-primary-400 bg-primary-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {t(`nav.${item}`)}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
              aria-label={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
            >
              <Globe size={20} />
              <span className="sr-only">{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Admin indicator */}
            {isAuthenticated && (
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs">
                <Shield size={14} />
                <span>Admin</span>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-dark-900 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full pt-20 pb-8 px-6">
                <div className="flex flex-col gap-2">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-xl font-medium transition-all',
                        activeSection === item
                          ? 'text-primary-400 bg-primary-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {t(`nav.${item}`)}
                    </motion.button>
                  ))}
                </div>

                {/* Language switch in mobile */}
                <div className="mt-auto pt-8 border-t border-gray-800">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Globe size={20} />
                    <span>{language === 'fr' ? 'English' : 'Français'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(NavbarComponent);
