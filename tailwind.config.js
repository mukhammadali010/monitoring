/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include the root HTML file if applicable
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@radix-ui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
