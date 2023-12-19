module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
