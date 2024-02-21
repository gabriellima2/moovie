/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: 'Inter_600SemiBold',
        subtitle: 'Inter_500Medium',
				body: 'Inter_400Regular',
				thin: 'Inter_300Light',
        bold: 'Inter_700Bold'
      }
    },
  },
  plugins: [],
}
