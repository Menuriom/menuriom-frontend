import { defineStore } from "pinia";

export const usePanelStore = defineStore("panel", () => {
    const sideMenuOpen = ref(true);
    const popUpOpened = ref("");
    const selectedBrandId = ref("");

    const resetPanel = () => {
        sideMenuOpen.value = true;
        popUpOpened.value = "";
    };

    const toggleSideMenu = () => (sideMenuOpen.value = !sideMenuOpen.value);

    const openPopUp = (title) => (popUpOpened.value = title);
    const closePopUp = () => (popUpOpened.value = "");

    const saveSelectedBrand = () => localStorage.setItem("selectedBrandId", selectedBrandId.value);
    const loadSelectedBrand = () => localStorage.getItem("selectedBrandId");

    return {
        sideMenuOpen,
        popUpOpened,
        resetPanel,
        toggleSideMenu,
        openPopUp,
        closePopUp,
        saveSelectedBrand,
        loadSelectedBrand,
    };
});
