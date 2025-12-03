
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Palette verte claire et moderne - Version éclaircie
      colors: {
        primary: {
          DEFAULT: '#00ff88',
          50: '#E6FFF3',
          100: '#B3FFD9',
          200: '#80FFBF',
          300: '#4DFFA6',
          400: '#1AFF8C',
          500: '#00ff88',
          600: '#00CC6D',
          700: '#009952',
          800: '#006637',
          900: '#00331B',
        },
        secondary: {
          DEFAULT: '#14b8a6',
          50: '#E6FAF8',
          100: '#B3F0EB',
          200: '#80E6DD',
          300: '#4DDCD0',
          400: '#1AD2C2',
          500: '#14b8a6',
          600: '#109385',
          700: '#0C6E64',
          800: '#084A42',
          900: '#042521',
        },
        dark: {
          DEFAULT: '#1a2f24',
          50: '#F5F7F6',
          100: '#E8EDE9',
          200: '#D1DBD3',
          300: '#A8BCA9',
          400: '#7F9D80',
          500: '#567E57',
          600: '#3D5C40',
          700: '#2E4633',
          800: '#233626',
          900: '#1a2f24',
          950: '#0F1B14',
        },
        accent: {
          purple: '#a855f7',
          cyan: '#22d3ee',
          pink: '#f472b6',
          yellow: '#fbbf24',
          teal: '#2dd4bf',
          orange: '#fb923c',
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

      // Box shadows personnalisées - green glow
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 136, 0.3)',
        'glow': '0 0 20px rgba(0, 255, 136, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 255, 136, 0.5)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.4)',
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
