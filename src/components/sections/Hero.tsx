import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion';
import {
  MapPin,
  Download,
  Mail,
  Linkedin,
  Github,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

import { cn, scrollToElement, downloadFile } from '../../utils';

// Tech tags avec couleurs
const techTags = [
  { name: 'SAP', color: 'from-blue-500 to-blue-600' },
  { name: 'ABAP', color: 'from-orange-500 to-orange-600' },
  { name: 'Fiori', color: 'from-cyan-500 to-cyan-600' },
  { name: 'Claude', color: 'from-amber-500 to-amber-600' },
  { name: 'GPT', color: 'from-emerald-500 to-emerald-600' },
  { name: 'React', color: 'from-sky-500 to-sky-600' },
  { name: 'Make.com', color: 'from-purple-500 to-purple-600' },
  { name: 'Docker', color: 'from-blue-400 to-blue-500' },
  { name: 'Home Assistant', color: 'from-teal-500 to-teal-600' },
  { name: 'TypeScript', color: 'from-blue-600 to-blue-700' },
];

// Animation variants optimises
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      delay: 0.2,
    },
  },
};

function HeroComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleContactClick = () => {
    scrollToElement('contact');
  };

  const handleCVDownload = () => {
    downloadFile('/cv-boris-henne.pdf', 'CV-Boris-Henne.pdf');
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center pt-16 lg:pt-20 overflow-hidden"
    >
      {/* Background gradient animé */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
        <motion.div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-secondary-500/10 blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        style={{ y: smoothY, opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16"
        >
          {/* Profile Image avec effets */}
          <motion.div
            ref={imageRef}
            variants={imageVariants}
            className="relative group"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Cercles decoratifs animés */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-primary-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-primary-500/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glow effect pulsant */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-2xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Image container avec border animée */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #00ff88, #14b8a6, #00ff88)',
                    backgroundSize: '200% 200%',
                    padding: '3px',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-dark-900">
                    <img
                      src="/profile.jpg"
                      alt="Boris Henné"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Status badge avec animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-4 px-4 py-2 rounded-full bg-dark-900/90 backdrop-blur-sm border border-primary-500/30 shadow-lg shadow-primary-500/20"
              >
                <span className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full bg-green-500"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(34, 197, 94, 0.7)',
                        '0 0 0 8px rgba(34, 197, 94, 0)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                  <span className="text-gray-200">Disponible</span>
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.p
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-primary-400 font-mono text-sm sm:text-base mb-3"
            >
              <Sparkles size={16} className="animate-pulse" />
              {t('hero.greeting')}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 tracking-tight"
            >
              <span className="inline-block">{t('hero.name').split(' ')[0]}</span>{' '}
              <span className="inline-block text-gradient">{t('hero.name').split(' ')[1]}</span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-gradient mb-4"
            >
              {t('hero.title')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-base sm:text-lg mb-6 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 mb-6 sm:mb-8"
            >
              <MapPin size={18} className="text-primary-500" />
              <span className="text-sm sm:text-base">{t('hero.location')}</span>
            </motion.div>

            {/* CTA Buttons - Mobile optimisé */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <motion.button
                onClick={handleContactClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-dark-900 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400"
                  whileHover={{
                    background: 'linear-gradient(to right, #00cc6d, #00ff88)',
                  }}
                />
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  <Mail size={20} />
                  {t('hero.cta')}
                </span>
              </motion.button>

              <motion.button
                onClick={handleCVDownload}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-6 py-3.5 sm:py-3 rounded-xl font-semibold text-primary-400 border-2 border-primary-500/50 hover:border-primary-500 bg-primary-500/5 hover:bg-primary-500/10 transition-all"
              >
                <span className="relative flex items-center justify-center gap-2">
                  <Download size={20} className="group-hover:animate-bounce" />
                  {t('hero.cv')}
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6 sm:mb-8"
            >
              {[
                { href: 'https://www.linkedin.com/in/borishenne/', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com/BorisHenne', icon: Github, label: 'GitHub' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-dark-800/50 border border-primary-500/20 hover:border-primary-500/50 text-gray-400 hover:text-primary-400 transition-all hover:shadow-lg hover:shadow-primary-500/10"
                  aria-label={label}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>

            {/* Tech tags avec animations individuelles */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {techTags.map((tag, index) => (
                <motion.span
                  key={tag.name}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.8 + index * 0.05,
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs sm:text-sm font-mono cursor-default',
                    'bg-dark-800/80 border border-primary-500/20 text-gray-300',
                    'hover:border-primary-500/50 hover:text-primary-300 hover:shadow-md hover:shadow-primary-500/10',
                    'transition-colors'
                  )}
                >
                  {tag.name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator avec animation ameliorée */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => scrollToElement('about')}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-primary-400 transition-colors group"
        aria-label="Scroll vers le contenu"
      >
        <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.button>
    </section>
  );
}

export default memo(HeroComponent);
