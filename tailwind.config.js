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
          DEFAULT: '#FF6B35',
          light: '#FF8A65',
          dark: '#E65100'
        },
        secondary: {
          DEFAULT: '#FFC107',
          light: '#FFD54F',
          dark: '#FF8F00'
        },
        accent: '#4CAF50',
        players: {
          red: '#DC2626',
          blue: '#1D4ED8',
          green: '#059669',
          yellow: '#D97706'
        },
        ludo: {
          red: '#E53E3E',
          blue: '#3182CE',
          green: '#38A169',
          yellow: '#DD6B20',
          board: '#F7FAFC',
          path: '#EDF2F7'
        },
        surface: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fad5b8',
          300: '#f7bc8f',
          400: '#f49366',
          500: '#f16a3d',
          600: '#e65100',
          700: '#bf4100',
          800: '#993300',
          900: '#732600'
        }
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui'],
        heading: ['Fredoka One', 'cursive', 'system-ui'],
        display: ['Fredoka One', 'cursive']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(255, 107, 53, 0.15), 0 2px 10px -2px rgba(255, 107, 53, 0.1)',
        'card': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'ludo-board': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)',
        'ludo-token': 'inset 0 2px 4px rgba(255, 255, 255, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3)',
        'ludo-dice': '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'ludo-glow': '0 0 20px rgba(255, 107, 53, 0.4), 0 0 40px rgba(255, 107, 53, 0.2)',
        'neu-light': '8px 8px 20px #d1d9e6, -8px -8px 20px #ffffff',
        'neu-dark': '8px 8px 20px rgba(0, 0, 0, 0.4), -8px -8px 20px rgba(255, 255, 255, 0.1)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      animation: {
        'ludo-dice-roll': 'ludoDiceRoll 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ludo-token-move': 'ludoTokenMove 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'ludo-bounce': 'ludoBounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ludo-glow': 'ludoGlow 2s ease-in-out infinite',
        'ludo-shake': 'ludoShake 0.5s ease-in-out',
        'ludo-victory': 'ludoVictory 1.5s ease-out',
        'pulse-ludo': 'pulseLudo 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        ludoDiceRoll: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) scale(1)' },
          '25%': { transform: 'rotateX(90deg) rotateY(180deg) scale(1.1)' },
          '50%': { transform: 'rotateX(180deg) rotateY(360deg) scale(1.2)' },
          '75%': { transform: 'rotateX(270deg) rotateY(540deg) scale(1.1)' },
          '100%': { transform: 'rotateX(360deg) rotateY(720deg) scale(1)' }
        },
        ludoTokenMove: {
          '0%': { transform: 'scale(1) translateY(0)' },
          '30%': { transform: 'scale(1.2) translateY(-8px)' },
          '60%': { transform: 'scale(1.1) translateY(-4px)' },
          '100%': { transform: 'scale(1) translateY(0)' }
        },
        ludoBounce: {
          '0%': { transform: 'scale(0.3) rotate(-180deg)', opacity: '0' },
          '30%': { transform: 'scale(1.1) rotate(-60deg)', opacity: '0.7' },
          '60%': { transform: 'scale(0.95) rotate(20deg)', opacity: '0.9' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' }
        },
        ludoGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(255, 107, 53, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 25px rgba(255, 107, 53, 0.8), 0 0 50px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            transform: 'scale(1.05)'
          }
        },
        ludoShake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px) rotate(-1deg)' },
          '75%': { transform: 'translateX(4px) rotate(1deg)' }
        },
        ludoVictory: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '25%': { transform: 'scale(1.2) rotate(90deg)', opacity: '0.8' },
          '50%': { transform: 'scale(1.4) rotate(180deg)', opacity: '0.6' },
          '75%': { transform: 'scale(1.6) rotate(270deg)', opacity: '0.4' },
          '100%': { transform: 'scale(2) rotate(360deg)', opacity: '0' }
        },
        pulseLudo: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      },
      backgroundImage: {
        'ludo-gradient': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)',
        'ludo-board': 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        'ludo-token-red': 'radial-gradient(circle at 30% 30%, #fee2e2 0%, #dc2626 100%)',
        'ludo-token-blue': 'radial-gradient(circle at 30% 30%, #dbeafe 0%, #1d4ed8 100%)',
        'ludo-token-green': 'radial-gradient(circle at 30% 30%, #d1fae5 0%, #059669 100%)',
        'ludo-token-yellow': 'radial-gradient(circle at 30% 30%, #fef3c7 0%, #d97706 100%)'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}