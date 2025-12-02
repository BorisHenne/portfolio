import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

import { cn } from '../../utils';

// Experience data - IDs match translation keys
const experiences = [
  { id: 'ebmc', isCurrent: true },
  { id: 'ekenz1', isCurrent: false },
  { id: 'chambreCommerce', isCurrent: false },
  { id: 'tresorerie', isCurrent: false },
  { id: 'cfl', isCurrent: false },
  { id: 'reprise', isCurrent: false },
  { id: 'censio', isCurrent: false },
  { id: 'etam', isCurrent: false },
  { id: 'freelance', isCurrent: false },
  { id: 'danone', isCurrent: false },
];

function ExperienceComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 4);

  return (
    <section ref={ref} id="experience" className="py-12 sm:py-20 lg:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('experience.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent" />

          {/* Experience items */}
          <div className="space-y-4 sm:space-y-6">
            {visibleExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.08 }}
                className="relative pl-10 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-1.5 sm:left-4 top-3 sm:top-2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(0,255,136,0.5)]" />

                {/* Card */}
                <div className={cn(
                  'glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5',
                  exp.isCurrent && 'border-primary-500/30'
                )}>
                  {/* Current badge */}
                  {exp.isCurrent && (
                    <span className="inline-block px-2 py-0.5 mb-2 text-[10px] sm:text-xs font-mono rounded-full bg-primary-500/20 text-primary-400">
                      {t('experience.present')}
                    </span>
                  )}

                  {/* Title & Company */}
                  <h3 className="font-display text-base sm:text-lg font-semibold text-white mb-0.5">
                    {t(`experience.positions.${exp.id}.title`)}
                  </h3>
                  <p className="text-primary-400 font-medium text-sm mb-1.5">
                    {t(`experience.positions.${exp.id}.company`)}
                  </p>

                  {/* Meta info - compact on mobile */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="flex items-center gap-1">
                      <Briefcase size={12} />
                      {t(`experience.positions.${exp.id}.period`)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {t(`experience.positions.${exp.id}.location`)}
                    </span>
                  </div>

                  {/* Description - hidden on very small mobile, shown on tap */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {t(`experience.positions.${exp.id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show more/less button - touch friendly */}
          {experiences.length > 4 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              onClick={() => setShowAll(!showAll)}
              className="mt-6 ml-10 sm:ml-16 flex items-center gap-2 text-primary-400 hover:text-primary-300 active:text-primary-300 transition-colors font-mono text-sm py-2 px-3 -ml-3 sm:ml-13 rounded-lg"
            >
              {showAll ? (
                <>
                  <ChevronUp size={18} />
                  {t('experience.showLess')}
                </>
              ) : (
                <>
                  <ChevronDown size={18} />
                  {t('experience.showMore')} ({experiences.length - 4})
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(ExperienceComponent);
