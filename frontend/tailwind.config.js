export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-gradient': 'radial-gradient(ellipse at center, rgb(15, 23, 42), rgb(2, 6, 23))',
      },
    },
  },
  plugins: [],
}
