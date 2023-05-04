import { defineStore } from "pinia";

export const usePanelStore = defineStore("panel", () => {
    const sideMenuOpen = ref(true);
    const popUpOpened = ref("");
    const selectedBrandId = ref("");

    const resetPanel = () => {
        sideMenuOpen.value = true;
        popUpOpened.value = "";
        selectedBrandId.value = "";
    };

    const toggleSideMenu = () => (sideMenuOpen.value = !sideMenuOpen.value);

    const openPopUp = (title) => (popUpOpened.value = title);
    const closePopUp = () => (popUpOpened.value = "");

    const setSelectedBrand = (id) => {
        selectedBrandId.value = id;
        if (process.client) localStorage.setItem("selectedBrandId", selectedBrandId.value);
    };
    const loadSelectedBrand = () => (selectedBrandId.value = localStorage.getItem("selectedBrandId") || "");

    return {
        sideMenuOpen,
        popUpOpened,
        selectedBrandId,
        resetPanel,
        toggleSideMenu,
        openPopUp,
        closePopUp,
        setSelectedBrand,
        loadSelectedBrand,
    };
});
