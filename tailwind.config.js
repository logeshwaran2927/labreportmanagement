/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-sky-50', 'text-sky-500', 'bg-sky-500',
    'bg-blue-50', 'text-blue-500', 'bg-blue-500',
    'bg-green-50', 'text-green-500', 'bg-green-500',
    'bg-amber-50', 'text-amber-500', 'bg-amber-500',
    'bg-red-50', 'text-red-500', 'bg-red-500',
  ],
};
