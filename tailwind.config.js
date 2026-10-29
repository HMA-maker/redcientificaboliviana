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
      colors: {
        ink: '#102a43',
        muted: '#486581',
        blue: {
          DEFAULT: '#0c5278',
          dark: '#0a3855',
          light: '#e8f1f6',
        },
        aqua: '#b9e4e4',
        paper: '#f7fafc',
        line: '#d9e2ec',
        focus: '#e45b35',
      },
    },
  },
  plugins: [],
};
