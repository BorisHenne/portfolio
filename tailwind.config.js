
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Nouvelle palette SAP TechEd inspired - plus claire et moderne
      colors: {
        primary: {
          DEFAULT: '#00D4FF',
          50: '#E6FAFF',
          100: '#B3F0FF',
          200: '#80E6FF',
          300: '#4DDBFF',
          400: '#1AD1FF',
          500: '#00D4FF',
          600: '#00A8CC',
          700: '#007D99',
          800: '#005266',
          900: '#002633',
        },
        secondary: {
          DEFAULT: '#E91E8C',
          50: '#FDE7F3',
          100: '#FABCDE',
          200: '#F791C9',
          300: '#F466B4',
          400: '#F13B9F',
          500: '#E91E8C',
          600: '#BA1870',
          700: '#8C1254',
          800: '#5D0C38',
          900: '#2F061C',
        },
        dark: {
          DEFAULT: '#0D1B2A',
          50: '#E8EDF2',
          100: '#C5D1DC',
          200: '#9FB3C5',
          300: '#7995AE',
          400: '#537797',
          500: '#3D5A80',
          600: '#2E4460',
          700: '#1F2E40',
          800: '#152232',
          900: '#0D1B2A',
          950: '#080F17',
        },
        accent: {
          purple: '#7B2CBF',
          cyan: '#00D4FF',
          pink: '#E91E8C',
          yellow: '#FFD60A',
          teal: '#2EC4B6',
          orange: '#FF6B35',
        },
      },

      // Typography personnalisée
      fontFamily: {
        sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        display: ['Space Mono', 'IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', 'Space Mono', ...defaultTheme.fontFamily.mono],
      },

      // Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        'spotlight': 'spotlight 2s ease .75s 1 forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'meteor': 'meteor 5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink-caret': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#00D4FF' },
        },
        spotlight: {
          '0%': {
            opacity: '0',
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -40%) scale(1)',
          },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: '0' },
        },
      },

      // Backdrop blur
      backdropBlur: {
        xs: '2px',
      },

      // Box shadows personnalisées - cyan glow
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 212, 255, 0.3)',
        'glow': '0 0 20px rgba(0, 212, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 212, 255, 0.5)',
        'glow-pink': '0 0 20px rgba(233, 30, 140, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.1)',
      },

      // Background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)',
      },

      // Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // Z-index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};
