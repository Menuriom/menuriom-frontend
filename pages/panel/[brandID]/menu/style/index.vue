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
                <div class="flex flex-wrap gap-3">
                    <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="baseColors.textColor" />
                    <ColorPicker :label="$t('panel.menu-style.background main')" v-model:color="baseColors.bgMainColor" />
                    <ColorPicker :label="$t('panel.menu-style.background accent')" v-model:color="baseColors.bgSecondaryColor" />
                    <ColorPicker :label="$t('panel.menu-style.primary color')" v-model:color="baseColors.primaryColor" />
                    <ColorPicker :label="$t('panel.menu-style.accent color')" v-model:color="baseColors.accentColor" />
                </div>

                <ul class="scroll-thin flex items-center gap-2 w-full pb-2 -my-1 -mb-3 overflow-auto shrink-0">
                    <li
                        class="flex items-center gap-2 text-sm p-1 px-2 border-2 rounded-md shrink-0 cursor-pointer"
                        :class="{ 'border-dolphin bg-pencil-tip text-white': selectedTab === item.name.replaceAll(' ', '') }"
                        @click="selectedTab = item.name.replaceAll(' ', '')"
                        v-for="(item, i) in tabsList"
                        :key="i"
                    >
                        <Icon
                            class="w-4 h-4 shrink-0"
                            :class="[selectedTab === item.name.replaceAll(' ', '') ? 'bg-white' : 'bg-black']"
                            :name="item.icon"
                            folder="icons/light"
                            size="16px"
                        />
                        {{ $t(`panel.menu-style.${item.name}`) }}
                    </li>
                </ul>

                <hr class="w-full border-gray-300 opacity-50" />

                <HeaderSection :brand="brand" :base-colors="baseColors" :patterns="patterns" :headerOptions="mainMenuStyleOptions.headerOptions" />

                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3 class="font-bold">{{ $t("panel.menu-style.Offers Section") }}</h3>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                    <div class="flex flex-col gap-2 overflow-hidden">
                        <span class="w-full text-violet border border-neutral-500 border-opacity-25 rounded-md p-2">{{ $t("Coming soon") }}...</span>
                    </div>
                </Wrapper>

                <SearchSection :brand="brand" :base-colors="baseColors" :patterns="patterns" :searchOptions="mainMenuStyleOptions.searchOptions" />

               
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3>Categories Section</h3>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3>Item's Title Section</h3>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3>Items Section</h3>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
                <Wrapper class="flex flex-col gap-2 w-full p-4 bg-white rounded-lg shadow-nr5">
                    <template #title>
                        <div class="flex items-center justify-between gap-2 w-full">
                            <h3>Navbar Section</h3>
                            <span class="h-0.5 bg-neutral-200 grow"></span>
                            <Icon class="w-5 h-5 bg-pencil-tip -rotate-90" name="caret-left.svg" folder="icons/tabler" size="20px" />
                        </div>
                    </template>
                </Wrapper>
            </section>
            <Phone
                class="sticky @7xl:top-0 shrink-0"
                :selectedTab="selectedTab"
                :baseColors="baseColors"
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
import Phone from "@/components/panel/menu-style/phone/Phone.vue";
import HeaderSection from "@/components/panel/menu-style/HeaderSection.vue";
import SearchSection from "@/components/panel/menu-style/SearchSection.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();

const panelStore = usePanelStore();
const userStore = useUserStore();

useHead({ title: `${t("panel.menu-style.Menu Style Editor")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const selectedTab = ref("MainMenuStyle");
const tabsList = ref([
    { name: "Main Menu Style", icon: "cards-blank.svg" },
    { name: "Items Dialog Style", icon: "list-dropdown.svg" },
    { name: "Restaurant Details Page", icon: "memo.svg" },
    { name: "Splash Screen", icon: "disc-drive.svg" },
]);

const patterns = ref([
    "/patterns/pattern3.webp",
    "/patterns/pattern4.webp",
    "/patterns/pattern5.webp",
    "/patterns/pattern6.webp",
    "/patterns/pattern7.webp",
    "/patterns/pattern8.webp",
    "/patterns/pattern9.webp",
    "/patterns/pattern10.webp",
    "/patterns/pattern11.webp",
    "/patterns/pattern12.webp",
    "/patterns/pattern13.webp",
    "/patterns/pattern14.webp",
]);

const baseColors = reactive({
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
        componentList: ["Header1", "Header2"],
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        primaryColor: baseColors.primaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        withPattern: false,
        bgImage: "",
        bgImageSize: "30",
        bgImageOpacity: "20",
        bgImageRotation: "0",
        logoRadius: "50",
    },
    offerOptions: { component: "Offers1" },
    searchOptions: {
        component: "Search1",
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        primaryColor: baseColors.primaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        active: true,
    },
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
