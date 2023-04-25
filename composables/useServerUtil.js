export const delay = (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timeout);
    });
};

export const getRequestConfig = (url, headers) => {
    if (process.server) {
        const nuxtApp = useNuxtApp();
        const { req, res } = nuxtApp.ssrContext.event.node;

        const lang = useCookie("i18n_redirected").value || "fa";
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

        delete req.headers["host"];

        url = `${process.env.API_BASE_URL}${url}`.replace("/api/v1/", "/");
        headers = { ...req.headers, "accept-language": lang, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() };
    }

    return { url, headers };
};
