import { memo, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

import { cn, isValidEmail } from '../../utils';

interface ContactInfo {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'email',
    value: 'contact@boris-henne.fr',
    href: 'mailto:contact@boris-henne.fr',
  },
  {
    icon: Phone,
    label: 'phone',
    value: '+33 6 XX XX XX XX',
    href: 'tel:+33600000000',
  },
  {
    icon: Linkedin,
    label: 'linkedin',
    value: 'linkedin.com/in/borishenne',
    href: 'https://www.linkedin.com/in/borishenne/',
  },
  {
    icon: MapPin,
    label: 'location',
    value: 'Thionville, France',
    href: 'https://maps.google.com/?q=Thionville,France',
  },
];

function ContactComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      setStatus('sending');

      // Simulate API call
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } catch {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    },
    [validateForm]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  return (
    <section ref={ref} id="contact" className="py-20 lg:py-32 relative">
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
            {t('contact.title')}
            <span className="text-primary-500"> /&gt;</span>
          </h2>
          <p className="section-subtitle mt-4">{t('contact.subtitle')}</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card-hover rounded-xl p-4 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors">
                    <Icon size={22} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t(`contact.${info.label}`)}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 lg:p-8 space-y-6"
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={cn('input-field', errors.name && 'border-red-500/50')}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={cn('input-field', errors.email && 'border-red-500/50')}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={cn('input-field resize-none', errors.message && 'border-red-500/50')}
                placeholder="Votre message..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={cn(
                'btn-primary w-full flex items-center justify-center gap-2',
                status === 'sending' && 'opacity-70 cursor-wait'
              )}
            >
              {status === 'sending' ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                  {t('contact.form.sending')}
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle size={20} />
                  {t('contact.form.success')}
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle size={20} />
                  {t('contact.form.error')}
                </>
              ) : (
                <>
                  <Send size={20} />
                  {t('contact.form.send')}
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default memo(ContactComponent);
