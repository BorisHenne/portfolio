import { memo, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Globe, Shield, Home, User, Briefcase, FolderKanban, Mail } from 'lucide-react';
import { useState } from 'react';

import { useUIStore, useLanguageStore, useAuthStore } from '../../stores/useStore';
import { useKeyPress } from '../../hooks';
import { cn, scrollToElement } from '../../utils';

const NAV_ITEMS = [
  { id: 'home', icon: Home },
  { id: 'about', icon: User },
  { id: 'career', icon: Briefcase },
  { id: 'projects', icon: FolderKanban },
  { id: 'contact', icon: Mail },
] as const;

function NavbarComponent() {
  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { isMenuOpen, activeSection, toggleMenu, closeMenu, setActiveSection } = useUIStore();
  const { language, setLanguage } = useLanguageStore();
  const { isAuthenticated } = useAuthStore();

  // Handle scroll to show/hide navbar
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - lastScrollY;

      if (current < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
      setLastScrollY(current);
    }
  });

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
    <>
      {/* Floating Navbar - Desktop */}
      <AnimatePresence mode="wait">
        <motion.header
          initial={{ opacity: 1, y: -100 }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 inset-x-0 mx-auto z-50 hidden lg:block"
        >
          <nav className="max-w-fit mx-auto px-2 py-2 rounded-full bg-dark-950/70 backdrop-blur-xl border border-primary-500/10 shadow-lg shadow-primary-500/5">
            <div className="flex items-center gap-1">
              {/* Logo */}
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
                className="px-4 py-2 font-display font-bold text-lg text-white hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-primary-500">&lt;</span>
                BH
                <span className="text-primary-500">/&gt;</span>
              </motion.a>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-700/50 mx-2" />

              {/* Nav Items */}
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-200',
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <Icon size={16} />
                      {t(`nav.${item.id}`)}
                    </span>
                  </motion.button>
                );
              })}

              {/* Divider */}
              <div className="w-px h-6 bg-gray-700/50 mx-2" />

              {/* Language toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                aria-label={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} />
                <span className="text-sm font-medium uppercase">{language}</span>
              </motion.button>

              {/* Admin indicator */}
              {isAuthenticated && (
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-xs">
                  <Shield size={14} />
                  <span>Admin</span>
                </div>
              )}
            </div>
          </nav>
        </motion.header>
      </AnimatePresence>

      {/* Mobile Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-dark-950/80 backdrop-blur-xl border-b border-gray-800/50">
        <nav className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="font-display font-bold text-xl text-white hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-primary-500">&lt;</span>
              BH
              <span className="text-primary-500">/&gt;</span>
            </motion.a>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                aria-label={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
              >
                <Globe size={18} />
                <span className="text-sm font-medium uppercase">{language}</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation - rendered via Portal to escape stacking context */}
      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 lg:hidden"
                style={{ backgroundColor: '#0a0f0d', zIndex: 9998 }}
                onClick={closeMenu}
              />

              {/* Menu panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm shadow-2xl lg:hidden"
                style={{ backgroundColor: '#151816', zIndex: 9999 }}
              >
                <div className="flex flex-col h-full pt-20 pb-8 px-6">
                  <div className="flex flex-col gap-2">
                    {NAV_ITEMS.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleNavClick(item.id)}
                          className={cn(
                            'w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3',
                            activeSection === item.id
                              ? 'text-primary-400 bg-primary-500/10'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          )}
                        >
                          <Icon size={20} />
                          {t(`nav.${item.id}`)}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Admin indicator */}
                  {isAuthenticated && (
                    <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-500/10 text-primary-400">
                      <Shield size={18} />
                      <span>Mode Admin activé</span>
                    </div>
                  )}

                  {/* Language switch in mobile */}
                  <div className="mt-auto pt-8 border-t border-gray-800">
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <Globe size={20} />
                      <span>{language === 'fr' ? 'Switch to English' : 'Passer en Français'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default memo(NavbarComponent);
