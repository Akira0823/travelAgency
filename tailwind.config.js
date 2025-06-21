// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6', // soft blue
          dark: '#1E40AF',  // deep blue
        },
        secondary: {
          light: '#F59E0B', // warm gold
          dark: '#D97706',   // deep gold
        },
        neutral: {
          white: '#FEFEFE',
          gray: '#6B7280',
        },
        accent: {
          light: '#F97316', // coral
          dark: '#EA580C',   // sunset
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}