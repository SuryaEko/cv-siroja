/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: '#8B5CF6', // Accent
          700: '#6D28D9', // Secondary
          800: '#5B21B6', // Primary
        },
        indigo: {
          900: '#1E1B4B', // Dark background
        },
        gray: {
          50: '#F5F3FF', // Light text
        }
      }
    }
  },
  plugins: [],
}