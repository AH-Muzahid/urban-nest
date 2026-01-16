/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#d4af35",
                "background-light": "#ffffff",
                "background-dark": "#1f2937",
                charcoal: "#1f2937",
            },
            fontFamily: {
                display: ["var(--font-manrope)", "sans-serif"],
            },
            animation: {
                'blob': 'blob 7s infinite',
                'gradient': 'gradient 3s ease infinite',
                'fade-in': 'fade-in 0.6s ease-out',
                'fade-in-up': 'fade-in-up 0.6s ease-out',
            },
            keyframes: {
                blob: {
                    '0%, 100%': {
                        transform: 'translate(0, 0) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                },
                gradient: {
                    '0%, 100%': {
                        'background-position': '0% 50%',
                    },
                    '50%': {
                        'background-position': '100% 50%',
                    },
                },
                'fade-in': {
                    from: {
                        opacity: '0',
                    },
                    to: {
                        opacity: '1',
                    },
                },
                'fade-in-up': {
                    from: {
                        opacity: '0',
                        transform: 'translateY(20px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
            },
        },
    },
    plugins: [],
};
