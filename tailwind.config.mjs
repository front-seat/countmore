/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        point: "#d056ee",
        murk: "#f3f2ec",
        hover: "#ecd3ed",
        press: "#ba4dd6",
      },
      screens: {
        md: '768px',
        lg: '960px',
      },
      fontFamily: {
        cabinet: ['CabinetGrotesk', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
