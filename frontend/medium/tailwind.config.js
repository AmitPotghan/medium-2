/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customYellow: '#ffc018',
        customWhite:'#c3e0f2',
        customBlack:'#242424'
      },
      fontFamily:{
        Merriweather:['Merriweather','serif']
      },
      spacing: {
        'pre-wrap': 'white-space: pre-wrap;',
      }
    }
  },
  plugins: [],
}