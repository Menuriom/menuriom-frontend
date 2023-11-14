import axios from "axios";
import { checkCsrf } from "../../csrf";

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

    if (!checkCsrf(event, getCookie(event, "XSRF-TOKEN"))) {
        res.writeHead(419);
        return res.end("Expired");
    }

    const params = event.context.params;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    const lang = getCookie(event, "i18n_redirected") || "fa";

    delete req.headers["content-length"];
    delete req.headers["host"];

    let statusCode = 499;
    let message = "UnknowResults";
    let transactionID = "";

    let redirectTo = lang == "en" ? "/en" : "";
    redirectTo += "/panel/payment-results?";

    await axios
        .request({
            method: req.method,
            url: `${process.env.API_BASE_URL}/panel/billing/bill-payment-callback/${params.method}?${getQueryString(event)}`,
            timeout: 15 * 1000,
            headers: { ...req.headers, "accept-language": lang, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
        })
        .then((response) => {
            statusCode = response.data.statusCode || 200;
            message = response.data.message || "SuccessfulPayment";
            transactionID = response.data.transactionID;
        })
        .catch((error) => {
            if (typeof error.response === "undefined") {
                console.error({ error });
                statusCode = 500;
                message = "InternalServerError";
            } else {
                statusCode = error.response.status;
                message = "UpstreamError";
            }
        });

    redirectTo += `statusCode=${statusCode}&message=${message}`;
    if (transactionID) redirectTo += `&transactionID=${transactionID}`;

    await sendRedirect(event, redirectTo);
});
