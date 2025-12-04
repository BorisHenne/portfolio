import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  MapPin,
  Download,
  Mail,
  Linkedin,
  Github,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

import { scrollToElement, downloadFile } from '../../utils';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import { FlipWords } from '../ui/FlipWords';
import { SparklesCore } from '../ui/SparklesCore';
import { Spotlight } from '../ui/Spotlight';
import { Button as MovingBorderButton } from '../ui/MovingBorder';

const techTags = [
  'SAP', 'ABAP', 'Fiori', 'Claude', 'GPT', 'React',
  'Make.com', 'Docker', 'Home Assistant', 'TypeScript'
];

const flipRoles = [
  'SAP Expert',
  'AI Enthusiast',
  'Full-Stack Developer',
  'Automation Architect',
];

function HeroComponent() {
  const { t, i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleContactClick = () => {
    scrollToElement('contact');
  };

  const handleCVDownload = () => {
    downloadFile('/cv-boris-henne.pdf', 'CV-Boris-Henne.pdf');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      {/* Subtle gradient orbs - CSS only, no animation on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 w-full h-full bg-dark-950 bg-grid-white/[0.02] pointer-events-none" />

      {/* Spotlight effect - desktop only */}
      {!isMobile && (
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="#00ff88"
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              {/* Ring border */}
              <div
                className="absolute inset-0 rounded-full p-[3px]"
                style={{ background: 'linear-gradient(135deg, #00ff88, #14b8a6, #22d3ee)' }}
              >
                <div className="w-full h-full rounded-full bg-dark-900" />
              </div>

              {/* Sparkles - desktop only */}
              {!isMobile && (
                <div className="absolute inset-[-20%] z-0">
                  <SparklesCore
                    className="w-full h-full"
                    particleColor="#00ff88"
                    particleDensity={30}
                    minSize={0.4}
                    maxSize={1}
                    speed={0.3}
                  />
                </div>
              )}

              {/* Image container */}
              <div className="absolute inset-2 sm:inset-3 rounded-full overflow-hidden border-2 border-dark-700 z-10">
                <img
                  src="/profile.jpg"
                  alt="Boris Henné"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%230f1a14" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2300ff88" font-size="32" font-family="monospace">BH</text></svg>';
                  }}
                />
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 z-20"
              >
                <div className="px-2.5 py-1 rounded-full bg-dark-800/95 backdrop-blur-sm border border-red-500/30">
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="text-red-400 uppercase tracking-wide text-[10px]">{t('hero.status')}</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 font-mono text-sm">
                {t('hero.greeting')}
              </span>
            </motion.div>

            {/* Name with Text Generate Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 tracking-tight">
                <TextGenerateEffect
                  words={t('hero.name')}
                  className="inline"
                  duration={0.8}
                />
              </h1>
            </motion.div>

            {/* Dynamic Role with FlipWords */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 h-12 flex items-center justify-center lg:justify-start"
            >
              <span className="text-gray-400 mr-2">{i18n.language === 'fr' ? "Je suis" : "I'm a"}</span>
              <FlipWords
                words={flipRoles}
                duration={3000}
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-cyan"
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-base sm:text-lg mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="inline-flex items-center gap-2 text-gray-400 mb-8 px-4 py-2 rounded-full bg-dark-800/50 border border-gray-700/30 backdrop-blur-sm"
            >
              <MapPin size={16} className="text-primary-500" />
              <span className="font-mono text-sm">{t('hero.location')}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8"
            >
              {/* MovingBorder button on desktop, simple button on mobile */}
              {!isMobile ? (
                <MovingBorderButton
                  onClick={handleContactClick}
                  borderRadius="0.5rem"
                  containerClassName="h-auto w-auto"
                  className="flex items-center gap-2 px-6 py-3 bg-primary-500/10 text-primary-400 font-semibold hover:bg-primary-500/20 transition-colors"
                  duration={3}
                >
                  <Mail size={18} />
                  {t('hero.cta')}
                </MovingBorderButton>
              ) : (
                <button
                  onClick={handleContactClick}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-dark-950 font-semibold hover:bg-primary-400 transition-colors"
                >
                  <Mail size={18} />
                  {t('hero.cta')}
                </button>
              )}

              <button
                onClick={handleCVDownload}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-dark-800/60 border border-dark-700/50 text-gray-300 hover:text-white hover:border-dark-600 transition-colors"
              >
                <Download size={18} />
                {t('hero.cv')}
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-2 mb-6"
            >
              <a
                href="https://www.linkedin.com/in/borishenne/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-dark-800/60 border border-dark-700/50 text-gray-400 hover:text-[#0077b5] hover:border-[#0077b5]/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/BorisHenne"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-dark-800/60 border border-dark-700/50 text-gray-400 hover:text-white hover:border-dark-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </motion.div>

            {/* Tech Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-1.5"
            >
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-dark-800/60 text-gray-400 border border-dark-700/50"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToElement('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 hover:text-primary-400 transition-colors p-2"
        aria-label="Scroll to content"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </button>
    </section>
  );
}

export default memo(HeroComponent);
