import { memo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Download,
  Mail,
  Linkedin,
  Github,
  ChevronDown,
} from 'lucide-react';

import { scrollToElement, downloadFile } from '../../utils';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const techTags = [
  'SAP', 'ABAP', 'Fiori', 'Claude', 'GPT', 'React',
  'Make.com', 'Docker', 'Home Assistant', 'TypeScript'
];

// Mobile-first responsive sizes
const PROFILE_SIZES = {
  mobile: 'w-32 h-32',
  sm: 'sm:w-48 sm:h-48',
  lg: 'lg:w-64 lg:h-64',
};

function HeroComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    createParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      className="relative min-h-screen flex items-center justify-center pt-14 sm:pt-16 lg:pt-20 overflow-hidden"
    >
      {/* Particle Canvas - hidden on mobile for performance */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 hidden sm:block"
        style={{ opacity: 0.6 }}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-30 sm:opacity-50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row items-center gap-6 sm:gap-12 lg:gap-16"
        >
          {/* Profile Image - optimisé mobile */}
          <motion.div variants={itemVariants} className="relative flex-shrink-0">
            <div className={`relative ${PROFILE_SIZES.mobile} ${PROFILE_SIZES.sm} ${PROFILE_SIZES.lg}`}>
              {/* Glow effect - réduit sur mobile */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-15 sm:opacity-20 blur-xl sm:blur-2xl animate-pulse" />

              {/* Border ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-500/40 sm:border-primary-500/50" />

              {/* Image container */}
              <div className="absolute inset-1.5 sm:inset-2 rounded-full overflow-hidden border-2 sm:border-4 border-dark-950">
                <img
                  src="/profile.jpg"
                  alt="Boris Henné"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%230a0f0d" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2300ff88" font-size="32" font-family="monospace">BH</text></svg>';
                  }}
                />
              </div>

              {/* Decorative elements - hidden on mobile */}
              <motion.div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-5 h-5 sm:w-8 sm:h-8 border-2 border-primary-500 rounded-full hidden sm:block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary-500/30 rounded-full hidden sm:block"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Status badge - compact sur mobile */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-0.5 -right-0.5 sm:-bottom-2 sm:-right-2 px-2 py-0.5 sm:px-3 sm:py-1.5 rounded-full bg-dark-900/95 backdrop-blur-sm border border-red-500/40 shadow-lg shadow-red-500/10"
              >
                <span className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500" />
                  <span className="text-red-400 uppercase tracking-wide">{t('hero.status')}</span>
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - typographie améliorée mobile */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.p
              variants={itemVariants}
              className="text-primary-400 font-mono text-xs sm:text-sm mb-2 sm:mb-3"
            >
              <span className="opacity-60">{'>'}</span> {t('hero.greeting')}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 tracking-tight"
            >
              {t('hero.name')}
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-base sm:text-xl lg:text-2xl font-semibold text-gradient mb-2 sm:mb-3 leading-tight"
            >
              {t('hero.title')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-sm sm:text-base lg:text-lg mb-4 sm:mb-5 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-gray-400 mb-5 sm:mb-6 px-3 py-1.5 rounded-full bg-dark-800/50 border border-gray-700/30"
            >
              <MapPin size={14} className="text-primary-500 sm:w-4 sm:h-4" />
              <span className="font-mono text-xs sm:text-sm">{t('hero.location')}</span>
            </motion.div>

            {/* CTA Buttons - grid mobile, flex desktop */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 mb-5 sm:mb-6"
            >
              <button
                onClick={handleContactClick}
                className="btn-primary flex items-center gap-2 justify-center text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-8 touch-manipulation"
              >
                <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>{t('hero.cta')}</span>
              </button>
              <button
                onClick={handleCVDownload}
                className="btn-secondary flex items-center gap-2 justify-center text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-8 touch-manipulation"
              >
                <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>{t('hero.cv')}</span>
              </button>
            </motion.div>

            {/* Social Links + Tech tags - combined row on mobile */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-5 sm:mb-6"
            >
              <a
                href="https://www.linkedin.com/in/borishenne/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-xl bg-dark-800/60 border border-gray-700/40 text-gray-400 hover:text-primary-400 hover:border-primary-500/40 active:text-primary-400 transition-all touch-manipulation"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://github.com/BorisHenne"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-xl bg-dark-800/60 border border-gray-700/40 text-gray-400 hover:text-primary-400 hover:border-primary-500/40 active:text-primary-400 transition-all touch-manipulation"
                aria-label="GitHub"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
              </a>
            </motion.div>

            {/* Tech tags - wrap with gap, no scroll */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-1.5 sm:gap-2"
            >
              {techTags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.03 }}
                  className="px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-sm font-mono bg-primary-500/10 text-primary-400 border border-primary-500/20 whitespace-nowrap"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => scrollToElement('about')}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-primary-400 active:text-primary-400 transition-colors p-2"
        aria-label="Scroll vers le contenu"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </motion.button>
    </section>
  );
}

export default memo(HeroComponent);
