export default defineNuxtRouteMiddleware(async (to, from) => {
    // if token does not exist or its invalid or the user role is not admin then abort navigation
    const token = useCookie("AuthToken").value;
    if (!token) return abortNavigation();

    const user = await axios
        .get(`/api/v1/users/info`)
        .then((response) => response.data)
        .catch((e) => {});

    // cheking the token validity
    if (!user) return abortNavigation();
    // cheking if user is admin or not
    if (user.role !== "admin") return abortNavigation();
});
