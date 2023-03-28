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

    // TODO : remove this when back-end is ok
    // return { register: true };

    await axios
        .post(
            `${process.env.API_BASE_URL}/auth/verify`,
            { username: data.username, code: data.code },
            { timeout: 15 * 1000, headers: { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() } }
        )
        .then((response) => {
            if (!response.data.register) {
                const maxAge = process.env.AUTH_TOKEN_EXPIRE_TIME_IN_SECONDS; // 1 week
                setCookie(event, "AuthToken", response.data.token, { sameSite: "strict", path: "/", httpOnly: true, secure: true, maxAge: maxAge });
            }
            resData = { register: response.data.register };
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
