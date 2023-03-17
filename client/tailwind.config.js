module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      oswald: ['Oswald', 'sans-serif'],
      fjalla: ['Fjalla One', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
      roboto: ['Roboto Mono', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      transitionDuration: {
        DEFAULT: '400ms',
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
      fontSize: {
        14: '14px',
      },
      colors: {
        americanBlue: '#004F98',
        americanRed: '#db221d',
        active: '#6366f1',
        hover: '#6366f1',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        border: '#cad4d8',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
    },
  },
  plugins: [],
};
