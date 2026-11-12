/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      colors: {
        ink: '#26343D',
        muted: '#4d6157',
        blue: {
          DEFAULT: '#285747',
          dark: '#173328',
          light: '#EDF2EE',
        },
        aqua: '#C49A45',
        paper: '#F8F7F3',
        line: '#d6e0d8',
        focus: '#A64B45',
        forest: '#285747',
        canopy: '#1f4535',
        night: '#173328',
        brick: '#A64B45',
        ochre: '#C49A45',
        'warm-white': '#F8F7F3',
        'pale-sage': '#EDF2EE',
        charcoal: '#26343D',
      },
    },
  },
  plugins: [],
};
