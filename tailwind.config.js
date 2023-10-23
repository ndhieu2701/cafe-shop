/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "coffee-bg": "url('./assets/coffee-bg.jpg')",
        "coffee-logo": "url(./assets/logo.webp)",
        "coffee-header-panel": "url(./assets/header-panel.jpg)",
      },
      colors: {
        "main-color": "#895a42",
      },
    },
  },
  plugins: [],
};
