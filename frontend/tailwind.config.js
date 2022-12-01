/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biru-item': '#1E1E1E',
        'biru-abu': '#30333F',
        'kuning': '#FFD34E',
        'putih-abu': '#E3E0FA',
        'biru-muda': '#92B4EC',
        'abu-abu': '#40424D',
        'biru-tombol': '#647593'
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif']
      },
      fontSize: {
        'judul1': ['40px', '45px'],
        'judul2': ['20px', '22px'],
        'teks1': ['15px', '17px']
      },
      backgroundImage: {
        'l-pattern': "url('/src/assets/background.png')"
      }
    },
  },
  plugins: [],
}