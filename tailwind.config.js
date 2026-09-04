/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: '#03101F',
          900: '#061A2D',
          800: '#0B3D5C',
          700: '#0E5478',
          600: '#1170A0',
        },
        cyan: {
          glow: '#00C2D1',
        },
        aqua: {
          glow: '#16E0BD',
        },
        seafoam: '#F5FAFF',
        risk: {
          high: '#FF3B5C',
          medium: '#FF9F40',
          low: '#16E0BD',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'ocean-radial': 'radial-gradient(ellipse at top, #0B3D5C 0%, #061A2D 55%, #03101F 100%)',
        'sonar-grid': 'linear-gradient(rgba(0,194,209,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,209,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 194, 209, 0.35)',
        'glow-lg': '0 0 40px rgba(0, 194, 209, 0.45)',
        'glow-aqua': '0 0 24px rgba(22, 224, 189, 0.4)',
        'glow-red': '0 0 24px rgba(255, 59, 92, 0.5)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'sonar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'wave-rise': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scan-line': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.5s ease-out infinite',
        'sonar-sweep': 'sonar-sweep 4s linear infinite',
        'wave-rise': 'wave-rise 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'scan-line': 'scan-line 2.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
