import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Database,
  Brain,
  Layout,
  Server,
  Zap,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '../../utils';
import { GlowingTabs } from '../ui/AnimatedTabs';
import { CardContainer, CardBody, CardItem } from '../ui/Card3D';

// Skill categories with icons
interface SkillCategory {
  id: string;
  icon: LucideIcon;
  color: string;
  skills: Array<{ name: string; level: number }>;
}

const skillCategories: SkillCategory[] = [
  {
    id: 'sap',
    icon: Database,
    color: '#00ff88',
    skills: [
      { name: 'ABAP / ABAP-OO', level: 95 },
      { name: 'SAP Fiori / UI5', level: 90 },
      { name: 'CDS / OData', level: 88 },
      { name: 'BAPI / RFC / IDoc', level: 92 },
      { name: 'Adobe LiveCycle', level: 85 },
      { name: 'Enhancement Points', level: 90 },
    ],
  },
  {
    id: 'ai',
    icon: Brain,
    color: '#a855f7',
    skills: [
      { name: 'Claude (Anthropic)', level: 95 },
      { name: 'ChatGPT / GPT-4', level: 90 },
      { name: 'GitHub Copilot', level: 88 },
      { name: 'Prompt Engineering', level: 90 },
      { name: 'MCP (Model Context Protocol)', level: 85 },
    ],
  },
  {
    id: 'frontend',
    icon: Layout,
    color: '#14b8a6',
    skills: [
      { name: 'React / Next.js', level: 88 },
      { name: 'TypeScript', level: 82 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 85 },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    color: '#22d3ee',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 72 },
      { name: 'REST API', level: 90 },
      { name: 'SQL / Databases', level: 88 },
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    color: '#f472b6',
    skills: [
      { name: 'Make.com', level: 92 },
      { name: 'Home Assistant', level: 88 },
      { name: 'API Integration', level: 90 },
    ],
  },
  {
    id: 'tools',
    icon: Wrench,
    color: '#fbbf24',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'Docker', level: 82 },
      { name: 'Cloudflare', level: 85 },
      { name: 'Linux / NAS', level: 80 },
    ],
  },
];

interface SkillCardProps {
  name: string;
  level: number;
  color: string;
  index: number;
}

function SkillCard({ name, level, color, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div
        className="relative p-4 rounded-xl bg-dark-900/50 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 overflow-hidden"
        style={{
          boxShadow: `0 0 0 1px ${color}10`,
        }}
      >
        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color}10, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-200">{name}</span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {level}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${color}, ${color}88)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillsComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('sap');

  const activeSkills = skillCategories.find((cat) => cat.id === activeCategory);

  const tabItems = skillCategories.map((cat) => ({
    id: cat.id,
    label: t(`skills.categories.${cat.id}`),
    icon: <cat.icon size={16} />,
    color: cat.color,
  }));

  return (
    <section ref={ref} id="skills" className="py-20 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dark-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,136,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.03),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-mono mb-4"
          >
            {'<skills />'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies et compétences maîtrisées au fil des années
          </p>
        </motion.div>

        {/* Category tabs with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <GlowingTabs
            tabs={tabItems}
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
          />
        </motion.div>

        {/* Skills display with 3D card effect */}
        <AnimatePresence mode="wait">
          {activeSkills && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <CardContainer containerClassName="w-full">
                <CardBody className="w-full h-auto bg-dark-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 sm:p-8">
                  {/* Header */}
                  <CardItem translateZ={50} className="w-full mb-8">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${activeSkills.color}15` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <activeSkills.icon size={28} style={{ color: activeSkills.color }} />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-2xl text-white">
                          {t(`skills.categories.${activeSkills.id}`)}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {activeSkills.skills.length} compétences
                        </p>
                      </div>
                    </div>
                  </CardItem>

                  {/* Skills grid */}
                  <CardItem translateZ={30} className="w-full">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {activeSkills.skills.map((skill, index) => (
                        <SkillCard
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          color={activeSkills.color}
                          index={index}
                        />
                      ))}
                    </div>
                  </CardItem>

                  {/* Footer stats */}
                  <CardItem translateZ={20} className="w-full mt-6 pt-6 border-t border-gray-800/50">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">
                        Niveau moyen
                      </span>
                      <span
                        className="font-mono font-semibold"
                        style={{ color: activeSkills.color }}
                      >
                        {Math.round(
                          activeSkills.skills.reduce((a, b) => a + b.level, 0) /
                            activeSkills.skills.length
                        )}
                        %
                      </span>
                    </div>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick overview - all categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {skillCategories.map((cat, index) => {
            const avgLevel = Math.round(
              cat.skills.reduce((a, b) => a + b.level, 0) / cat.skills.length
            );
            const Icon = cat.icon;

            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'relative p-4 rounded-xl transition-all duration-300 group overflow-hidden',
                  activeCategory === cat.id
                    ? 'bg-dark-800/80 border-2'
                    : 'bg-dark-900/30 border border-gray-800/50 hover:border-gray-700/50'
                )}
                style={{
                  borderColor: activeCategory === cat.id ? `${cat.color}50` : undefined,
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${cat.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 text-center">
                  <Icon
                    size={24}
                    className="mx-auto mb-2 transition-transform group-hover:scale-110"
                    style={{ color: cat.color }}
                  />
                  <div className="text-xs text-gray-400 mb-1 truncate">
                    {t(`skills.categories.${cat.id}`)}
                  </div>
                  <div
                    className="text-lg font-mono font-bold"
                    style={{ color: cat.color }}
                  >
                    {avgLevel}%
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(SkillsComponent);
