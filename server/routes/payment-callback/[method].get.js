// import { sendStream } from "h3";
import http from "http";
import https from "https";

const getQueryString = (event) => {
    const queries = getQuery(event);
    const queryStringArray = [];

    const queryKeys = Object.keys(queries);
    for (let i = 0; i < queryKeys.length; i++) {
        const key = queryKeys[i];
        queryStringArray.push(`${key}=${queries[key]}`);
    }

    return queryStringArray.join("&");
};

export default defineEventHandler(async (event) => {
    const { req, res } = event.node;

    const lang = getCookie(event, "i18n_redirected") || "fa";

    let resStatus = 499;
    let resData = {};

    if (!checkCsrf(event, getCookie(event, "XSRF-TOKEN"))) {
        res.writeHead(419);
        return res.end("Expired");
    }

    const params = event.context.params;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    delete req.headers["content-length"];
    delete req.headers["host"];

    let errorCode = 499;
    let errorMessage = "UnknowResults";
    let redirectTo = locale == "en" ? "/en" : "";
    redirectTo += "/panel/billing/payment-results?";

    await axios
        .request({
            method: req.method,
            url: `${process.env.API_BASE_URL}/panel/billing/plan-change-payment-callback/${params.method}?${getQueryString(event)}`,
            timeout: 15 * 1000,
            headers: { ...req.headers, "accept-language": lang, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
        })
        .then((response) => {
            errorCode = response.data.errorCode;
            errorMessage = response.data.errorMessage;
        })
        .catch((error) => {
            if (typeof error.response === "undefined") {
                console.error({ error });
                errorCode = 500;
                errorMessage = "InternalServerError";
            } else {
                errorCode = error.response.status;
                errorMessage = "UpstreamError";
            }
        });

    redirectTo += `errorCode=${errorCode}&errorMessage=${errorMessage}`;
    await sendRedirect(event, redirectTo);
});
