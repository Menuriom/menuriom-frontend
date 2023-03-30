export default defineEventHandler(async (event) => {

    // TODO : send request to back-end to make sure the session in db is revoked

    // delete the auth token
    setCookie(event, "AuthToken", "", { sameSite: "none", path: "/", httpOnly: true, secure: true, maxAge: 0 });
});
