module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          elem: "#2B3945",
          bg: "#202C37",
          text: "#FFFFFF",
          base: "#3D3D3D",
        },
        light: {
          elem: "#FFFFFF",
          bg: "#FAFAFA",
          text: "#111517",
          base: "#4f46e5",
        },
        slate: {
          800: "#27272a"
        }
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
