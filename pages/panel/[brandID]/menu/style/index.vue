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
        <div class="flex flex-wrap @[1280px]:flex-nowrap items-start gap-4 w-full">
            <section class="flex flex-col items-start gap-4 w-full grow">
                <div class="flex flex-wrap gap-4">
                    <ColorPicker :label="`text color`" v-model:color="baseColorOptions.textColor" />
                    <ColorPicker :label="`background color 1`" v-model:color="baseColorOptions.bgMainColor" />
                    <ColorPicker :label="`background color 2`" v-model:color="baseColorOptions.bgSecondaryColor" />
                    <ColorPicker :label="`primary color`" v-model:color="baseColorOptions.primaryColor" />
                    <ColorPicker :label="`accent color`" v-model:color="baseColorOptions.accentColor" />
                </div>
                <!-- TODO : make this tab list a array and loop through that -->
                <ul class="scroll-thin flex items-center gap-2 w-full pb-2 -my-1 -mb-3 overflow-auto shrink-0">
                    <li
                        class="flex items-center gap-2 text-sm p-2 px-4 border-2 rounded-lg shrink-0 cursor-pointer"
                        :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'MainMenuStyle' }"
                        @click="selectedTab = 'MainMenuStyle'"
                    >
                        <Icon
                            class="w-5 h-5 shrink-0"
                            :class="[selectedTab === 'MainMenuStyle' ? 'bg-white' : 'bg-black']"
                            name="cards-blank.svg"
                            folder="icons/light"
                            size="20px"
                        />
                        {{ $t("panel.menu-style.Main Menu Style") }}
                    </li>
                    <li
                        class="flex items-center gap-2 text-sm p-2 px-4 border-2 rounded-lg shrink-0 cursor-pointer"
                        :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'ItemsDialogStyle' }"
                        @click="selectedTab = 'ItemsDialogStyle'"
                    >
                        <Icon
                            class="w-5 h-5 shrink-0"
                            :class="[selectedTab === 'ItemsDialogStyle' ? 'bg-white' : 'bg-black']"
                            name="list-dropdown.svg"
                            folder="icons/light"
                            size="20px"
                        />
                        {{ $t("panel.menu-style.Items Dialog Style") }}
                    </li>
                    <li
                        class="flex items-center gap-2 text-sm p-2 px-4 border-2 rounded-lg shrink-0 cursor-pointer"
                        :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'RestaurantDetailsPage' }"
                        @click="selectedTab = 'RestaurantDetailsPage'"
                    >
                        <Icon
                            class="w-5 h-5 shrink-0"
                            :class="[selectedTab === 'RestaurantDetailsPage' ? 'bg-white' : 'bg-black']"
                            name="memo.svg"
                            folder="icons/light"
                            size="20px"
                        />
                        {{ $t("panel.menu-style.Restaurant Details Page") }}
                    </li>
                    <li
                        class="flex items-center gap-2 text-sm p-2 px-4 border-2 rounded-lg shrink-0 cursor-pointer"
                        :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === 'SplashScreen' }"
                        @click="selectedTab = 'SplashScreen'"
                    >
                        <Icon
                            class="w-5 h-5 shrink-0"
                            :class="[selectedTab === 'SplashScreen' ? 'bg-white' : 'bg-black']"
                            name="disc-drive.svg"
                            folder="icons/light"
                            size="20px"
                        />
                        {{ $t("panel.menu-style.Splash Screen") }}
                    </li>
                </ul>
                <hr class="w-full border-gray-300 opacity-50" />
                <!-- ... -->
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h5>Header Section</h5>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                    <div class="flex flex-col gap-2 overflow-hidden">
                        <small>you can change colors for each section (make sure to unlock the color sync first)</small>
                        <div class="flex flex-wrap gap-4">
                            <ColorPicker
                                :label="`text color`"
                                v-model:color="mainMenuStyleOptions.headerOptions.textColor"
                                :baseColor="baseColorOptions.textColor"
                            />
                            <ColorPicker
                                :label="`background color 1`"
                                v-model:color="mainMenuStyleOptions.headerOptions.bgMainColor"
                                :baseColor="baseColorOptions.bgMainColor"
                            />
                            <ColorPicker
                                :label="`background color 2`"
                                v-model:color="mainMenuStyleOptions.headerOptions.bgSecondaryColor"
                                :baseColor="baseColorOptions.bgSecondaryColor"
                            />
                            <ColorPicker
                                :label="`primary color`"
                                v-model:color="mainMenuStyleOptions.headerOptions.primaryColor"
                                :baseColor="baseColorOptions.primaryColor"
                            />
                            <ColorPicker
                                :label="`accent color`"
                                v-model:color="mainMenuStyleOptions.headerOptions.accentColor"
                                :baseColor="baseColorOptions.accentColor"
                            />
                        </div>
                    </div>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h5>Offers Section</h5>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h5>Search Section</h5>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h5>Categories Section</h5>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h5>Item's Title Section</h5>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h5>Items Section</h5>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h5>Navbar Section</h5>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
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
import ColorPicker from "@/components/form/ColorPicker.vue";
import Wrapper from "~/components/form/Wrapper.vue";
import Phone from "@/components/panel/menu-style/Phone.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();

const panelStore = usePanelStore();
const userStore = useUserStore();

useHead({ title: `${t("panel.menu-style.Menu Style Editor")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const selectedTab = ref("MainMenuStyle");

const testColor = ref();

const baseColorOptions = reactive({
    textColor: "#FCFCFDFF",
    bgMainColor: "#323232FF",
    bgSecondaryColor: "#545454FF",
    primaryColor: "#C1AACEFF",
    accentColor: "#649EAFFF",
});

// MainMenuStyle options --------------------------------
const mainMenuStyleOptions = reactive({
    headerOptions: {
        component: "Header2",
        textColor: "#000000ff",
        bgMainColor: "#000000ff",
        bgSecondaryColor: "#000000ff",
        primaryColor: "#000000ff",
        accentColor: "#000000ff",
    },
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
