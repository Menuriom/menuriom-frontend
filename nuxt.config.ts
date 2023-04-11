// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Menuriom",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "format-detection", content: "telephone=no" },
                { name: "description", content: "Create highly versatile online digital menus" },
                { name: "theme-color", content: "#9f74cd" },
            ],
            link: [
                // { rel: "manifest", href: "/pwa/site.webmanifest" },
                // { rel: "icon", href: "/pwa/favicon.ico" },
                // { rel: "apple-touch-icon", href: "/pwa/apple-touch-icon.png" },
                // { rel: "mask-icon", href: "/pwa/safari-pinned-tab.svg", color: "#FFFFFF" },
            ],
        },
        pageTransition: { name: "page", mode: "out-in" },
        layoutTransition: { name: "page", mode: "out-in" },
    },

    css: [
        // "vue-toastification/dist/index.css",
        "~/assets/css/styles.css",
    ],
    postcss: {
        plugins: {
            autoprefixer: {},
        },
    },
    build: {
        transpile: [
            // "vue-toastification",
        ],
    },

    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL,
            GOOGLE_LOGIN_CLIENT_ID: process.env.GOOGLE_LOGIN_CLIENT_ID,
        },
    },

    // vite options
    vite: {},

    nitro: {
        compressPublicAssets: true,
    },

    i18n: {
        strategy: "prefix_except_default",
        baseUrl: process.env.BASE_URL,
        // differentDomains: true,
        // detectBrowserLanguage: false,
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            redirectOn: "root",
        },
        defaultLocale: "fa",
        lazy: true,
        langDir: "locale",
        locales: [
            { code: "fa", name: "فارسی", iso: "fa-IR", file: "fa.js", dir: "rtl", domain: process.env.BASE_FA_URL },
            { code: "en", name: "English", iso: "en-US", file: "en.js", dir: "ltr", domain: process.env.BASE_EN_URL },
        ],
        vueI18n: {
            legacy: false,
        },
    },

    modules: [
        // tailwind moudle for nuxt 3
        "@nuxtjs/tailwindcss",

        // pinia moudle
        "@pinia/nuxt",

        "@nuxtjs/i18n",
    ],

    devServer: {
        // host: "dev.me",
    },
});
