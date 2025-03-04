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
      xl: ['26px', { fontFamily: 'anton' }],
      '2xl': ['36px', { fontFamily: 'anton' }],
      '3xl': ['55px', { fontFamily: 'anton' }],
      '4xl': ['65px', { fontFamily: 'anton' }],
      '5xl': ['85px', { fontFamily: 'anton' }],
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
