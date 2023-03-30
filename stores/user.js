import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

const refreshInterval = 60 * 15; // 15 minutes
const initalInfo = {
    image: "",
    name: "",
    family: "",
    email: "",
    role: "",
    permissions: [],
};

export const useUserStore = defineStore("user", () => {
    const info = reactive({ ...initalInfo });
    const isIntervalSet = ref(false);

    const getUserInfo = async () => {
        await axios
            .get(`/api/v1/users/info`, { timeout: 30 * 1000 })
            .then((response) => {
                info = { ...response.data };
            })
            .catch((e) => {
                throw e;
            });
    };

    const setRefreshInterval = async () => {
        if (isIntervalSet.value) return;
        isIntervalSet.value = true;

        const interval = setInterval(async () => {
            await axios.post(`/auth/refresh`, null, { timeout: 30 * 1000 }).catch(async (e) => {
                await logout();
                clearInterval(interval);
                isIntervalSet.value = false;
            });
        }, refreshInterval * 1000);
    };

    // const refresh = async () => {
    //     await axios
    //         .post(`/auth/refresh`, null, { timeout: 30 * 1000 })
    //         .then(() => {
    //             // await getUserInfo().catch((e) => {});
    //             let interval = setInterval(async () => {
    //                 await axios.post(`/auth/refresh`, null, { timeout: 30 * 1000 }).catch(async (e) => {
    //                     await logout();
    //                     clearInterval(interval);
    //                 });
    //             }, refreshInterval * 1000);
    //         })
    //         .catch((e) => {
    //             throw e;
    //         });
    // };

    const logout = async () => {
        await axios
            .post(`/auth/logout`, null, { timeout: 30 * 1000 })
            .then(() => {
                info = { ...initalInfo };
            })
            .catch((e) => {
                throw e;
            });
    };

    return {
        info,
        isIntervalSet,
        getUserInfo,
        setRefreshInterval,
        // refresh,
        logout,
    };
});
