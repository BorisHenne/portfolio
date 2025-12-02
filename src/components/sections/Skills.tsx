import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
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

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  delay: number;
  isInView: boolean;
}

function SkillBar({ name, level, color, delay, isInView }: SkillBarProps) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-xs font-mono text-gray-500">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function SkillsComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('sap');

  const activeSkills = skillCategories.find((cat) => cat.id === activeCategory);

  return (
    <section ref={ref} id="skills" className="py-20 lg:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('skills.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-12"
        >
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center justify-center gap-2 px-3 py-3 rounded-xl font-mono text-xs sm:text-sm transition-all',
                  activeCategory === cat.id
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                    : 'bg-dark-800/50 text-gray-400 border border-gray-700/50 hover:border-primary-500/30'
                )}
              >
                <Icon size={16} style={{ color: cat.color }} />
                <span className="hidden sm:inline">{t(`skills.categories.${cat.id}`)}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Skills display */}
        {activeSkills && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${activeSkills.color}20` }}
              >
                <activeSkills.icon size={24} style={{ color: activeSkills.color }} />
              </div>
              <h3 className="font-display text-2xl text-white">
                {t(`skills.categories.${activeSkills.id}`)}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
              {activeSkills.skills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={activeSkills.color}
                  delay={0.1 * index}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default memo(SkillsComponent);
