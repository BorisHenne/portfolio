
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Couleurs personnalisées du portfolio
      colors: {
        primary: {
          DEFAULT: '#00ff88',
          50: '#e6fff4',
          100: '#b3ffe0',
          200: '#80ffcc',
          300: '#4dffb8',
          400: '#1affa4',
          500: '#00ff88',
          600: '#00cc6d',
          700: '#009952',
          800: '#006637',
          900: '#00331c',
        },
        secondary: {
          DEFAULT: '#14b8a6',
          50: '#e7faf8',
          100: '#b8f0ea',
          200: '#89e6dc',
          300: '#5adcce',
          400: '#2bd2c0',
          500: '#14b8a6',
          600: '#109385',
          700: '#0c6e64',
          800: '#084943',
          900: '#042422',
        },
        dark: {
          DEFAULT: '#0a0f0d',
          50: '#f5f6f5',
          100: '#e1e4e2',
          200: '#c3c9c5',
          300: '#a5aea8',
          400: '#87938b',
          500: '#69786e',
          600: '#546058',
          700: '#3f4842',
          800: '#2a302c',
          900: '#151816',
          950: '#0a0f0d',
        },
        accent: {
          purple: '#a855f7',
          cyan: '#22d3ee',
          pink: '#f472b6',
          yellow: '#fbbf24',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)' },
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
          '50%': { borderColor: '#00ff88' },
        },
      },
      
      // Backdrop blur
      backdropBlur: {
        xs: '2px',
      },
      
      // Box shadows personnalisées
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 136, 0.3)',
        'glow': '0 0 20px rgba(0, 255, 136, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 255, 136, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(0, 255, 136, 0.1)',
      },
      
      // Background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)',
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
