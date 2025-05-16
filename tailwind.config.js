/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#f0f5fa',
          100: '#d0e1f5',
          200: '#a1c3e5',
          300: '#6B98D4',
          400: '#4A6FA5',
          500: '#385985',
          600: '#2c4569',
          700: '#21324d',
          800: '#162030',
          900: '#0c1018',
        },
        teal: {
          50: '#effaf5',
          100: '#c8f5e3',
          200: '#93e8c7',
          300: '#69B578',
          400: '#3c9d61',
          500: '#2e7d4d',
          600: '#236239',
          700: '#194727',
          800: '#0f2c18',
          900: '#071609',
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};