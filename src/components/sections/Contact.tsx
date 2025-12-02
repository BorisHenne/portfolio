import { memo, useRef, useState, useCallback, useEffect } from 'react';
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
import {
  getMailtoLink,
  getTelLink,
  getObfuscatedPhone,
  getObfuscatedEmail,
} from '../../utils/contactProtection';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string | null;
  color: string;
}

function ContactComponent() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Contact info loaded client-side to prevent scraping
  const [contactData, setContactData] = useState({ email: '', phone: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formLoadTime] = useState(Date.now());
  const [submitCount, setSubmitCount] = useState(0);

  // Load contact info client-side only
  useEffect(() => {
    setContactData({
      email: getObfuscatedEmail(),
      phone: getObfuscatedPhone(),
    });
  }, []);

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      label: 'email',
      value: contactData.email,
      href: getMailtoLink(),
      color: '#00ff88',
    },
    {
      icon: Phone,
      label: 'phone',
      value: contactData.phone,
      href: getTelLink(),
      color: '#14b8a6',
    },
    {
      icon: Linkedin,
      label: 'linkedin',
      value: 'Boris HENNÉ',
      href: 'https://www.linkedin.com/in/borishenne/',
      color: '#0077b5',
    },
    {
      icon: MapPin,
      label: 'location',
      value: 'Thionville, France',
      href: null,
      color: '#f472b6',
    },
  ];

  // Anti-spam validation
  const validateSubmission = useCallback(() => {
    // 1. Honeypot check - if filled, it's a bot
    if (formData.website) {
      console.warn('Honeypot triggered');
      return false;
    }

    // 2. Time check - form filled too quickly (less than 3 seconds)
    const timeSinceLoad = Date.now() - formLoadTime;
    if (timeSinceLoad < 3000) {
      console.warn('Form submitted too quickly:', timeSinceLoad, 'ms');
      return false;
    }

    // 3. Rate limiting - max 3 submissions per session
    if (submitCount >= 3) {
      console.warn('Rate limit exceeded');
      return false;
    }

    // 4. Spam patterns detection
    const spamPatterns = [
      /\b(viagra|casino|lottery|winner|cryptocurrency|bitcoin|investment opportunity)\b/i,
      /\b(click here|act now|limited time|free money)\b/i,
      /(http[s]?:\/\/.*){3,}/i, // More than 2 URLs
      /(.)\1{10,}/i, // Character repeated 10+ times
    ];

    const fullText = `${formData.name} ${formData.email} ${formData.message}`;
    for (const pattern of spamPatterns) {
      if (pattern.test(fullText)) {
        console.warn('Spam pattern detected');
        return false;
      }
    }

    return true;
  }, [formData, formLoadTime, submitCount]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
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

      // Anti-spam validation
      if (!validateSubmission()) {
        // Fake success to not alert bots
        setStatus('success');
        setFormData({ name: '', email: '', message: '', website: '' });
        setTimeout(() => setStatus('idle'), 3000);
        return;
      }

      setSubmitCount((prev) => prev + 1);
      setStatus('sending');

      try {
        // Send via Formspree
        const response = await fetch('https://formspree.io/f/mzznbgrq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `Portfolio Contact - ${formData.name}`,
            _template: 'table',
          }),
        });

        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '', website: '' });
          setTimeout(() => setStatus('idle'), 5000);
        } else {
          throw new Error('Send error');
        }
      } catch (error) {
        console.error('Form error:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    },
    [formData, validateForm, validateSubmission]
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Contact methods - Full width on top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="glass-card-hover rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 group block h-full"
                    >
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <Icon
                          size={20}
                          className="sm:w-6 sm:h-6"
                          style={{ color: method.color }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-500 text-xs font-mono mb-0.5">
                          {t(`contact.${method.label}`)}
                        </p>
                        <p className="text-white text-xs sm:text-sm truncate group-hover:text-primary-400 transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="glass-card-hover rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 h-full">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${method.color}20` }}
                      >
                        <Icon
                          size={20}
                          className="sm:w-6 sm:h-6"
                          style={{ color: method.color }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-500 text-xs font-mono mb-0.5">
                          {t(`contact.${method.label}`)}
                        </p>
                        <p className="text-white text-xs sm:text-sm">{method.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact form - Centered below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8">
            {/* Honeypot field - invisible for humans, bots fill this */}
            <div
              className="absolute opacity-0 pointer-events-none"
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            >
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={cn('input-field', errors.name && 'border-red-500/50')}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
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
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={cn('input-field', errors.email && 'border-red-500/50')}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={cn('input-field resize-none', errors.message && 'border-red-500/50')}
                placeholder="Votre message..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className={cn(
                'btn-primary w-full flex items-center justify-center gap-2 mt-6',
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
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ContactComponent);
