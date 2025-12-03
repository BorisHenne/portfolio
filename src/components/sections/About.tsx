import { memo, useRef, useEffect } from 'react';
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

// Colors correlated with skills categories - with link to skill tab
const interests = [
  { key: 'dev', icon: Code, color: '#00ff88', skillTab: 'frontend' },     // Links to Frontend
  { key: 'ai', icon: Brain, color: '#a855f7', skillTab: 'ai' },            // Links to AI & LLM
  { key: 'automation', icon: Zap, color: '#fbbf24', skillTab: 'automation' }, // Links to Automation
  { key: 'domotics', icon: Home, color: '#18bcf2', skillTab: 'tools' },    // Links to Tools
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
    <section ref={ref} id="about" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="w-20 sm:w-28 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
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
                  className="glass-card rounded-xl p-3 sm:p-5 text-center"
                >
                  <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 mx-auto mb-2 text-primary-500" />
                  <div className="text-xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{t(`about.${stat.key}`)}</div>
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
            <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4 sm:mb-6">
              {t('about.interests')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interests.map((interest, index) => {
                const handleClick = () => {
                  if (interest.skillTab) {
                    // Store the tab to activate in sessionStorage
                    sessionStorage.setItem('skillTab', interest.skillTab);
                    scrollToElement('skills');
                  }
                };

                return (
                  <motion.div
                    key={interest.key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    onClick={handleClick}
                    className={`glass-card rounded-xl p-3 sm:p-4 flex flex-col items-center text-center gap-2 sm:gap-3 group hover:scale-105 transition-all duration-300 ${
                      interest.skillTab ? 'cursor-pointer' : ''
                    }`}
                    style={{ borderColor: `${interest.color}30` }}
                  >
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ backgroundColor: `${interest.color}15`, border: `1px solid ${interest.color}40` }}
                    >
                      <interest.icon
                        size={24}
                        style={{ color: interest.color }}
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
                      {t(`about.interestsList.${interest.key}`)}
                    </span>
                    {/* Arrow indicator for linked skills */}
                    {interest.skillTab && (
                      <ArrowRight
                        size={14}
                        className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* SAP TechEd 2025 Section - Integrated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 sm:mt-16 lg:mt-20"
        >
          <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 lg:p-10 border-primary-500/30">
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
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-500/80 flex items-center justify-center backdrop-blur-sm">
                      <Play size={32} className="text-dark-950 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 flex flex-col justify-center">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center border border-primary-500/30 flex-shrink-0">
                    <span className="text-xl sm:text-2xl font-bold text-primary-400 font-mono">SAP</span>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-display">
                      {t('teched.eventTitle')}
                    </h3>
                    <div className="flex items-center gap-1.5 text-primary-400 text-sm sm:text-base mt-1">
                      <MapPin size={16} />
                      <span>{t('teched.location')}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-5 sm:mb-6">
                  {t('teched.description')}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {techEdTags.map((tag, index) => (
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
