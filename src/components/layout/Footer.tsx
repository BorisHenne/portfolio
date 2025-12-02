import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Code } from 'lucide-react';

function FooterComponent() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="#home"
            className="font-display font-bold text-xl text-white hover:text-primary-400 transition-colors"
          >
            <span className="text-primary-500">&lt;</span>
            BH
            <span className="text-primary-500">/&gt;</span>
          </a>

          {/* Made with */}
          <p className="flex items-center gap-2 text-sm text-gray-500">
            {t('footer.madeWith')}
            <Heart size={14} className="text-red-500 fill-red-500" />
            {t('footer.and')}
            <Code size={14} className="text-primary-500" />
          </p>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {currentYear} Boris Henné. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(FooterComponent);
