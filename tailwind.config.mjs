/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: ['Bebas Neue', 'sans-serif'],
      sans: ['Ubuntu Sans', 'system-ui', 'sans-serif'],
      mono: ['Ubuntu Mono', 'monospace'],
    },
    fontSize: {
      sm: ['0.875rem', { lineHeight: '1.4' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.125rem', { lineHeight: '1.6' }],
      xl: ['1.375rem', { lineHeight: '1.3' }],
      '2xl': ['1.75rem', { lineHeight: '1.2' }],
      '3xl': ['2.25rem', { lineHeight: '1.15' }],
      '4xl': ['3rem', { lineHeight: '1.1' }],
      '5xl': ['4rem', { lineHeight: '1.05' }],
      '6xl': ['5.25rem', { lineHeight: '1' }],
      'summary-1': ['1rem', { fontFamily: 'Ubuntu Sans' }],
      'summary-2': ['0.9375rem', { fontFamily: 'Ubuntu Sans' }],
      'summary-3': ['0.875rem', { fontFamily: 'Ubuntu Sans' }],
      'summary-4': ['0.875rem', { fontFamily: 'Ubuntu Sans' }],
      'summary-5': ['0.8125rem', { fontFamily: 'Ubuntu Sans' }],
      'summary-6': ['0.8125rem', { fontFamily: 'Ubuntu Sans' }],
    },
    extend: {
      colors: {
        base: 'var(--color-base)',
        'base-soft': 'var(--color-base-soft)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border: 'var(--color-border)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        'ink-faint': 'var(--color-ink-faint)',
        accent: 'var(--color-accent)',
        'accent-strong': 'var(--color-accent-strong)',
        'accent-soft': 'var(--color-accent-soft)',
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.06), 0 8px 24px -12px rgba(0,0,0,0.25)',
        'card-hover':
          '0 2px 4px rgba(0,0,0,0.08), 0 16px 40px -16px rgba(0,0,0,0.4)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
