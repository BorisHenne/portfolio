import { memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Globe,
  Home,
  Music,
  User,
  Cpu,
  Box,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '../../utils';

interface Project {
  id: string;
  url: string | null;
  github: string | null;
  icon: LucideIcon;
  tags: string[];
  color: string;
  category: 'web' | '42' | 'personal';
}

const projects: Project[] = [
  {
    id: 'ebmc',
    url: 'https://ebmc-group.com/',
    github: null,
    icon: Globe,
    tags: ['React', 'Vite', 'Tailwind', 'SEO'],
    color: '#00ff88',
    category: 'web',
  },
  {
    id: 'amap',
    url: 'https://lespaniersdeleopold.fr/',
    github: null,
    icon: Globe,
    tags: ['React', 'Tailwind', 'Docker', 'Cloudflare'],
    color: '#8BC34A',
    category: 'web',
  },
  {
    id: 'raytracing',
    url: null,
    github: 'https://github.com/BorisHenne/RT',
    icon: Cpu,
    tags: ['C', 'Raytracing', '3D', 'École 42'],
    color: '#f472b6',
    category: '42',
  },
  {
    id: 'libasm',
    url: null,
    github: 'https://github.com/BorisHenne/lib_ASM',
    icon: Box,
    tags: ['Assembly', 'x86-64', 'Low-level'],
    color: '#fbbf24',
    category: '42',
  },
  {
    id: 'homeassistant',
    url: null,
    github: null,
    icon: Home,
    tags: ['Home Assistant', 'IoT', 'YAML'],
    color: '#18bcf2',
    category: 'personal',
  },
  {
    id: 'suno',
    url: 'https://suno.com/@prompted57',
    github: null,
    icon: Music,
    tags: ['Suno AI', 'Music', 'Prompt Engineering'],
    color: '#ec4899',
    category: 'personal',
  },
  {
    id: 'portfolio',
    url: 'https://boris-henne.fr/',
    github: 'https://github.com/BorisHenne',
    icon: User,
    tags: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    color: '#a855f7',
    category: 'web',
  },
];

const categories = [
  { id: 'all', labelFr: 'Tous', labelEn: 'All' },
  { id: 'web', labelFr: 'Web', labelEn: 'Web' },
  { id: '42', labelFr: 'École 42', labelEn: 'School 42' },
  { id: 'personal', labelFr: 'Personnel', labelEn: 'Personal' },
];

function ProjectsComponent() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const isEnglish = i18n.language === 'en';

  return (
    <section
      ref={ref}
      id="projects"
      className="py-20 lg:py-32 relative bg-gradient-to-b from-transparent via-primary-500/5 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">
            <span className="text-primary-500">&lt;</span>
            {t('projects.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-full font-mono text-sm transition-all',
                activeCategory === cat.id
                  ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                  : 'bg-dark-800/50 text-gray-400 border border-gray-700/50 hover:border-primary-500/30'
              )}
            >
              {isEnglish ? cat.labelEn : cat.labelFr}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                className="glass-card-hover rounded-2xl p-6 group"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <Icon size={24} style={{ color: project.color }} />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-white mb-2">
                  {t(`projects.list.${project.id}.title`)}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {t(`projects.list.${project.id}.description`)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-md bg-dark-800 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                      {t('projects.viewSite')}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      {t('projects.viewCode')}
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(ProjectsComponent);
