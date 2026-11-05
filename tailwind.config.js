/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: {
          DEFAULT: '#FAF8F5',
          50: '#FFFFFF',
          100: '#FDFCF9',
          200: '#F7F4EE',
          300: '#EFEAE0',
          400: '#E5DECf',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          elevated: 'rgba(255, 255, 255, 0.95)',
          muted: '#F5F2EB',
          hover: '#FDF8EE',
          border: '#E8E3D7',
          'border-gold': 'rgba(180, 140, 54, 0.35)',
        },
        charcoal: {
          DEFAULT: '#1C1917',
          900: '#141210',
          800: '#221E1B',
          700: '#38332E',
          600: '#524B43',
          500: '#736B60',
          400: '#999083',
          300: '#C2BAB0',
        },
        gold: {
          DEFAULT: '#B48C36',
          light: '#D4AF37',
          bright: '#F3C969',
          dark: '#8C6B23',
          deep: '#694F17',
          cream: '#FDF9EE',
          glow: 'rgba(180, 140, 54, 0.22)',
          border: 'rgba(180, 140, 54, 0.4)',
        },
        forest: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
          dark: '#081C15',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', '"Cinzel"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'skeuo-sm': '0 2px 4px rgba(28,25,23,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
        'skeuo-card': '0 10px 30px -5px rgba(28, 25, 23, 0.07), 0 2px 6px -1px rgba(28, 25, 23, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        'skeuo-elevated': '0 20px 40px -10px rgba(28, 25, 23, 0.12), 0 8px 16px -4px rgba(28, 25, 23, 0.06), inset 0 1px 1px rgba(255, 255, 255, 1)',
        'skeuo-inset': 'inset 0 2px 5px rgba(28, 25, 23, 0.08), inset 0 1px 2px rgba(28, 25, 23, 0.04), 0 1px 0 rgba(255,255,255,0.9)',
        'skeuo-inset-deep': 'inset 0 3px 8px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255,255,255,0.8)',
        'gold-btn': '0 4px 14px rgba(180, 140, 54, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -2px 3px rgba(0, 0, 0, 0.18)',
        'gold-btn-pressed': 'inset 0 3px 6px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'dark-btn': '0 4px 14px rgba(28, 25, 23, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15), inset 0 -2px 3px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E6C875 0%, #C5A059 40%, #B48C36 75%, #8C6B23 100%)',
        'gold-sheen': 'linear-gradient(180deg, #F3C969 0%, #D4AF37 35%, #B48C36 70%, #9A7727 100%)',
        'dark-metallic': 'linear-gradient(180deg, #2D2723 0%, #1F1B18 60%, #151311 100%)',
        'pearl-card': 'linear-gradient(180deg, #FFFFFF 0%, #FBF9F5 100%)',
        'gold-foil-subtle': 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
