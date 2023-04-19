import axios from "axios";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const localePath = useLocalePath();

    if (process.server) {
        // if token exists, check if token is valid or not and if its valid redirect to home page
        const token = useCookie("AuthToken").value;
        if (!token) return;

        const req = nuxtApp.ssrContext.event.node.req;
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

        const url = `${process.env.API_BASE_URL}/user/info`;
        const headers = { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() };

        // cheking the token validity
        const isTokenValid = await axios
            .get(url, { headers: headers })
            .then((response) => true)
            .catch((e) => false);
        if (isTokenValid) return navigateTo(localePath("/"));
    }

    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return;

    if (process.client) {
        const userStore = useUserStore();
        const user = storeToRefs(userStore);
        if (user.name.value !== "" && user.family.value !== "") return navigateTo(localePath("/"));

        const isTokenValid = await userStore
            .getUserInfo()
            .then((response) => true)
            .catch((e) => false);
        if (isTokenValid) return navigateTo(localePath("/"));
    }
});
