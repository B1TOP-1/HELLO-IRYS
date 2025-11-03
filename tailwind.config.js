/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          hover: '#2a2a2a',
          border: '#333333',
          text: {
            primary: '#ffffff',
            secondary: '#a0a0a0',
            muted: '#666666',
          },
        },
        accent: {
          primary: '#3b82f6',
          secondary: '#a855f7',
          hover: '#2563eb',
        },
      },
    },
  },
  plugins: [],
}



