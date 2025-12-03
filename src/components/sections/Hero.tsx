import { memo } from 'react';
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
import { Spotlight } from '../ui/Spotlight';
import { TextGenerateEffect } from '../ui/TextGenerateEffect';
import { FlipWords } from '../ui/FlipWords';
import { SparklesCore } from '../ui/SparklesCore';
import { BackgroundBeams } from '../ui/BackgroundBeams';
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
      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#00ff88"
      />
      <Spotlight
        className="top-10 left-full -translate-x-[50%] h-[80vh] w-[50vw]"
        fill="#14b8a6"
      />

      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full bg-dark-950 bg-grid-white/[0.02] pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-dark-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Background Beams */}
      <BackgroundBeams className="opacity-40" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">

          {/* Profile Image with Sparkles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #00ff88, #14b8a6, #22d3ee, #00ff88)',
                  padding: '3px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-full bg-dark-950" />
              </motion.div>

              {/* Sparkles around image */}
              <div className="absolute inset-[-20%] z-0">
                <SparklesCore
                  className="w-full h-full"
                  particleColor="#00ff88"
                  particleDensity={40}
                  minSize={0.4}
                  maxSize={1.2}
                  speed={0.5}
                />
              </div>

              {/* Image container */}
              <div className="absolute inset-2 sm:inset-3 rounded-full overflow-hidden border-2 border-dark-800 z-10">
                <img
                  src="/profile.jpg"
                  alt="Boris Henné"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%230a0f0d" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2300ff88" font-size="32" font-family="monospace">BH</text></svg>';
                  }}
                />
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 z-20"
              >
                <div className="px-3 py-1.5 rounded-full bg-dark-900/95 backdrop-blur-sm border border-red-500/40 shadow-lg shadow-red-500/20">
                  <span className="flex items-center gap-1.5 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500" />
                    <span className="text-red-400 uppercase tracking-wide">{t('hero.status')}</span>
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
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <MovingBorderButton
                borderRadius="1.5rem"
                className="px-8 py-4 text-white font-semibold"
                onClick={handleContactClick}
                as="button"
              >
                <Mail className="w-5 h-5 mr-2" />
                {t('hero.cta')}
              </MovingBorderButton>

              <button
                onClick={handleCVDownload}
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-dark-800/50 border border-gray-700/50 text-gray-300 hover:text-white hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-300"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                <span className="font-semibold">{t('hero.cv')}</span>
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <a
                href="https://www.linkedin.com/in/borishenne/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-dark-800/60 border border-gray-700/40 text-gray-400 hover:text-[#0077b5] hover:border-[#0077b5]/40 hover:bg-[#0077b5]/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://github.com/BorisHenne"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-dark-800/60 border border-gray-700/40 text-gray-400 hover:text-white hover:border-gray-500/40 hover:bg-gray-500/10 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
            </motion.div>

            {/* Tech Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {techTags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 rounded-full text-xs font-mono bg-primary-500/10 text-primary-400 border border-primary-500/20 hover:bg-primary-500/20 hover:border-primary-500/40 transition-all duration-200 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        onClick={() => scrollToElement('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-primary-400 transition-colors p-2 group"
        aria-label="Scroll to content"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} className="group-hover:text-primary-400" />
        </motion.div>
      </motion.button>
    </section>
  );
}

export default memo(HeroComponent);
