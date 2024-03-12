/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      sm: '376px',
      // The VoteAmerica breakpoint is 664px
      va: '664px',
      md: '768px',
      lg: '960px',
      xl: '1280px',
    },
    extend: {
      colors: {
        point: "#d056ee",
        murk: "#f3f2ec",
        hover: "#ecd3ed",
        press: "#ba4dd6",
      },
      fontFamily: {
        cabinet: ['CabinetGrotesk', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
