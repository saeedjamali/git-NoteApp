/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}",, './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["iranyekan"],
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
};
