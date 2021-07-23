module.exports = {
  purge: [
    './index.html', 
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      black: '#333333',
      white: '#FFFFFF',

      gray: {
        100: '#F1F1F1',
        200: '#F7F7F7',
        300: '#E6E6E6', // 分割线
        400: '#CCCCCC', // 分割线2
        500: '#999999', // 次要颜色 500
        600: '#666666', // 次要颜色 600
        700: '#4a5568',
        800: '#2d3748',
        900: '#1a202c',
      },

      red: {
        400: '#f23030',
      },
    }
  },
  variants: {
    extend: {
      borderColor: ['last']
    },
  },
  plugins: [],
}
