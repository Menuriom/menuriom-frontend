<style scoped>
.phone {
    width: 360px;
    height: 717px;
}
.phone .screen,
.bg-image {
    border-radius: 3.85rem;
}

*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
* {
    scrollbar-width: none;
}
</style>

<template>
    <div class="phone relative flex flex-col items-center gap-4 px-0.5">
        <img class="absolute top-0 w-full drop-shadow-xl z-10 pointer-events-none" width="" src="~/assets/images/Xmockup2.svg" alt="" />
        <div
            id="screen"
            class="screen flex flex-col items-center w-full p-4 overflow-auto isolate"
            :style="`background-color: ${baseColors.bgMainColor}; color: ${baseColors.textColor};`"
        >
            <img class="bg-image absolute bottom-0 start-0 -z-10 w-full h-96 object-contain opacity-10" src="/patterns/pattern7.webp" alt="" />

            <div
                id="status-bar"
                class="sticky top-0 flex items-center justify-between w-full h-7 px-6 pt-1 grayscale z-6 shrink-0"
                :style="`background-color: ${baseColors.bgSecondaryColor};`"
            >
                <div class="text-xs text-white mix-blend-difference">12:59</div>
                <div class="flex items-center">
                    <img class="w-4.5 mix-blend-difference" src="/icons/tabler/antenna-bars-5.svg" alt="" />
                    <img class="w-4.5 mix-blend-difference" src="/icons/tabler/wifi.svg" alt="" />
                    <img class="w-4.5 mix-blend-difference" src="/icons/tabler/battery-3.svg" alt="" />
                </div>
            </div>

            <component
                name="header"
                class="z-5"
                :is="headers[mainMenuStyleOptions.headerOptions.component]"
                :brand="brand"
                :options="mainMenuStyleOptions.headerOptions"
            />

            <component
                name="offers"
                class="z-4"
                :is="offers[mainMenuStyleOptions.offerOptions.component]"
                :baseColors="baseColors"
                :options="mainMenuStyleOptions.offerOptions"
            />

            <component
                name="search"
                class="z-3"
                :is="searchs[mainMenuStyleOptions.searchOptions.component]"
                :baseColors="baseColors"
                :options="mainMenuStyleOptions.searchOptions"
            />

            <component
                name="categories"
                class="z-2"
                :class="[mainMenuStyleOptions.searchOptions.active ? 'top-20' : 'top-7']"
                :is="categories[mainMenuStyleOptions.categoriesOptions.component]"
                :baseColors="baseColors"
                :options="mainMenuStyleOptions.categoriesOptions"
            />

            <div id="item-groups" class="flex flex-col gap-4 w-full p-2">
                <component
                    name="itemHeaders"
                    :is="itemHeaders[mainMenuStyleOptions.itemHeaderOptions.component]"
                    :baseColors="baseColors"
                    :options="mainMenuStyleOptions.itemHeaderOptions"
                />
                <component
                    name="itemList"
                    :is="itemLists[mainMenuStyleOptions.itemListOptions.component]"
                    :baseColors="baseColors"
                    textColor=""
                    bgMainColor=""
                    bgSecondaryColor=""
                    primaryColor=""
                    accentColor=""
                    :zigzag="true"
                    :imageMargin="0"
                />
            </div>

            <component
                name="navbar"
                :is="navbars[mainMenuStyleOptions.navbarOptions.component]"
                :border="true"
                :options="mainMenuStyleOptions.navbarOptions"
            />

            <ItemDetails :baseColors="baseColors" :itemsDialogStyleOptions="itemsDialogStyleOptions" v-if="selectedTab === 'ItemsDialogStyle'" />
            <StoreInfo
                :brand="brand"
                :baseColors="baseColors"
                :restaurantDetailsPageOptions="restaurantDetailsPageOptions"
                v-if="selectedTab === 'RestaurantDetailsPage'"
            />
            <SplashScreen :brand="brand" :baseColors="baseColors" v-if="selectedTab === 'SplashScreen'" />
        </div>
    </div>
</template>

<script setup>
import ItemDetails from "./ItemDetails.vue";
import StoreInfo from "./StoreInfo.vue";
import SplashScreen from "./SplashScreen.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const panelStore = usePanelStore();
const userStore = useUserStore();

const props = defineProps({
    selectedTab: { type: String },
    baseColors: { type: Object },
    mainMenuStyleOptions: { type: Object },
    itemsDialogStyleOptions: { type: Object },
    restaurantDetailsPageOptions: { type: Object },
});

const headers = {
    Header1: defineAsyncComponent(() => import("./Header1.vue")),
    Header2: defineAsyncComponent(() => import("./Header2.vue")),
};
const searchs = {
    Search1: defineAsyncComponent(() => import("./Search1.vue")),
};
const offers = {
    Offers1: defineAsyncComponent(() => import("./Offers1.vue")),
};
const categories = {
    Categories1: defineAsyncComponent(() => import("./Categories1.vue")),
};
const itemHeaders = {
    ItemHeader1: defineAsyncComponent(() => import("./ItemHeader1.vue")),
    ItemHeader2: defineAsyncComponent(() => import("./ItemHeader2.vue")),
};
const itemLists = {
    ItemList1: defineAsyncComponent(() => import("./ItemList1.vue")),
    ItemList2: defineAsyncComponent(() => import("./ItemList2.vue")),
    ItemList3: defineAsyncComponent(() => import("./ItemList3.vue")),
};
const navbars = {
    Navbar1: defineAsyncComponent(() => import("./Navbar1.vue")),
    Navbar2: defineAsyncComponent(() => import("./Navbar2.vue")),
    Navbar3: defineAsyncComponent(() => import("./Navbar3.vue")),
};

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});
</script>
