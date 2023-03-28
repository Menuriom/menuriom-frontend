export default defineNuxtRouteMiddleware(async (to, from) => {
    // if token exists, check if token is valid or not and if its valid redirect to home page

    const token = useCookie("AuthToken").value;
    if (token) {
        // cheking the token validity
        const isTokenValid = await axios
            .get(`/api/v1/users/info`)
            .then((response) => true)
            .catch((e) => false);
        if (isTokenValid) return navigateTo("/");
    }
});
