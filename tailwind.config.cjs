/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        button: '#FFCDA9',
        buttonHover: '#ffe1cb',
        header: '#01464d',
        primary: '#FFCDA9',
        primaryLight: '#ffe1cb',
        secondary: '#00ad88',
        secondaryLight: '#00d3a6',        
      }
    },
  },
  plugins: [],
}