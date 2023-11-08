import http from "http";
import https from "https";

const getFile = (req, protocol, baseUrl, ip) => {
    const headers = { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() };
    return new Promise(async (resolve, reject) => {
        protocol.get(`${baseUrl}${req.url}`, { headers: headers }, (response) => {
            if (response.statusCode >= 200 && response.statusCode < 400) resolve(response);
            else reject(response.statusCode);
        });
    });
};

export default defineEventHandler(async (event) => {
    const { req, res } = event.node;
    delete req.headers["content-length"];
    delete req.headers["host"];

    const baseUrl = process.env.API_BASE_URL;
    const protocol = baseUrl.includes("https://") ? https : http;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    const cacheAge = 60 * 60 * 24 * 15; // 15 days
    setHeader(event, "cache-control", `public, max-age=${cacheAge}, s-maxage=${cacheAge}`);

    const data = await getFile(req, protocol, baseUrl, ip).catch((e) => {});
    return await sendStream(event, data);
});
