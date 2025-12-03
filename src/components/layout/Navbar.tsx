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
          <nav className="max-w-fit mx-auto px-1.5 py-1.5 rounded-2xl bg-dark-900/60 backdrop-blur-md border border-dark-700/50 shadow-xl shadow-dark-950/50">
            <div className="flex items-center gap-0.5">
              {/* Logo */}
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
                className="px-4 py-2 font-display font-bold text-lg text-white hover:text-primary-400 transition-colors"
              >
                <span className="text-primary-500">&lt;</span>
                BH
                <span className="text-primary-500">/&gt;</span>
              </a>

              {/* Divider */}
              <div className="w-px h-5 bg-dark-700/80 mx-1" />

              {/* Nav Items */}
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'relative px-3 py-2 rounded-xl font-medium text-sm transition-all duration-200',
                      isActive
                        ? 'text-dark-950 bg-primary-500'
                        : 'text-gray-400 hover:text-white hover:bg-dark-800/60'
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon size={15} />
                      {t(`nav.${item.id}`)}
                    </span>
                  </button>
                );
              })}

              {/* Divider */}
              <div className="w-px h-5 bg-dark-700/80 mx-1" />

              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-dark-800/60 transition-colors"
                aria-label={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
              >
                <Globe size={15} />
                <span className="text-sm font-medium uppercase">{language}</span>
              </button>

              {/* Admin indicator */}
              {isAuthenticated && (
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary-500/15 text-primary-400 text-xs">
                  <Shield size={13} />
                  <span>Admin</span>
                </div>
              )}
            </div>
          </nav>
        </motion.header>
      </AnimatePresence>

      {/* Mobile Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50 safe-area-top">
        <nav className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className="font-display font-bold text-lg text-white"
            >
              <span className="text-primary-500">&lt;</span>
              BH
              <span className="text-primary-500">/&gt;</span>
            </a>

            {/* Right side actions */}
            <div className="flex items-center gap-1">
              {/* Language toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
                aria-label={`Switch to ${language === 'fr' ? 'English' : 'Français'}`}
              >
                <Globe size={16} />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
                className="fixed inset-0 lg:hidden bg-dark-950/95 backdrop-blur-sm"
                style={{ zIndex: 9998 }}
                onClick={closeMenu}
              />

              {/* Menu panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-x-4 top-20 lg:hidden rounded-2xl bg-dark-900/95 backdrop-blur-md border border-dark-700/50 shadow-xl overflow-hidden"
                style={{ zIndex: 9999 }}
              >
                {/* Nav items */}
                <div className="p-2">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-colors',
                          isActive
                            ? 'text-dark-950 bg-primary-500'
                            : 'text-gray-400 hover:text-white hover:bg-dark-800/60'
                        )}
                      >
                        <Icon size={18} />
                        {t(`nav.${item.id}`)}
                      </button>
                    );
                  })}
                </div>

                {/* Divider */}
                <div className="h-px bg-dark-700/50 mx-4" />

                {/* Bottom actions */}
                <div className="p-2 flex items-center gap-2">
                  <button
                    onClick={toggleLanguage}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-dark-800/60 transition-colors"
                  >
                    <Globe size={16} />
                    <span className="text-sm font-medium">
                      {language === 'fr' ? 'English' : 'Français'}
                    </span>
                  </button>

                  {isAuthenticated && (
                    <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary-500/15 text-primary-400 text-sm">
                      <Shield size={14} />
                      <span>Admin</span>
                    </div>
                  )}
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
