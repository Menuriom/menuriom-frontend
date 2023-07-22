module.exports = {
    mode: "jit",
    content: [`components/**/*.{vue,js}`, `layouts/**/*.vue`, `pages/**/*.vue`, `plugins/**/*.{js,ts}`, `app.vue`],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                violet: "#9f74cd",
                "baby-blue": "#7ecfe1",
                "pencil-tip": "#2a2a2a",
                dolphin: "#3f3f3f",
            },
            boxShadow: {
                nr5: "0 10px 20px -5px rgba(0, 0, 0, 0.05)",
                nr10: "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
                nr15: "0 10px 20px -5px rgba(0, 0, 0, 0.15)",
                nr25: "0 10px 20px -5px rgba(0, 0, 0, 0.25)",
                nr35: "0 10px 20px -5px rgba(0, 0, 0, 0.35)",
            },
            screens: {
                "1.5xs": "160px",
                "2xs": "275px",
                xs: "320px",
                "2sm": "375px",
                "1.5xl": "1440px",
                "3xl": "1680px",
                "4xl": "1920px",
            },
            spacing: {
                4.5: "1.125rem/* 18px */",
                18: "4.5rem/* 72px */",
                22: "5.5rem/* 88px */",
            },
            fontSize: {
                xxs: "10px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/container-queries")],
};
