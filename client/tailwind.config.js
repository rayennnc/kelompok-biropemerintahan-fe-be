// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"], // pastikan Tailwind scan file kamu
  darkMode: false, // bisa kamu ganti ke 'class' kalau mau dark mode manual
  theme: {
    extend: {
      colors: {
        primary: "#1193b5",
        secondary: "#95ddeb",
        accent: "#c3924d",
        accent2: "#ead4c9",
        accent3: "#a84353",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), // plugin untuk styling konten artikel
  ],
}
