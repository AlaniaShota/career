// postcss.config.cjs
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    // обычно autoprefixer не нужен, v4 сам всё обрабатывает
  },
};
