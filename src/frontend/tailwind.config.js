module.exports = {
  purge: [], //remove this line
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx", "./public/**/*.html"], //add this line
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      "1/2": "80vh",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
