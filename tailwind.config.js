/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aigtx-green': '#A4D233',
        'aigtx-gray': '#6B7280',
      }
    },
  },
  plugins: [],
}