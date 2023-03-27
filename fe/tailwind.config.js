/** @type {import('tailwindcss').Config} */
module.exports = {
    // important: true,
    tailwindConfig: './styles/tailwind.config.js',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
            },
            borderRadius: {
                customeR1: '44% 56% 58% 42% / 30% 57% 43% 70%',
            },
            margin: {
                '16.66667%': '16.66667%',
            },
            screens: {
                xs: '375px',
                cs: '0px',
            },
            animation: {
                fadeLeftMobile: 'fadeLeftMobile 1s ease-in-out',
                fadeRightMobile: 'fadeRightMobile 10s ease-in-out',
                fadeBottomMobile: 'fadeBottomMobile 0.3s ease-in ',
                changeBgColor: 'changeBgColor 1s ease-in',
            },

            // that is actual animation
            keyframes: {
                fadeLeftMobile: {
                    '0%': { transform: 'translateX(-500px)' },
                    '100%': { transform: 'translateX(0)' },
                },
                fadeRightMobile: {
                    '0%': { transform: 'translateX(500px)', opacity: 1 },
                    '100%': { transform: 'translateX(-1000px)', opacity: 0 },
                },
                fadeBottomMobile: {
                    '0%': { transform: 'translateY(16px)' },
                    '100%': { transform: 'translateY(0)' },
                },
                changeBgColor: {
                    '0%': { left: '0' },
                    '100%': { left: '100%' },
                    // '100%': { backgroundColor: '#333', left: '0' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('prettier-plugin-tailwindcss'),
    ],
};
