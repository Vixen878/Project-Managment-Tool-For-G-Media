module.exports = {
  mode: 'jit',
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#23AA97',
        secondaryGreen: '#2CB48C',
        texts: '#241C23',
        gred: '#E53945',
        gorange: '#F45C2C',
        circlesBG: '#fad1c7',
        dashboardBG: '#F8F8F8'
      }
    },
  },
  plugins: [],
}
