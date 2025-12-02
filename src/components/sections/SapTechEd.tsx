import { memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { MapPin, Play } from 'lucide-react';

const techTags = ['SAP AI Hub', 'ABAP Cloud', 'Fiori Elements', 'RAP', 'Clean Core'];

function SapTechEdComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="teched" className="py-12 sm:py-20 lg:py-28 relative">
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
            {t('teched.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-primary-500/30"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Video Container */}
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden bg-dark-900 aspect-video">
                {/* Responsive video - HD for desktop, mobile for small screens */}
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster="/videos/sap-teched-poster.jpg"
                  playsInline
                >
                  {/* Mobile source first (smaller file) */}
                  <source
                    src="/videos/sap-teched-2025-mobile.mp4"
                    type="video/mp4"
                    media="(max-width: 768px)"
                  />
                  {/* HD source for larger screens */}
                  <source
                    src="/videos/sap-teched-2025.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Play overlay for visual indication */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary-500/80 flex items-center justify-center">
                    <Play size={32} className="text-dark-950 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              {/* Icon + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center border border-primary-500/30 flex-shrink-0">
                  <span className="text-lg sm:text-xl font-bold text-primary-400 font-mono">SAP</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-display">
                    {t('teched.eventTitle')}
                  </h3>
                  <div className="flex items-center gap-1.5 text-primary-400 text-sm sm:text-base mt-1">
                    <MapPin size={14} />
                    <span>{t('teched.location')}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                {t('teched.description')}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {techTags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="tag"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(SapTechEdComponent);
