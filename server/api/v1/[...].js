import axios from "axios";
import { checkCsrf } from "../../csrf";

export default defineEventHandler(async (event) => {
    const { req, res } = event.node;

    let resStatus = 499;
    let resData = {};

    if (!checkCsrf(event, getCookie(event, "XSRF-TOKEN"))) {
        res.writeHead(419);
        return res.end("Expired");
    }

    const data = await read(event.node.req);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    delete req.headers["content-length"];
    delete req.headers["host"];

    await axios
        .request({
            method: req.method,
            url: `${process.env.API_BASE_URL}${req.url}`.replace("/api/v1/", "/"),
            data: data,
            timeout: 15 * 1000,
            headers: { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        })
        .then((response) => {
            resStatus = 200;
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
        res.end(JSON.stringify(resData));
    }
});

const read = (req) => {
    return new Promise((resolve, reject) => {
        let data = [];
        req.on("data", (chunk) => {
            if (chunk !== null && chunk !== undefined) data.push(Buffer.from(chunk));
        });
        req.on("end", () => resolve(Buffer.concat(data)));
        req.on("error", (e) => reject(e));
    });
};
