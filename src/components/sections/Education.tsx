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
    <section ref={ref} id="education" className="py-20 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('education.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* 42 Mindset highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-12 border-primary-500/30"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 42 Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center border border-primary-500/30">
                <span className="text-4xl lg:text-5xl font-bold text-primary-400 font-mono">42</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-display">
                {t('education.school42Mindset.title')}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {t('education.school42Mindset.description')}
              </p>

              {/* Values grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {mindsetValues.map(({ key, icon: Icon }) => (
                  <div
                    key={key}
                    className="flex items-center gap-3 p-3 rounded-xl bg-dark-900/50 border border-dark-700"
                  >
                    <Icon size={20} className="text-primary-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {t(`education.school42Mindset.values.${key}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {schools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`glass-card rounded-2xl p-6 ${school.highlight ? 'border-primary-500/30' : ''}`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                school.highlight
                  ? 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30'
                  : 'bg-dark-800'
              }`}>
                {school.icon === '42' ? (
                  <span className="text-2xl font-bold text-primary-400 font-mono">42</span>
                ) : (
                  <span className="text-sm font-bold text-gray-400 font-mono">{school.icon}</span>
                )}
              </div>

              {/* School name */}
              <h4 className="text-lg font-semibold text-white mb-1">
                {t(`education.schools.${school.id}.name`)}
              </h4>

              {/* Degree */}
              <p className="text-primary-400 text-sm font-medium mb-2">
                {t(`education.schools.${school.id}.degree`)}
              </p>

              {/* Period */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={14} />
                <span>{t(`education.schools.${school.id}.period`)}</span>
              </div>

              {/* Description if exists */}
              {school.highlight && (
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">
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
