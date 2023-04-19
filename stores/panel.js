import { defineStore } from "pinia";

export const usePanelStore = defineStore("panel", () => {
    const sideMenuOpen = ref(true);

    const resetUserInfo = () => {
        sideMenuOpen.value = true;
    };

    const toggleSideMenu = () => {
        sideMenuOpen.value = !sideMenuOpen.value;
    };

    return {
        sideMenuOpen,
        resetUserInfo,
        toggleSideMenu,
    };
});
