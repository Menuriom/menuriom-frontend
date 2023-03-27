export default defineEventHandler(async (event) => {
    // delete the auth token
    setCookie(event, "AuthToken", "", { sameSite: "strict", path: "/", httpOnly: true, secure: true, maxAge: 0 });
    // redirect to main page
    await sendRedirect(event, "/");
});
