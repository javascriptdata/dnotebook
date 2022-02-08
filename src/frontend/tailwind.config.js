module.exports = {
  purge: [], //remove this line 
  purge: ['./components/**/*.tsx', './pages/**/*.tsx','./public/**/*.html'], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}