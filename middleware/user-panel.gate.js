export default defineNuxtRouteMiddleware(async (to, from) => {
    // if token does not exist or its invalid then redirect to /authenticate
    const token = useCookie("AuthToken").value;
    if(!token) return navigateTo("/authenticate");

    // cheking the token validity
    const isTokenValid = await axios
        .get(`/api/v1/users/info`)
        .then((response) => true)
        .catch((e) => false);
    if (!isTokenValid) return navigateTo("/authenticate");
});
