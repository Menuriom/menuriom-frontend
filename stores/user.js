import { defineStore } from "pinia";
import axios from "axios";

const refreshInterval = 60 * 15; // 15 minutes

export const useUserStore = defineStore("user", () => {
    const avatar = ref("");
    const name = ref("");
    const family = ref("");
    const email = ref("");
    const mobile = ref("");
    const role = ref("");
    const permissions = ref([]);

    const isIntervalSet = ref(false);
    const loading = ref(false);

    const resetUserInfo = () => {
        avatar.value = "";
        name.value = "";
        family.value = "";
        email.value = "";
        mobile.value = "";
        role.value = "";
        permissions.value = [];
    };

    const getUserInfo = async () => {
        if (loading.value) return;
        loading.value = true;

        await axios
            .get(`/api/v1/user/info`, { timeout: 30 * 1000 })
            .then((response) => {
                avatar.value = response.data.avatar;
                name.value = response.data.name;
                family.value = response.data.family;
                email.value = response.data.email;
                mobile.value = response.data.mobile;
                role.value = response.data.role;
                permissions.value = [...response.data.permissions];
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
            .catch((e) => {})
            .finally(() => (loading.value = false));
    };

    return {
        avatar,
        name,
        family,
        email,
        mobile,
        role,
        permissions,
        isIntervalSet,
        loading,
        resetUserInfo,
        getUserInfo,
        refreshToken,
        setRefreshInterval,
        logout,
    };
});
