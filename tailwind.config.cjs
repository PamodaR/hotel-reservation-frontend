/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            colors: {
                primary: {
                    50: '#f0f7ff',
                    100: '#e0effe',
                    200: '#b9dffd',
                    300: '#7cc2fd', // Brighter accent
                    400: '#36a2fa',
                    500: '#0c87eb', // Vibrant Blue
                    600: '#0066cc', // Royal Blue (Main)
                    700: '#0052a3',
                    800: '#00468c',
                    900: '#003d7a', // Deep Navy
                },
                gold: {
                    50: '#fffaeb',
                    100: '#fff3c7',
                    200: '#ffe58a',
                    300: '#ffd24d',
                    400: '#fbbf24',
                    500: '#f59e0b', // Rich Gold
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                }
            }
        },
    },
    plugins: [],
}
