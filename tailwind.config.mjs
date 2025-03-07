/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      bebas: ['Bebas Neue'],
      ubuntu: ['Ubuntu'],
      'ubuntu-sans': ['UbuntuSans'],
      'ubuntu-mono': ['UbuntuMono'],
      'ubuntu-sans-mono': ['UbuntuSansMono'],
    },
    fontSize: {
      xl: ['26px', { fontFamily: 'anton', lineHeight: 1 }],
      '2xl': ['36px', { fontFamily: 'anton', lineHeight: 1 }],
      '3xl': ['55px', { fontFamily: 'anton', lineHeight: 1 }],
      '4xl': ['65px', { fontFamily: 'anton', lineHeight: 1 }],
      '5xl': ['85px', { fontFamily: 'anton', lineHeight: 1 }],
      'summary-1': ['20px', { fontFamily: 'roboto' }],
      'summary-2': ['18px', { fontFamily: 'roboto' }],
      'summary-3': ['16px', { fontFamily: 'roboto' }],
      'summary-4': ['16px', { fontFamily: 'roboto' }],
      'summary-5': ['16px', { fontFamily: 'roboto' }],
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
