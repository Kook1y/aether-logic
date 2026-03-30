import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#121315',
          dim: '#121315',
          bright: '#38393a',
          variant: '#343536',
          tint: '#d0bcff',
        },
        'surface-container': {
          lowest: '#0d0e0f',
          low: '#1b1c1d',
          DEFAULT: '#1f2021',
          high: '#292a2b',
          highest: '#343536',
        },
        'on-surface': {
          DEFAULT: '#e3e2e3',
          variant: '#cbc3d7',
        },
        primary: {
          DEFAULT: '#d0bcff',
          container: '#a078ff',
        },
        'on-primary': '#3c0091',
        secondary: {
          DEFAULT: '#4edea3',
          container: '#00a572',
        },
        'on-secondary': '#003824',
        tertiary: {
          DEFAULT: '#ffb3af',
          container: '#f55e5d',
        },
        'on-tertiary': '#68000e',
        outline: {
          DEFAULT: '#958ea0',
          variant: '#494454',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        'inverse-primary': '#6d3bd7',
        'inverse-surface': '#e3e2e3',
        background: '#121315',
        'on-background': '#e3e2e3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Berkeley Mono', 'ui-monospace', 'Consolas', 'monospace'],
      },
      boxShadow: {
        celestial: '0 0 60px rgba(160, 120, 255, 0.15)',
        'celestial-lg': '0 0 80px rgba(160, 120, 255, 0.25)',
        glow: '0 0 20px rgba(208, 188, 255, 0.3)',
      },
      animation: {
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
