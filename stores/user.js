import { defineStore } from "pinia";
import axios from "axios";

const refreshInterval = 60 * 15; // 15 minutes

export const useUserStore = defineStore("user", () => {
    const avatar = ref("");
    const name = ref("");
    const family = ref("");
    const email = ref("");
    const mobile = ref("");
    const brands = reactive({
        list: {
            // id: {logo:"", name: "", roles: "", permissions: []},
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

        await axios
            .get(`/api/v1/user/info`, { timeout: 30 * 1000 })
            .then((response) => {
                avatar.value = response.data.avatar || "/avatar.webp";
                name.value = response.data.name;
                family.value = response.data.family;
                email.value = response.data.email;
                mobile.value = response.data.mobile;
                brands.list = response.data.brands;
            })
            .catch((e) => {
                throw e;
            })
            .finally(() => (loading.value = false));
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
            await axios.post(`/auth/refresh`, null, { timeout: 30 * 1000 }).catch((error) => {
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
