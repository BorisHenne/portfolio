import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Code2,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Users,
  Puzzle,
  Infinity,
} from 'lucide-react';

import { cn } from '../../utils';

// Tab types
type TabId = 'experience' | 'education' | 'skills';

const tabs: { id: TabId; icon: typeof Briefcase }[] = [
  { id: 'experience', icon: Briefcase },
  { id: 'education', icon: GraduationCap },
  { id: 'skills', icon: Code2 },
];

// Experience data
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

// Skills data
const skillCategories = [
  {
    id: 'sap',
    skills: [
      { name: 'ABAP / ABAP-OO', level: 95 },
      { name: 'SAP Fiori / UI5', level: 90 },
      { name: 'CDS / OData', level: 88 },
      { name: 'RAP / Clean Core', level: 85 },
      { name: 'Adobe Forms', level: 80 },
    ],
  },
  {
    id: 'ai',
    skills: [
      { name: 'Claude / GPT', level: 92 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'SAP Joule / ABAP-1', level: 75 },
      { name: 'AI Automation', level: 85 },
    ],
  },
  {
    id: 'frontend',
    skills: [
      { name: 'React / TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 82 },
      { name: 'Next.js', level: 75 },
    ],
  },
  {
    id: 'automation',
    skills: [
      { name: 'Make.com', level: 92 },
      { name: 'Home Assistant', level: 88 },
      { name: 'Docker', level: 85 },
      { name: 'CI/CD', level: 78 },
    ],
  },
];

function CareerComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<TabId>('experience');
  const [showAllExp, setShowAllExp] = useState(false);

  const visibleExperiences = showAllExp ? experiences : experiences.slice(0, 4);

  return (
    <section ref={ref} id="career" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('career.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-20 sm:w-28 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Tabs - avec texte visible sur mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-3 px-3 sm:px-8 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-xs sm:text-lg transition-all duration-300 touch-manipulation',
                  isActive
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-dark-950 shadow-lg shadow-primary-500/30'
                    : 'glass-card text-gray-400 hover:text-primary-400 hover:border-primary-500/40'
                )}
              >
                <Icon size={18} className="sm:w-[22px] sm:h-[22px]" />
                <span className="text-[11px] sm:text-lg">{t(`career.tabs.${tab.id}`)}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative max-w-4xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent" />

                {/* Experience items */}
                <div className="space-y-5 sm:space-y-7">
                  {visibleExperiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="relative pl-12 sm:pl-20"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-2 sm:left-6 top-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary-500 shadow-[0_0_12px_rgba(0,255,136,0.6)]" />

                      {/* Card */}
                      <div
                        className={cn(
                          'glass-card rounded-xl sm:rounded-2xl p-5 sm:p-7',
                          exp.isCurrent && 'border-primary-500/30'
                        )}
                      >
                        {/* Current badge */}
                        {exp.isCurrent && (
                          <span className="inline-block px-3 py-1 mb-3 text-xs sm:text-sm font-mono rounded-full bg-primary-500/20 text-primary-400">
                            {t('experience.present')}
                          </span>
                        )}

                        {/* Title & Company */}
                        <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1">
                          {t(`experience.positions.${exp.id}.title`)}
                        </h3>
                        <p className="text-primary-400 font-medium text-base sm:text-lg mb-2">
                          {t(`experience.positions.${exp.id}.company`)}
                        </p>

                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-sm sm:text-base text-gray-500 mb-3">
                          <span className="flex items-center gap-1.5">
                            <Briefcase size={16} />
                            {t(`experience.positions.${exp.id}.period`)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={16} />
                            {t(`experience.positions.${exp.id}.location`)}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed">
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
                    animate={{ opacity: 1 }}
                    onClick={() => setShowAllExp(!showAllExp)}
                    className="mt-8 ml-12 sm:ml-20 flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-mono text-base sm:text-lg py-3 px-4 rounded-xl hover:bg-primary-500/10"
                  >
                    {showAllExp ? (
                      <>
                        <ChevronUp size={22} />
                        {t('experience.showLess')}
                      </>
                    ) : (
                      <>
                        <ChevronDown size={22} />
                        {t('experience.showMore')} ({experiences.length - 4})
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* 42 Mindset highlight */}
              <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-8 sm:mb-10 border-primary-500/20 bg-gradient-to-br from-primary-500/5 to-transparent max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-center">
                  {/* 42 Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-primary-500/10 border-2 border-primary-500/30 flex items-center justify-center shadow-lg shadow-primary-500/10">
                      <span className="text-5xl sm:text-6xl font-bold text-primary-400 font-mono">
                        42
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 font-display">
                      {t('education.school42Mindset.title')}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                      {t('education.school42Mindset.description')}
                    </p>

                    {/* Values grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                      {mindsetValues.map(({ key, icon: Icon }) => (
                        <div
                          key={key}
                          className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-dark-900/60 border border-dark-700/50 hover:border-primary-500/30 transition-colors"
                        >
                          <Icon size={18} className="text-primary-400 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-300">
                            {t(`education.school42Mindset.values.${key}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Schools grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {schools.map((school, index) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      'glass-card rounded-xl p-4 sm:p-5 hover:border-primary-500/30 transition-all group',
                      school.highlight && 'border-primary-500/30 bg-primary-500/5'
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        'w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 border transition-all',
                        school.highlight
                          ? 'bg-primary-500/15 border-primary-500/40'
                          : 'bg-dark-800/80 border-dark-700 group-hover:border-primary-500/30 group-hover:bg-primary-500/10'
                      )}
                    >
                      <span className={cn(
                        'font-bold font-mono transition-colors',
                        school.icon === '42' ? 'text-2xl sm:text-3xl' : 'text-sm sm:text-base',
                        school.highlight ? 'text-primary-400' : 'text-gray-400 group-hover:text-primary-400'
                      )}>
                        {school.icon}
                      </span>
                    </div>

                    {/* School name */}
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 leading-tight">
                      {t(`education.schools.${school.id}.name`)}
                    </h4>

                    {/* Degree */}
                    <p className="text-primary-400 text-xs sm:text-sm font-medium mb-3">
                      {t(`education.schools.${school.id}.degree`)}
                    </p>

                    {/* Period */}
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm">
                      <Calendar size={14} />
                      <span>{t(`education.schools.${school.id}.period`)}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6 sm:gap-8"
            >
              {skillCategories.map((category, catIndex) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIndex * 0.1 }}
                  className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-7"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6 font-display flex items-center gap-3">
                    <Code2 size={24} className="text-primary-400" />
                    {t(`skills.categories.${category.id}`)}
                  </h3>

                  <div className="space-y-4 sm:space-y-5">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300 text-base sm:text-lg font-medium">
                            {skill.name}
                          </span>
                          <span className="text-primary-400 font-mono text-base sm:text-lg">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="skill-bar">
                          <motion.div
                            className="skill-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 0.3 + skillIndex * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default memo(CareerComponent);
