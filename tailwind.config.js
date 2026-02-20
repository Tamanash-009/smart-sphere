/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'legal-navy': '#1a237e',
                'legal-gold': '#C5A059',
                'legal-paper': '#F9FAFB',
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
        },
    },
    plugins: [],
}
