<style scoped></style>

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
