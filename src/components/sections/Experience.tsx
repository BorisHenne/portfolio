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
    <section ref={ref} id="experience" className="py-20 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('experience.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent" />

          {/* Experience items */}
          <div className="space-y-8">
            {visibleExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-2 timeline-dot" />

                {/* Card */}
                <div className={cn(
                  'glass-card rounded-2xl p-6',
                  exp.isCurrent && 'border-primary-500/30'
                )}>
                  {/* Current badge */}
                  {exp.isCurrent && (
                    <span className="inline-block px-2 py-1 mb-3 text-xs font-mono rounded-full bg-primary-500/20 text-primary-400">
                      {t('experience.present')}
                    </span>
                  )}

                  {/* Title & Company */}
                  <h3 className="font-display text-xl font-semibold text-white mb-1">
                    {t(`experience.positions.${exp.id}.title`)}
                  </h3>
                  <p className="text-primary-400 font-medium mb-2">
                    {t(`experience.positions.${exp.id}.company`)}
                  </p>

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {t(`experience.positions.${exp.id}.period`)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {t(`experience.positions.${exp.id}.location`)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`experience.positions.${exp.id}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Show more/less button */}
          {experiences.length > 4 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              onClick={() => setShowAll(!showAll)}
              className="mt-8 ml-16 flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-mono text-sm"
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
