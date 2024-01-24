/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "976px",
            xl: "1440px",
        },
        colors: ({ colors }) => ({
            ...colors,
            dark: "#151B25",
            light: "#DBE8E1",
            primary: "#41729F",
            "dark-primary": "#274472",
            "light-primary": "#C3E0E5",
            secondary: "#5885AF",
            "light-gray": "#AEB8C4",
            success: "#39918C",
            warning: "#F7CB2D",
            danger: "#E10032",
            info: "#D0B49F",
        }),
        fontFamily: {
            sans: ["Graphik", "sans-serif"],
            serif: ["Merriweather", "serif"],
        },
        extend: {
            spacing: {
                128: "32rem",
                144: "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
        backgroundImage: {
            "register-intro-sm": "linear-gradient(to bottom, #274472, #416a90, #6591ab, #91b9c7, #c3e0e5)",
            "register-intro-lg": "linear-gradient(to left, #274472, #416a90, #6591ab, #91b9c7, #c3e0e5)",
        },
    },
    plugins: [],
};
