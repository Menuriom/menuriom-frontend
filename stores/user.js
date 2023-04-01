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
            });
    };

    const setRefreshInterval = () => {
        if (isIntervalSet.value) return;
        isIntervalSet.value = true;

        const interval = setInterval(async () => {
            await axios.post(`/auth/refresh`, null, { timeout: 30 * 1000 }).catch(async (e) => {
                if (error.response.status == 401) {
                    clearInterval(interval);
                    isIntervalSet.value = false;
                }
            });
        }, refreshInterval * 1000);
    };

    const logout = async () => {
        await axios
            .post(`/auth/logout`, null, { timeout: 30 * 1000 })
            .then(() => resetUserInfo())
            .catch((e) => {});
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
        resetUserInfo,
        getUserInfo,
        setRefreshInterval,
        logout,
    };
});
