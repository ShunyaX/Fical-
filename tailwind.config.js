/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-Nunito)"],
        karl: ["var(--font-karla)"], 
        pop: ["var(--font-Poppins)"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    

  ],
};
