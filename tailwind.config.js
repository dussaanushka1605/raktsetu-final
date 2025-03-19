
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: 'var(--blood)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: {
          DEFAULT: 'var(--muted)',
        },
      }
    },
  },
  safelist: [
    {
      pattern: /bg-blood/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /text-blood/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /border-blood/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /from-blood/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /to-blood/,
      variants: ['hover', 'focus'],
    },
  ],
  plugins: [],
}
