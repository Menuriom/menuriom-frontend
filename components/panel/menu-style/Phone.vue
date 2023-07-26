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
            :style="`background-color: ${baseColorOptions.bgColor}; color: ${baseColorOptions.textColor};`"
        >
            <img class="bg-image absolute bottom-0 start-0 -z-10 w-full h-96 object-contain opacity-10" src="~/assets/images/pattern2.png" alt="" />

            <div
                id="status-bar"
                class="sticky top-0 flex items-center justify-between w-full h-7 px-6 pt-1 grayscale z-3 shrink-0"
                :style="`background-color: ${baseColorOptions.primaryColor};`"
            >
                <div class="text-xs text-white mix-blend-difference">12:59</div>
                <div class="flex items-center gap-1">
                    <img class="w-4 mix-blend-difference" src="/icons/tabler/antenna-bars-5.svg" alt="" />
                    <img class="w-4 mix-blend-difference" src="/icons/tabler/wifi.svg" alt="" />
                    <img class="w-4 mix-blend-difference" src="/icons/tabler/battery-3.svg" alt="" />
                </div>
            </div>

            <component
                name="header"
                :is="headers[headerOptions.component]"
                :brand="brand"
                :baseColorOptions="baseColorOptions"
                textColor=""
                bgColor=""
                primaryColor=""
                accentColor=""
                bgImage="/patterns/pattern2.png"
                bgImageOpacity="70"
                bgImageRotation="5"
                logoRadius="50"
            />

            <Offers1 />

            <component
                name="search"
                :is="searchs[searchOptions.component]"
                :baseColorOptions="baseColorOptions"
                textColor=""
                bgColor=""
                primaryColor=""
                accentColor=""
            />

            <component
                name="categories"
                :is="categories[categoriesOptions.component]"
                :baseColorOptions="baseColorOptions"
                textColor=""
                bgColor=""
                primaryColor=""
                accentColor=""
                :icon="true"
                flow="row"
            />

            <div id="item-groups" class="flex flex-col gap-4 w-full p-2">
                <ItemHeader1 />
                <h4 class="flex items-baseline gap-1 w-full p-2 rounded-md bg-neutral-900 text-xs shadow-nr15">
                    <span class="w-10/12 h-1 my-1 bg-stone-400"></span>
                </h4>
                <!-- <ItemList1 :imageMargin="14" /> -->
                <!-- <ItemList2 :imageMargin="20" /> -->
                <ItemList3 :zigzag="true" :imageMargin="0" />
            </div>

            <!-- <Navbar1 :border="true" /> -->
            <Navbar2 :text="false" />
            <!-- <Navbar3 :text="true" /> -->

            <ItemDetails v-if="selectedTab === 'ItemsDialogStyle'" />
            <StoreInfo :brand="brand" v-if="selectedTab === 'RestaurantDetailsPage'" />
            <SplashScreen :brand="brand" v-if="selectedTab === 'SplashScreen'" />
        </div>
    </div>
</template>

<script setup>
import Offers1 from "./Offers1.vue";
import Navbar1 from "./Navbar1.vue";
import Navbar2 from "./Navbar2.vue";
import Navbar3 from "./Navbar3.vue";
import ItemList1 from "./ItemList1.vue";
import ItemList2 from "./ItemList2.vue";
import ItemList3 from "./ItemList3.vue";
import ItemHeader1 from "./ItemHeader1.vue";
import ItemDetails from "./ItemDetails.vue";
import StoreInfo from "./StoreInfo.vue";
import SplashScreen from "./SplashScreen.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const panelStore = usePanelStore();
const userStore = useUserStore();

const props = defineProps({
    selectedTab: { type: String },
    baseColorOptions: { type: Object },
    headerOptions: { type: Object },
    searchOptions: { type: Object },
    categoriesOptions: { type: Object },
});

const headers = {
    Header1: defineAsyncComponent(() => import("./Header1.vue")),
    Header2: defineAsyncComponent(() => import("./Header2.vue")),
};
const searchs = {
    Search1: defineAsyncComponent(() => import("./Search1.vue")),
};
const categories = {
    Categories1: defineAsyncComponent(() => import("./Categories1.vue")),
};

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});
</script>
