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
      className="relative min-h-screen flex items-center justify-center pt-16 lg:pt-20 overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Profile Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20 blur-2xl animate-pulse" />

              {/* Border ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-500/50 animate-pulse" />

              {/* Image container */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-dark-950">
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

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 border-2 border-primary-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary-500/30 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Status badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-2 -right-2 px-4 py-2 rounded-full bg-dark-900 border border-primary-500/30 shadow-lg"
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-gray-300">Disponible</span>
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              variants={itemVariants}
              className="text-primary-400 font-mono text-sm sm:text-base mb-2"
            >
              {'>'} {t('hero.greeting')}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4"
            >
              {t('hero.name')}
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-medium text-gradient mb-4"
            >
              {t('hero.title')}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg mb-6"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 mb-8"
            >
              <MapPin size={18} className="text-primary-500" />
              <span className="font-mono text-sm">{t('hero.location')}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <button
                onClick={handleContactClick}
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Mail size={20} />
                {t('hero.cta')}
              </button>
              <button
                onClick={handleCVDownload}
                className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Download size={20} />
                {t('hero.cv')}
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="https://www.linkedin.com/in/borishenne/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card-hover text-gray-400 hover:text-primary-400 transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href="https://github.com/BorisHenne"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card-hover text-gray-400 hover:text-primary-400 transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
            </motion.div>

            {/* Tech tags */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {techTags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="tag"
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
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={() => scrollToElement('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-primary-400 transition-colors"
        aria-label="Scroll vers le contenu"
      >
        <ChevronDown size={32} className="animate-bounce" />
      </motion.button>
    </section>
  );
}

export default memo(HeroComponent);
