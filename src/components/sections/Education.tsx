import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, Lightbulb, Users, Puzzle, Infinity } from 'lucide-react';

// Education data
const schools = [
  { id: 'school42', icon: '42', highlight: true },
  { id: 'iutMetz', icon: 'DUT' },
  { id: 'iutEpinal', icon: 'DUT' },
  { id: 'ufaNancy', icon: 'BTS' },
];

const mindsetValues = [
  { key: 'autonomy', icon: Lightbulb },
  { key: 'peerLearning', icon: Users },
  { key: 'problemSolving', icon: Puzzle },
  { key: 'noLimits', icon: Infinity },
];

function EducationComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="education" className="py-12 sm:py-20 lg:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('education.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* 42 Mindset highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-10 border-primary-500/30"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* 42 Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center border border-primary-500/30">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-400 font-mono">42</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 font-display">
                {t('education.school42Mindset.title')}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-5">
                {t('education.school42Mindset.description')}
              </p>

              {/* Values grid - horizontal scroll on mobile */}
              <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scroll-x-touch -mx-1 px-1 sm:mx-0 sm:px-0">
                {mindsetValues.map(({ key, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-dark-900/50 border border-dark-700 flex-shrink-0 min-w-max sm:min-w-0"
                  >
                    <Icon size={16} className="text-primary-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap sm:whitespace-normal">
                      {t(`education.school42Mindset.values.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schools grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {schools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.08 }}
              className={`glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 ${school.highlight ? 'border-primary-500/30' : ''}`}
            >
              {/* Icon */}
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 ${
                school.highlight
                  ? 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30'
                  : 'bg-dark-800'
              }`}>
                {school.icon === '42' ? (
                  <span className="text-lg sm:text-xl font-bold text-primary-400 font-mono">42</span>
                ) : (
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 font-mono">{school.icon}</span>
                )}
              </div>

              {/* School name */}
              <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-0.5 line-clamp-1">
                {t(`education.schools.${school.id}.name`)}
              </h4>

              {/* Degree */}
              <p className="text-primary-400 text-xs sm:text-sm font-medium mb-1">
                {t(`education.schools.${school.id}.degree`)}
              </p>

              {/* Period */}
              <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                <Calendar size={12} />
                <span>{t(`education.schools.${school.id}.period`)}</span>
              </div>

              {/* Description - hidden on mobile */}
              {school.highlight && (
                <p className="hidden sm:block text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed line-clamp-2 lg:line-clamp-3">
                  {t(`education.schools.${school.id}.description`)}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(EducationComponent);
