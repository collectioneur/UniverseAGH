/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background),1)",
        foreground: "rgba(var(--foreground),1)",
        customred: "rgba(var(--customred),1)",
        customgreen: "rgba(var(--customgreen),1)",
      },
    },
  },
  plugins: [],
};
