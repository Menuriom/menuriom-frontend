import axios from "axios";
import { google } from "googleapis";
import { setCookie } from "h3";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_LOGIN_CLIENT_ID,
    process.env.GOOGLE_LOGIN_CLIENT_SECRET,
    `${process.env.BASE_URL}/auth/login/google/callback`
);

const authenticateWithServer = async (req, data) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

    delete req.headers["content-length"];
    delete req.headers["host"];

    const response = await axios
        .post(
            `${process.env.API_BASE_URL}/auth/continue-with-google`,
            { ...data },
            { timeout: 15 * 1000, headers: { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() } }
        )
        .then((response) => response.data)
        .catch((error) => {
            if (typeof error.response === "undefined") console.error({ error });
            else console.error({ error: error.response.data });
            return {};
        });
    return { ...response };
};

export default defineEventHandler(async (event) => {
    const { req, res } = event.node;
    const inputs = getQuery(event);

    const locale = getCookie(event, "i18n_redirected");
    let redirectPath = locale == "en" ? "/en" : "";

    const { tokens } = await oauth2Client.getToken(inputs.code);

    await axios
        .get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`, {
            headers: { "Content-Type": "application/json", "Accept-Encoding": "application/json" },
        })
        .then(async (response) => {
            // request the back-end and set a auth-token
            const authResponse = await authenticateWithServer(req, { profile: response.data, email: response.data.email });
            if (!authResponse.token) {
                redirectPath += "/authenticate?error=1";
                return;
            }

            const maxAge = parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME_IN_SECONDS); // 1 week
            setCookie(event, "AuthToken", authResponse.token, { sameSite: "none", path: "/", httpOnly: true, secure: true, maxAge: maxAge });

            switch (authResponse.role) {
                case "admin":
                    redirectPath += "/admin-panel";
                    break;
                default:
                    redirectPath += "/user-panel";
                    break;
            }
        })
        .catch((error) => {
            if (typeof error.response === "undefined") console.error({ error });
            else console.error({ error: error.response.data });
            redirectPath += "/authenticate?error=2";
        });

    await sendRedirect(event, redirectPath);
});
