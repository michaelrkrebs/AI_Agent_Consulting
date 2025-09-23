/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'american-red': '#DC2626',
        'american-blue': '#1E3A8A',
        'steel-gray': '#374151',
      },
      fontFamily: {
        'nasa': ['Inter', 'system-ui', 'sans-serif'],
        'nasa-mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}