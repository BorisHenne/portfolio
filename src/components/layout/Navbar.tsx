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
              {/* Backdrop with blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 lg:hidden backdrop-blur-xl"
                style={{ backgroundColor: 'rgba(10, 15, 13, 0.95)', zIndex: 9998 }}
                onClick={closeMenu}
              />

              {/* Full screen menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 lg:hidden flex flex-col items-center justify-center"
                style={{ zIndex: 9999 }}
              >
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ delay: 0.1 }}
                  onClick={closeMenu}
                  className="absolute top-4 right-4 p-3 rounded-full bg-dark-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-primary-500/30 transition-all"
                >
                  <X size={24} />
                </motion.button>

                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8"
                >
                  <span className="font-display font-bold text-3xl text-white">
                    <span className="text-primary-500">&lt;</span>
                    BH
                    <span className="text-primary-500">/&gt;</span>
                  </span>
                </motion.div>

                {/* Nav container - pill style like desktop */}
                <motion.nav
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="px-3 py-3 rounded-3xl bg-dark-900/80 border border-primary-500/10 shadow-lg shadow-primary-500/5"
                >
                  <div className="flex flex-col gap-1">
                    {NAV_ITEMS.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          onClick={() => handleNavClick(item.id)}
                          className={cn(
                            'relative px-6 py-3 rounded-2xl font-medium text-base transition-all duration-200 min-w-[200px]',
                            activeSection === item.id
                              ? 'text-white'
                              : 'text-gray-400'
                          )}
                        >
                          {activeSection === item.id && (
                            <motion.div
                              layoutId="mobile-nav-active"
                              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-3">
                            <Icon size={20} />
                            {t(`nav.${item.id}`)}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.nav>

                {/* Bottom actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex items-center gap-3"
                >
                  {/* Language toggle */}
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-dark-800/50 border border-gray-700/50 text-gray-400 hover:text-primary-400 hover:border-primary-500/30 transition-all"
                  >
                    <Globe size={18} />
                    <span className="text-sm font-medium">
                      {language === 'fr' ? 'English' : 'Français'}
                    </span>
                  </button>

                  {/* Admin indicator */}
                  {isAuthenticated && (
                    <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400">
                      <Shield size={18} />
                      <span className="text-sm font-medium">Admin</span>
                    </div>
                  )}
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary-500/5 rounded-full blur-3xl pointer-events-none" />
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
