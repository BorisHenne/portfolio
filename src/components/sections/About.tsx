import { memo, useRef } from 'react';
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
} from 'lucide-react';

import { cn } from '../../utils';

const interests = [
  { key: 'music', icon: Music, color: '#ec4899' },
  { key: 'domotics', icon: Home, color: '#18bcf2' },
  { key: 'ai', icon: Brain, color: '#a855f7' },
  { key: 'automation', icon: Zap, color: '#fbbf24' },
  { key: 'dev', icon: Code, color: '#00ff88' },
];

const stats = [
  { key: 'years', value: '12+', icon: Calendar },
  { key: 'projects', value: '50+', icon: FolderGit2 },
  { key: 'certifications', value: '30+', icon: Award },
];

function AboutComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="about" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('about.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('about.intro')}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary-500" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{t(`about.${stat.key}`)}</div>
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
            <h3 className="font-display text-xl font-semibold text-white mb-6">
              {t('about.interests')}
            </h3>
            <div className="space-y-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card-hover rounded-xl p-4 flex items-center gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${interest.color}20` }}
                  >
                    <interest.icon
                      size={20}
                      style={{ color: interest.color }}
                    />
                  </div>
                  <span className="text-gray-300">
                    {t(`about.interestsList.${interest.key}`)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(AboutComponent);
