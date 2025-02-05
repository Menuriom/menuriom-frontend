const cacheAge = 60 * 60 * 24 * 365; // 1 year

export default defineNuxtConfig({
    app: {
        head: {
            title: "Menuriom | The best way to manage your restaurant",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "format-detection", content: "telephone=no" },
                { name: "description", content: "Create highly versatile online digital/QR menus" },
                { name: "theme-color", content: "#9c85b2" },
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
                // { rel: "manifest", href: "/pwa/site.webmanifest" },
                // { rel: "icon", href: "/pwa/favicon.ico" },
                // { rel: "apple-touch-icon", href: "/pwa/apple-touch-icon.png" },
                // { rel: "mask-icon", href: "/pwa/safari-pinned-tab.svg", color: "#FFFFFF" },
            ],
        },
        pageTransition: { name: "page", mode: "out-in", type: "transition", appear: true },
        layoutTransition: { name: "page", mode: "out-in", type: "transition", appear: true },
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
        transpile: ["vue-toastification"],
    },

    runtimeConfig: {
        public: {
            MENU_BASE_URL: process.env.MENU_BASE_URL,
            BASE_URL: process.env.BASE_URL,
            GOOGLE_LOGIN_CLIENT_ID: process.env.GOOGLE_LOGIN_CLIENT_ID,
            posthogPublicKey: "phc_K6FWhOYUnRVRFmKRtkH23df1SV7uypD2UxRw37id4in",
            posthogHost: "https://app.posthog.com",
        },
    },

    // vite options
    vite: {},

    devServer: {
        host: "",
    },

    nitro: {
        compressPublicAssets: true,
        routeRules: {
            "/**/*.js": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.css": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.png": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.svg": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.jpg": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.webp": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.woff": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.woff2": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/**/*.ttf": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
            "/_nuxt/**": { swr: 60 * 60 * 12, isr: true, headers: { "cache-control": `public, max-age=${cacheAge}, s-maxage=${cacheAge}` } },
        },
    },

    routeRules: {
        // "/": { swr: 60 * 60 * 12, isr: true },
        "/privacy-policy": { prerender: true },
        "/terms-of-service": { prerender: true },
        "/pricing": { swr: 60 * 60 * 12, isr: true },
        "/faqs": { prerender: true },
        "/contact-us": { prerender: true },
        "/about-us": { prerender: true },
        "/panel/**": { index: false },
    },

    i18n: {
        strategy: "prefix_except_default",
        baseUrl: process.env.BASE_URL,
        detectBrowserLanguage: false,
        // detectBrowserLanguage: {
        //     alwaysRedirect: false,
        //     useCookie: true,
        //     cookieKey: "i18n_redirected",
        //     redirectOn: "root",
        //     fallbackLocale: "fa",
        // },
        defaultLocale: "fa",
        defaultDirection: "rtl",
        lazy: true,
        langDir: "locale",
        locales: [
            { code: "fa", name: "فارسی", iso: "fa-IR", files: ["fa.js", "fa.json"], dir: "rtl", domain: process.env.BASE_FA_URL },
            { code: "en", name: "English", iso: "en-US", files: ["en.js", "en.json"], dir: "ltr", domain: process.env.BASE_EN_URL },
        ],
        compilation: {
            strictMessage: false,
            escapeHtml: false,
        },
        vueI18n: "./i18n.config.ts",
    },

    // delayHydration: {
    //     // enables nuxt-delay-hydration in dev mode for testing
    //     debug: process.env.NODE_ENV === "development",
    //     mode: "mount",
    // },

    linkChecker: { enabled: false },
    ogImage: { enabled: false },
    seoUi: { enabled: false },
    seo: { redirectToCanonicalSiteUrl: true },
    sitemap: { exclude: ["/panel/**"] },
    site: {
        name: "Menuriom",
        url: process.env.BASE_URL,
        defaultLocale: "fa",
    },

    modules: [
        // ...
        "@pinia/nuxt",
        "@nuxtjs/tailwindcss",
        "@nuxtjs/i18n",
        "@nuxt/image",
        "nuxt-swiper",
        // "nuxt-delay-hydration",
        "@nuxtseo/module",
    ],
});
