/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'lora': ['Lora', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2F4760',
        'accent-green': '#A6BDA3',
        'accent-yellow': '#F7D174',
      }
    },
  },
  plugins: [],
}
