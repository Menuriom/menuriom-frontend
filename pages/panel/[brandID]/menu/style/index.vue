<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
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
        <div class="flex flex-wrap items-center gap-4">
            <div class="relative flex items-center justify-center">
                <span class="inline-block w-10 h-10 shadow-nr10 rounded-full" :style="`background-color: ${baseColorOptions.textColor};`"></span>
                <input class="absolute inset-0 w-full h-full rounded-full opacity-0" type="color" v-model="baseColorOptions.textColor" />
            </div>
            <div class="relative flex items-center justify-center">
                <span class="inline-block w-10 h-10 shadow-nr10 rounded-full" :style="`background-color: ${baseColorOptions.bgMainColor};`"></span>
                <input class="absolute inset-0 w-full h-full rounded-full opacity-0" type="color" v-model="baseColorOptions.bgMainColor" />
            </div>
            <div class="relative flex items-center justify-center">
                <span class="inline-block w-10 h-10 shadow-nr10 rounded-full" :style="`background-color: ${baseColorOptions.bgSecondaryColor};`"></span>
                <input class="absolute inset-0 w-full h-full rounded-full opacity-0" type="color" v-model="baseColorOptions.bgSecondaryColor" />
            </div>
            <div class="relative flex items-center justify-center">
                <span class="inline-block w-10 h-10 shadow-nr10 rounded-full" :style="`background-color: ${baseColorOptions.primaryColor};`"></span>
                <input class="absolute inset-0 w-full h-full rounded-full opacity-0" type="color" v-model="baseColorOptions.primaryColor" />
            </div>
            <div class="relative flex items-center justify-center">
                <span class="inline-block w-10 h-10 shadow-nr10 rounded-full" :style="`background-color: ${baseColorOptions.accentColor};`"></span>
                <input class="absolute inset-0 w-full h-full rounded-full opacity-0" type="color" v-model="baseColorOptions.accentColor" />
            </div>
        </div>
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
            <section class="flex flex-col items-start gap-4 w-full grow">
                <!-- ... -->
            </section>
            <Phone
                class="sticky @7xl:top-0 shrink-0"
                :selectedTab="selectedTab"
                :baseColorOptions="baseColorOptions"
                :mainMenuStyleOptions="mainMenuStyleOptions"
                :itemsDialogStyleOptions="itemsDialogStyleOptions"
                :restaurantDetailsPageOptions="restaurantDetailsPageOptions"
            />
        </div>
    </div>
</template>

<script setup>
import Phone from "@/components/panel/menu-style/Phone.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();

const panelStore = usePanelStore();
const userStore = useUserStore();

useHead({ title: `${t("panel.menu-style.Menu Style Editor")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const selectedTab = ref("MainMenuStyle");

const baseColorOptions = reactive({
    textColor: "#FCFCFD",
    bgMainColor: "#323232",
    bgSecondaryColor: "#545454",
    primaryColor: "#c1aace",
    accentColor: "#649eaf",
});

// MainMenuStyle options --------------------------------
const mainMenuStyleOptions = reactive({
    headerOptions: { component: "Header2" },
    offerOptions: { component: "Offers1" },
    searchOptions: { component: "Search1" },
    categoriesOptions: { component: "Categories1" },
    itemHeaderOptions: { component: "ItemHeader1" },
    itemListOptions: { component: "ItemList1" },
    navbarOptions: { component: "Navbar2" },
});
// -------------------------------------------

// ItemsDialogStyle options --------------------------------
const itemsDialogStyleOptions = reactive({
    frameOptions: { component: "Frame2" },
    bodyOptions: { component: "Body2" },
});
// -------------------------------------------

// RestaurantDetailsPage --------------------------------
const restaurantDetailsPageOptions = reactive({
    frameOptions: { component: "Frame3" },
    bodyOptions: { component: "Body1" },
});
// -------------------------------------------

// SplashScreen --------------------------------
// -------------------------------------------
</script>
