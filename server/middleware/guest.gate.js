export default defineEventHandler(async (event) => {
    // if (event.path !== "/authenticate") return;
    // console.log({ p: event.path });

    // TODO : if token exists, check if token is valid or not and if its valid redirect to admin page

    // const token = getCookie(event, "AuthToken");
    // if (!!token) return await sendRedirect(event, "/admin");
});
