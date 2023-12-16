/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      }
    },
  },
  plugins: [],
};