import { memo, useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import {
  Music,
  Home,
  Brain,
  Zap,
  Code,
  Calendar,
  FolderGit2,
  Award,
  MapPin,
  Play,
  ArrowRight,
} from 'lucide-react';

import { scrollToElement } from '../../utils';
import { CardContainer, CardBody, CardItem } from '../ui/Card3D';

// Colors correlated with skills categories - with link to skill tab
const interests = [
  { key: 'dev', icon: Code, color: '#00ff88', skillTab: 'sap' },           // Links to SAP (main dev skill)
  { key: 'ai', icon: Brain, color: '#a855f7', skillTab: 'ai' },            // Links to AI & LLM
  { key: 'automation', icon: Zap, color: '#fbbf24', skillTab: 'automation' }, // Links to Automation
  { key: 'domotics', icon: Home, color: '#18bcf2', skillTab: 'frontend' }, // Links to Frontend (React/TS)
  { key: 'music', icon: Music, color: '#ec4899', skillTab: null },         // No link (unique passion)
];

const stats = [
  { key: 'years', value: '12+', icon: Calendar },
  { key: 'projects', value: '50+', icon: FolderGit2 },
  { key: 'certifications', value: '30+', icon: Award },
];

const techEdTags = ['SAP Joule', 'ABAP-1', 'SAP AI Core', 'Generative AI', 'Clean Core'];

function AboutComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isVideoInView = useInView(videoContainerRef, { amount: 0.6 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Autoplay video when in view with 20% volume
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoInView) {
      video.volume = 0.2;
      video.play().catch(() => {
        // Autoplay blocked by browser, user needs to interact
      });
    } else {
      video.pause();
    }
  }, [isVideoInView]);

  return (
    <section ref={ref} id="about" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900/50 to-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('about.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed">
              {t('about.intro')}
            </p>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {!isMobile ? (
                    <CardContainer containerClassName="w-full">
                      <CardBody className="w-full h-auto glass-card rounded-xl p-3 sm:p-5 text-center group/card">
                        <CardItem translateZ={30} className="w-full">
                          <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 mx-auto mb-2 text-primary-500" />
                        </CardItem>
                        <CardItem translateZ={50} className="w-full">
                          <div className="text-xl sm:text-3xl font-bold text-white">{stat.value}</div>
                        </CardItem>
                        <CardItem translateZ={20} className="w-full">
                          <div className="text-xs sm:text-sm text-gray-500">{t(`about.${stat.key}`)}</div>
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  ) : (
                    <div className="glass-card rounded-xl p-3 sm:p-5 text-center">
                      <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 mx-auto mb-2 text-primary-500" />
                      <div className="text-xl sm:text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{t(`about.${stat.key}`)}</div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
              {t('about.interests')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {interests.map((interest, index) => {
                const handleClick = () => {
                  if (interest.skillTab) {
                    sessionStorage.setItem('careerTab', 'skills');
                    sessionStorage.setItem('skillHighlight', interest.skillTab);
                    scrollToElement('career');
                  }
                };

                return (
                  <motion.div
                    key={interest.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    onClick={handleClick}
                    className={`rounded-lg p-3 flex items-center gap-2.5 bg-dark-800/60 border border-dark-700/50 transition-colors hover:border-dark-600 ${
                      interest.skillTab ? 'cursor-pointer hover:bg-dark-800/80' : ''
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${interest.color}15` }}
                    >
                      <interest.icon size={16} style={{ color: interest.color }} />
                    </div>
                    <span className="text-sm text-gray-300">
                      {t(`about.interestsList.${interest.key}`)}
                    </span>
                    {interest.skillTab && (
                      <ArrowRight size={14} className="ml-auto text-gray-600" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* SAP TechEd 2025 Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-14"
        >
          <div className="rounded-xl p-5 sm:p-6 lg:p-8 bg-dark-800/60 border border-dark-700/50">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Video Container */}
              <div ref={videoContainerRef} className="lg:w-1/2">
                <div className="relative rounded-xl overflow-hidden bg-dark-900 aspect-video group">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    poster="/videos/sap-teched-poster.jpg"
                    playsInline
                    muted={false}
                  >
                    <source
                      src="/videos/sap-teched-2025.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play overlay hint */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-dark-900/80 flex items-center justify-center">
                      <Play size={20} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-400 font-mono">SAP</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {t('teched.eventTitle')}
                    </h3>
                    <div className="flex items-center gap-1 text-primary-400 text-sm mt-0.5">
                      <MapPin size={14} />
                      <span>{t('teched.location')}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {t('teched.description')}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {techEdTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-md bg-primary-500/10 text-primary-400 border border-primary-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(AboutComponent);
