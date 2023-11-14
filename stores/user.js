import { defineStore } from "pinia";
import axios from "axios";

const refreshInterval = 60 * 10; // 10 minutes

export const useUserStore = defineStore("user", () => {
    const avatar = ref("");
    const name = ref("");
    const family = ref("");
    const email = ref("");
    const mobile = ref("");
    const brands = reactive({
        list: {
            // id: {logo:"", name: "", roles: "", permissions: [], limitations:[]},
        },
    });

    const isIntervalSet = ref(false);
    const loading = ref(false);

    const resetUserInfo = () => {
        avatar.value = "";
        name.value = "";
        family.value = "";
        email.value = "";
        mobile.value = "";
        brands.list = {};
    };

    const injectNewBrand = (brand) => {
        brands.list = { ...brands.list, ...brand };
    };

    const getUserInfo = async () => {
        if (loading.value) return;
        loading.value = true;

        const { data, error, pending } = await useFetch("/api/v1/user/info", { lazy: process.client });
        if (pending.value !== null && pending.value !== undefined) loading.value = pending.value;
        watch(pending, (pend) => (loading.value = pend));

        if (error.value) {
            if (error.value.statusCode >= 500 && process.server) console.log({ error: error.value });
            throw error.value;
        }

        fillUserData(data.value);
        watch(data, (data) => fillUserData(data));
    };

    const fillUserData = (data) => {
        if (!data) return;
        avatar.value = data.avatar || "/avatar.webp";
        name.value = data.name;
        family.value = data.family;
        email.value = data.email;
        mobile.value = data.mobile;
        brands.list = data.brands;
    };

    const refreshToken = async () => {
        if (loading.value) return;
        loading.value = true;

        await axios
            .post(`/auth/refresh`, null, { timeout: 30 * 1000 })
            .catch((e) => {
                throw e;
            })
            .finally(() => (loading.value = false));
    };

    const setRefreshInterval = () => {
        const interval = setInterval(async () => {
            await axios
                .post(`/auth/refresh`, null, { timeout: 30 * 1000 })
                .then(() => (isIntervalSet.value = true))
                .catch((error) => {
                    if (error.response && error.response.status == 401) {
                        clearInterval(interval);
                        isIntervalSet.value = false;
                    }
                });
        }, refreshInterval * 1000);
    };

    const logout = async () => {
        if (loading.value) return;
        loading.value = true;

        await axios
            .post(`/auth/logout`, null, { timeout: 30 * 1000 })
            .then(() => resetUserInfo())
            .catch((e) => {
                throw e;
            })
            .finally(() => (loading.value = false));
    };

    return {
        avatar,
        name,
        family,
        email,
        mobile,
        brands,
        isIntervalSet,
        loading,
        resetUserInfo,
        injectNewBrand,
        getUserInfo,
        refreshToken,
        setRefreshInterval,
        logout,
    };
});
