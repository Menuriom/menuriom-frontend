import axios from "axios";
import { setCookie } from "h3";

export default defineEventHandler(async (event) => {
    const { req, res } = event.node;

    let resStatus = 499;
    let resData = {};

    const data = await readBody(event);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    delete req.headers["content-length"];
    delete req.headers["host"];

    await axios
        .post(
            `${process.env.API_BASE_URL}/auth/register`,
            {
                username: data.username,
                code: data.code,
                name: data.name,
                family: data.family,
                mobile: data.mobile,
                size: data.size,
            },
            { timeout: 15 * 1000, headers: { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() } }
        )
        .then((response) => {
            const maxAge = parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME_IN_SECONDS); // 1 week
            setCookie(event, "AuthToken", response.data.token, { sameSite: "none", path: "/", httpOnly: true, secure: true, maxAge: maxAge });
            resStatus = response.status;
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
        res.end(JSON.stringify(resData));
    }
});
