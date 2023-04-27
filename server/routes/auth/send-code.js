import axios from "axios";

export default defineEventHandler(async (event) => {
    const { req, res } = event.node;

    const lang = getCookie(event, "i18n_redirected") || "fa";

    let resStatus = 499;
    let resData = {};

    const data = await readBody(event);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    delete req.headers["content-length"];
    delete req.headers["host"];

    await axios
        .post(
            `${process.env.API_BASE_URL}/auth/send-code`,
            { username: data.username },
            {
                timeout: 15 * 1000,
                headers: { ...req.headers, "accept-language": lang, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
            }
        )
        .then((response) => {
            resStatus = response.status;
            resData = response.data;
        })
        .catch((error) => {
            if (typeof error.response === "undefined") {
                console.error({ error });
                return;
            }
            resStatus = error.response.status;
            resData = error.response.data;
        });

    if (200 <= resStatus && resStatus < 400) {
        return resData;
    } else {
        res.writeHead(resStatus);
        if (process.env.NODE_ENV == "production" && resStatus >= 500) res.end("Internal Server Error!!!");
        else res.end(JSON.stringify(resData));
    }
});
