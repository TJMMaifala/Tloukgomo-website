/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#0b0c0d', 900: '#111315', 800: '#181b1e', 700: '#22262a', 600: '#2e3338' },
        copper: { 300: '#f0a672', 400: '#e8884a', 500: '#e0702a', 600: '#c25a1b', 700: '#9c4614' },
        concrete: { 100: '#f3f2ef', 200: '#e6e4df', 300: '#cfcdc7', 400: '#a8a59e', 500: '#7d7a74' },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { wider2: '0.18em', wider3: '0.28em' },
      boxShadow: {
        card: '0 30px 60px -30px rgba(0,0,0,.6)',
      },
    },
  },
  plugins: [],
}
