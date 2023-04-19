import axios from "axios";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();

    if (process.server) {
        // if token does not exist or its invalid or the user role is not admin then abort navigation
        const token = useCookie("AuthToken").value;
        if (!token) return abortNavigation();

        const req = nuxtApp.ssrContext.event.node.req;
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

        const url = `${process.env.API_BASE_URL}/user/info`;
        const headers = { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() };

        const user = await axios
            .get(url, { headers: headers })
            .then((response) => response.data)
            .catch((e) => {});

        // cheking the token validity
        // cheking the token validity & if user is admin or not
        if (!user || user.role !== "admin") return abortNavigation();
    }

    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return;

    if (process.client) {
        const userStore = useUserStore();
        const user = storeToRefs(userStore);

        const isTokenValid = await userStore
            .getUserInfo()
            .then(() => true)
            .catch((e) => false);
        if (!isTokenValid || user.role.value !== "admin") return abortNavigation();
    }
});
