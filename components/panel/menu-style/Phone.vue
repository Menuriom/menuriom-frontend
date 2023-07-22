<style scoped>
.phone {
    width: 360px;
    height: 715px;
}
.phone .screen {
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
    <div class="phone flex flex-col items-center gap-4 px-0.5">
        <img class="absolute top-0 w-full drop-shadow-xl z-10 pointer-events-none" width="" src="~/assets/images/Xmockup2.svg" alt="" />
        <div id="screen" class="screen flex flex-col items-center w-full p-4 bg-pencil-tip text-white overflow-auto isolate">
            <img class="absolute bottom-0 start-0 -z-10 opacity-20" src="~/assets/images/pattern2.png" alt="" />

            <div id="status-bar" class="sticky top-0 flex items-center justify-between w-full h-7 px-6 bg-dolphin grayscale z-3 shrink-0">
                <div class="text-xs text-white mix-blend-difference">12:59</div>
                <div class="flex items-center gap-1">
                    <img class="w-4 mix-blend-difference" src="/icons/tabler/antenna-bars-5.svg" alt="" />
                    <img class="w-4 mix-blend-difference" src="/icons/tabler/wifi.svg" alt="" />
                    <img class="w-4 mix-blend-difference" src="/icons/tabler/battery-3.svg" alt="" />
                </div>
            </div>

            <!-- <Header1 :brand="brand" /> -->
            <Header2 :brand="brand" />

            <Offers1 />

            <Search1 />

            <Categories1 />

            <div id="item-groups" class="flex flex-col gap-4 w-full p-2">
                <ItemHeader1 />
                <h4 class="flex items-baseline gap-1 w-full px-2 py-1.5 rounded-md bg-pencil-tip border border-white border-opacity-10 text-xs shadow-nr15">
                    <span class="w-10/12 h-1 bg-stone-400"></span>
                    <span class="text-stone-400">...</span>
                </h4>
                <ItemList1 />
            </div>

            <Navbar1 />
        </div>
    </div>
</template>

<script setup>
import Header1 from "./Header1.vue";
import Header2 from "./Header2.vue";
import Offers1 from "./Offers1.vue";
import Search1 from "./Search1.vue";
import Categories1 from "./Categories1.vue";
import Navbar1 from "./Navbar1.vue";
import ItemList1 from "./ItemList1.vue";
import ItemHeader1 from "./ItemHeader1.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});
</script>
