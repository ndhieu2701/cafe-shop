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
        "coffee-bg-breadcrumb": "url(./assets/header-panel.jpg)",
        "dart-img": "url(./assets/bg-dart.jpg)",
      },
      colors: {
        "main-color": "#895a42",
        "second-color": "#fbc65f",
      },
    },
  },
  plugins: [],
};
