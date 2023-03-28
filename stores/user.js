import { defineStore, acceptHMRUpdate } from "pinia";
import axios from "axios";

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

    // const userInfo = computed(() => info);

    const getUserInfo = async () => {
        // let url = `/api/v1/users/info`;
        // if (process.server) url = `${process.env.BASE_URL}${url}`;
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
        }, 60 * 15 * 1000); // 15 minutes
    };

    const refresh = async () => {
        await axios
            .post(`/auth/refresh`, null, { timeout: 30 * 1000 })
            .then(() => {
                // await getUserInfo().catch((e) => {});
                let interval = setInterval(async () => {
                    await axios.post(`/auth/refresh`, null, { timeout: 30 * 1000 }).catch(async (e) => {
                        await logout();
                        clearInterval(interval);
                    });
                }, 60 * 15 * 1000); // 15 minutes
            })
            .catch((e) => {
                throw e;
            });
    };

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
        refresh,
        logout,
    };
});

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
// }
