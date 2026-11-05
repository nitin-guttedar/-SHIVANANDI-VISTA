/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F5EFEB',
          300: '#ECE2D6',
          400: '#DECFC0',
        },
        obsidian: {
          DEFAULT: '#141210',
          900: '#141210',
          800: '#1C1917',
          700: '#2A2623',
          600: '#403A35',
          500: '#635B54',
          400: '#8E847B',
          300: '#BDB3AA',
          200: '#E4DDD6',
          100: '#F2EDE7',
        },
        gold: {
          DEFAULT: '#B88939',
          light: '#D0A14E',
          soft: '#E8C582',
          pale: '#FBF5EA',
          dark: '#8F6423',
          deep: '#694814',
        },
        stone: {
          warm: '#F7F5F0',
          border: '#E7DFD5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'minimal': '0 4px 16px -2px rgba(20, 18, 16, 0.06)',
        'minimal-lg': '0 12px 32px -4px rgba(20, 18, 16, 0.08)',
        'minimal-hover': '0 16px 36px -6px rgba(184, 137, 57, 0.12)',
      }
    },
  },
  plugins: [],
}
