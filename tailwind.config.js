/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00355F',
          container: '#0F4C81',
          50: '#E7EEFF',
          100: '#DEE8FF',
        },
        secondary: {
          DEFAULT: '#006A6A',
          container: '#90EFEF',
          50: '#E0F7F7',
        },
        bg: '#F9F9FF',
        surface: '#FFFFFF',
        'surface-low': '#F0F3FF',
        'surface-mid': '#E7EEFF',
        'surface-high': '#DEE8FF',
        ink: '#111C2C',
        'ink-secondary': '#42474F',
        outline: '#727780',
        success: '#2E7D32',
        warning: '#ED6C02',
        error: '#C62828',
        status: {
          completed: '#2E7D32',
          progress: '#006A6A',
          delayed: '#ED6C02',
          flagged: '#C62828',
          planned: '#0F4C81',
        },
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 53, 95, 0.06), 0 1px 2px rgba(0, 53, 95, 0.04)',
        'card-hover': '0 4px 12px rgba(0, 53, 95, 0.1), 0 2px 4px rgba(0, 53, 95, 0.06)',
        sidebar: '2px 0 8px rgba(0, 53, 95, 0.06)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'progress': {
          '0%': { width: '0%' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.25s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'progress': 'progress 1s ease-out',
      },
    },
  },
  plugins: [],
};
