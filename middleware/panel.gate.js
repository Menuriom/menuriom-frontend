import axios from "axios";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const localePath = useLocalePath();

    const userStore = useUserStore();
    const user = storeToRefs(userStore);

    if (process.server) {
        // if token does not exist or its invalid then redirect to /authenticate
        const token = useCookie("AuthToken").value;
        if (!token) return navigateTo(localePath("/authenticate"));

        const req = nuxtApp.ssrContext.event.node.req;
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

        const url = `${process.env.API_BASE_URL}/user/info`;
        const headers = { ...req.headers, "x-forwarded-for": ip, serversecret: process.env.SERVER_SECRET, tt: Date.now() };

        // cheking the token validity
        const isTokenValid = await axios
            .get(url, { headers: headers })
            .then((response) => {
                user.avatar.value = response.data.avatar || "/avatar.webp";
                user.name.value = response.data.name;
                user.family.value = response.data.family;
                user.email.value = response.data.email;
                user.mobile.value = response.data.mobile;
                user.brands.value.list = response.data.brands;
                return true;
            })
            .catch((e) => {
                console.log({ e });
                return false;
            });
        if (!isTokenValid) return navigateTo(localePath("/authenticate"));
    }

    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return;

    if (process.client) {
        if (userStore.name === "" || userStore.family === "" || userStore.mobile === "") {
            const isTokenValid = await userStore
                .getUserInfo()
                .then(() => true)
                .catch((e) => false);
            if (!isTokenValid) return navigateTo(localePath("/authenticate"));
        }
    }
});
