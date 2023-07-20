<style scoped>
.phone {
    width: 360px;
    height: 715px;
}
.phone .screen {
    border-radius: 3.85rem;
}
</style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/brush-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.menu-style.Menu Style Editor") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.menu-style.Style your menu that suit your restaurant scheme") }}
                </small>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <ul class="scroll-thin flex items-center gap-2 w-full pb-2 -my-1 -mb-3 overflow-auto shrink-0">
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'MainMenuStyle' }"
                @click="selectedTab = 'MainMenuStyle'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'MainMenuStyle' ? 'bg-white' : 'bg-black']"
                    name="cards-blank.svg"
                    folder="icons/light"
                    size="16px"
                />
                {{ $t("panel.menu-style.Main Menu Style") }}
            </li>
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'ItemsDialogStyle' }"
                @click="selectedTab = 'ItemsDialogStyle'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'ItemsDialogStyle' ? 'bg-white' : 'bg-black']"
                    name="list-dropdown.svg"
                    folder="icons/light"
                    size="16px"
                />
                {{ $t("panel.menu-style.Items Dialog Style") }}
            </li>
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'RestaurantDetailsPage' }"
                @click="selectedTab = 'RestaurantDetailsPage'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'RestaurantDetailsPage' ? 'bg-white' : 'bg-black']"
                    name="memo.svg"
                    folder="icons/light"
                    size="16px"
                />
                {{ $t("panel.menu-style.Restaurant Details Page") }}
            </li>
            <li
                class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-lg shrink-0 cursor-pointer"
                :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'SplashScreen' }"
                @click="selectedTab = 'SplashScreen'"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedTab === 'SplashScreen' ? 'bg-white' : 'bg-black']"
                    name="disc-drive.svg"
                    folder="icons/light"
                    size="16px"
                />
                {{ $t("panel.menu-style.Splash Screen") }}
            </li>
        </ul>
        <hr class="w-full border-gray-300 opacity-50" />
        <div class="flex flex-wrap @[1280px]:flex-nowrap items-start gap-4 w-full">
            <section class="flex flex-col items-start gap-4 w-full grow"></section>
            <div class="phone sticky @7xl:top-0 flex flex-col items-center gap-4 px-0.5 shrink-0">
                <img class="absolute top-0 w-full drop-shadow-xl z-2" width="" src="~/assets/images/Xmockup2.svg" alt="" />
                <div id="screen" class="screen flex flex-col items-center w-full h-full p-4 bg-pencil-tip text-white overflow-hidden">
                    <div id="status-bar" class="flex items-center justify-between w-full h-7 px-6 bg-dolphin grayscale">
                        <div class="text-xs text-white mix-blend-difference">12:59</div>
                        <div class="flex items-center gap-1">
                            <img class="w-4 mix-blend-difference" src="/icons/tabler/antenna-bars-5.svg" alt="" />
                            <img class="w-4 mix-blend-difference" src="/icons/tabler/wifi.svg" alt="" />
                            <img class="w-4 mix-blend-difference" src="/icons/tabler/battery-3.svg" alt="" />
                        </div>
                    </div>
                    <div id="header" class="relative flex items-center justify-between gap-2 w-full mb-2 p-2 bg-dolphin isolate overflow-hidden">
                        <img class="absolute -z-10 opacity-20 rotate-45" src="~/assets/images/pattern2.png" alt="" />
                        <div class="flex items-center gap-2">
                            <img class="w-12 h-12 p-2 object-cover bg-pencil-tip rounded-lg" :src="brand.logo" alt="" />
                            <div class="flex flex-col gap-2">
                                <h2 class="text-white text-sm font-bold">{{ brand.name }}</h2>
                                <div class="flex flex-col gap-1">
                                    <small class="bg-white opacity-50 w-14 h-0.5 rounded-full"></small>
                                    <small class="bg-white opacity-50 w-10 h-0.5 rounded-full"></small>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="flex flex-col items-center p-0.5 px-1 bg-dolphin border border-white border-opacity-30 rounded-md">
                                <img class="w-4" src="/flags/en.png" alt="en" />
                                <span class="text-[10px] text-white">En</span>
                            </div>
                            <div class="flex items-center gap-1 p-2 bg-dolphin border border-white border-opacity-30 rounded-md">
                                <Icon class="w-4 h-4 shrink-0 bg-red-400" name="map-pin-filled.svg" folder="icons/tabler" size="16px" />
                                <span class="text-xs text-white">شعبه اصلی</span>
                            </div>
                        </div>
                    </div>
                    <div id="offers" class="flex flex-col items-center justify-center gap-2 w-full p-2">
                        <div class="relative w-full p-4 rounded-lg bg-dolphin isolate overflow-hidden">
                            <!-- <img class="absolute -z-10 opacity-20" src="~/assets/images/pattern2.png" alt="" /> -->
                            <h2 class="text-2xl font-bold">Get <span class="text-stone-400">20%</span> Off</h2>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 bg-stone-500 rounded-full"></span>
                            <span class="w-2 h-2 bg-white opacity-50 rounded-full"></span>
                            <span class="w-2 h-2 bg-white opacity-50 rounded-full"></span>
                        </div>
                    </div>
                    <div id="search" class="flex items-center gap-2 w-full p-2">
                        <button class="flex items-center justify-center p-2 border border-white border-opacity-25 rounded-md" title="Show All Categories">
                            <Icon class="w-5 h-5 shrink-0 bg-white" name="layout-2.svg" folder="icons/tabler" size="20px" />
                        </button>
                        <div class="flex items-center gap-2 w-full bg-white p-2 rounded-md">
                            <Icon class="w-5 h-5 shrink-0 bg-dolphin" name="search.svg" folder="icons/tabler" size="20px" />
                            <input class="w-full text-sm" type="search" :placeholder="$t('search')" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Switch_Light from "~/components/form/Switch_Light.vue";
import QR from "~/composables/qrcodegen";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const nuxtApp = useNuxtApp();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.menu-style.Menu Style Editor")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const selectedTab = ref("MainMenuStyle");
</script>
