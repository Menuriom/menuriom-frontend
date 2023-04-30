import axios from "axios";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const nuxtApp = useNuxtApp();
    const localePath = useLocalePath();

    const userStore = useUserStore();
    const user = storeToRefs(userStore);

    // TODO : base on what route check the users permission and if user not allowed then redirect them back where they came from

    if (process.server) {
    }

    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return;

    if (process.client) {
    }
});
