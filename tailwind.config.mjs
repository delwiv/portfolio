/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      anton: ['Anton'],
      bebas: ['Bebas Neue'],
    },
    fontSize: {
      xl: ['26px', { fontFamily: 'anton', lineHeight: 1 }],
      '2xl': ['36px', { fontFamily: 'anton', lineHeight: 1 }],
      '3xl': ['55px', { fontFamily: 'anton', lineHeight: 1 }],
      '4xl': ['65px', { fontFamily: 'anton', lineHeight: 1 }],
      '5xl': ['85px', { fontFamily: 'anton', lineHeight: 1 }],
      'summary-1': ['24px'],
      'summary-2': ['20px'],
      'summary-3': ['18px'],
      'summary-4': ['16px'],
      'summary-5': ['14px'],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}

export default config
