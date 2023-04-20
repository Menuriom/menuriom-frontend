import { defineStore } from "pinia";

export const usePanelStore = defineStore("panel", () => {
    const sideMenuOpen = ref(true);
    const popUpOpened = ref("");

    const resetPanel = () => {
        sideMenuOpen.value = true;
        popUpOpened.value = "";
    };

    const toggleSideMenu = () => (sideMenuOpen.value = !sideMenuOpen.value);
    const updatePopUp = (title) => (popUpOpened.value = title);
    const closePopUp = () => (popUpOpened.value = '');

    return {
        sideMenuOpen,
        popUpOpened,
        resetPanel,
        toggleSideMenu,
        updatePopUp,
        closePopUp,
    };
});
