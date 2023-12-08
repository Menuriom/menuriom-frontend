<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="brush.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.menu-style.Menu Style Editor") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm opacity-75">
                    {{ $t("panel.menu-style.Style your menu that suit your restaurant scheme") }}
                </small>
            </div>
            <div class="flex flex-wrap items-center gap-4">
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-fgPrimary text-bgPrimary shrink-0"
                    :to="`${runtimeConfig.public.MENU_BASE_URL}/${brand.username}`"
                >
                    <Icon class="w-5 h-5 gradient" name="book-open.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.View Live Menu") }}
                </nuxt-link>
                <button class="btn flex items-center justify-center gap-2 p-3 hover:px-6 bg-primary rounded-xl text-sm" @click="saveSettings()">
                    <span class="flex items-center gap-2" v-if="!saving">
                        <Icon class="w-5 h-5 bg-fgPrimary" name="floppy-disk.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.qrcode.Save Settings") }}
                    </span>
                    <Loading v-else />
                </button>
            </div>
        </header>
        <hr class="w-full border-bgSecondary" />
        <div class="flex flex-wrap @[1280px]:flex-nowrap items-start gap-4 w-full">
            <section class="flex flex-col items-start gap-4 w-full grow">
                <div class="flex flex-wrap justify-between gap-3 w-full">
                    <ColorPicker :label="$t('panel.menu-style.text color')" v-model:color="baseColors.textColor" />
                    <ColorPicker :label="$t('panel.menu-style.background main')" v-model:color="baseColors.bgMainColor" />
                    <ColorPicker :label="$t('panel.menu-style.background accent')" v-model:color="baseColors.bgSecondaryColor" />
                    <ColorPicker :label="$t('panel.menu-style.primary color')" v-model:color="baseColors.primaryColor" />
                    <ColorPicker :label="$t('panel.menu-style.accent color')" v-model:color="baseColors.accentColor" />
                </div>
                <hr class="w-full border-bgSecondary" />
                <ul class="scroll-thin flex items-center gap-2 w-full overflow-auto shrink-0">
                    <li
                        class="btn flex items-center gap-2 text-sm p-2 px-3 hover:px-5 border-2 rounded-xl shrink-0 bg-bgAccent cursor-pointer"
                        :class="[
                            selectedTab === item.name.replaceAll(' ', '') ? 'bg-bgSecondary border-primary border-opacity-75' : 'border-bgSecondary opacity-80',
                        ]"
                        @click="selectedTab = item.name.replaceAll(' ', '')"
                        v-for="(item, i) in tabsList"
                        :key="i"
                    >
                        <Icon
                            class="w-4 h-4 shrink-0"
                            :class="[selectedTab === item.name.replaceAll(' ', '') ? 'bg-primary  shadow-md shadow-primary' : 'bg-fgPrimary']"
                            :name="item.icon"
                            folder="icons/light"
                            size="16px"
                        />
                        {{ $t(`panel.menu-style.${item.name}`) }}
                    </li>
                </ul>
                <div class="flex flex-col gap-4 w-full" v-show="selectedTab === 'MainMenuStyle'">
                    <HeaderSection :brand="brand" :base-colors="baseColors" :patterns="patterns" :headerOptions="mainMenuStyleOptions.headerOptions" />
                    <SuggestionSection
                        :brand="brand"
                        :base-colors="baseColors"
                        :patterns="patterns"
                        :suggestionsOptions="mainMenuStyleOptions.suggestionsOptions"
                    />
                    <SearchSection :brand="brand" :base-colors="baseColors" :patterns="patterns" :searchOptions="mainMenuStyleOptions.searchOptions" />
                    <CategoriesSection
                        :brand="brand"
                        :base-colors="baseColors"
                        :patterns="patterns"
                        :categoriesOptions="mainMenuStyleOptions.categoriesOptions"
                    />
                    <ItemHeaderSection
                        :brand="brand"
                        :base-colors="baseColors"
                        :patterns="patterns"
                        :itemHeaderOptions="mainMenuStyleOptions.itemHeaderOptions"
                    />
                    <ItemListSection :brand="brand" :base-colors="baseColors" :patterns="patterns" :itemListOptions="mainMenuStyleOptions.itemListOptions" />
                    <NavbarSection :brand="brand" :base-colors="baseColors" :patterns="patterns" :navbarOptions="mainMenuStyleOptions.navbarOptions" />
                </div>

                <ItemDetailsSection :base-colors="baseColors" :itemsDialogStyleOptions="itemsDialogStyleOptions" v-show="selectedTab === 'ItemsDialogStyle'" />

                <RestaurantDetailsSection
                    :brand="brand"
                    :patterns="patterns"
                    :base-colors="baseColors"
                    :restaurantDetailsPageOptions="restaurantDetailsPageOptions"
                    v-show="selectedTab === 'RestaurantDetailsPage'"
                />

                <SplashScreenSection
                    :brand="brand"
                    :patterns="patterns"
                    :base-colors="baseColors"
                    :splashScreenOptions="splashScreenOptions"
                    v-show="selectedTab === 'SplashScreen'"
                />
            </section>
            <Phone
                class="sticky @7xl:top-0 shrink-0"
                :selectedTab="selectedTab"
                :baseColors="baseColors"
                :mainMenuStyleOptions="mainMenuStyleOptions"
                :itemsDialogStyleOptions="itemsDialogStyleOptions"
                :restaurantDetailsPageOptions="restaurantDetailsPageOptions"
                :splashScreenOptions="splashScreenOptions"
            />
        </div>
    </div>
</template>

<script setup>
import ColorPicker from "@/components/form/ColorPicker.vue";
import Wrapper from "~/components/form/Wrapper.vue";
import Phone from "@/components/panel/menu-style/phone/Phone.vue";
import HeaderSection from "@/components/panel/menu-style/HeaderSection.vue";
import SuggestionSection from "@/components/panel/menu-style/SuggestionSection.vue";
import SearchSection from "@/components/panel/menu-style/SearchSection.vue";
import CategoriesSection from "@/components/panel/menu-style/CategoriesSection.vue";
import ItemHeaderSection from "~/components/panel/menu-style/ItemHeaderSection.vue";
import ItemListSection from "~/components/panel/menu-style/ItemListSection.vue";
import NavbarSection from "~/components/panel/menu-style/NavbarSection.vue";
import ItemDetailsSection from "~/components/panel/menu-style/ItemDetailsSection.vue";
import RestaurantDetailsSection from "~/components/panel/menu-style/RestaurantDetailsSection.vue";
import SplashScreenSection from "~/components/panel/menu-style/SplashScreenSection.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const nuxtApp = useNuxtApp();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

useHead({ title: `${t("panel.menu-style.Menu Style Editor")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const responseMessage = ref("");
const errorField = ref("");

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
    bgMainColor: "#303030FF",
    bgSecondaryColor: "#404040FF",
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
        bgImageFile: null,
        bgImageMode: "list",
        bgImage: "",
        bgImageSize: "30",
        bgImageOpacity: "20",
        bgImageRotation: "0",
        logoRadius: "50",
    },
    suggestionsOptions: {
        component: "Suggestions1",
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        withPattern: false,
        bgImageFile: null,
        bgImageMode: "list",
        bgImage: "",
        bgImageSize: "30",
        bgImageOpacity: "20",
        bgImageRotation: "0",
        cornerRadius: "10",
    },
    searchOptions: {
        component: "Search1",
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        primaryColor: baseColors.primaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        active: true,
    },
    categoriesOptions: {
        component: "Categories1",
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        primaryColor: baseColors.primaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        orientation: "col",
        orientations: ["row", "col"],
        cornerRadius: "10",
        withIcon: true,
    },
    itemHeaderOptions: {
        component: "ItemHeader1",
        componentList: ["ItemHeader1", "ItemHeader2"],
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        primaryColor: baseColors.primaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        withIcon: true,
        cornerRadius: "20",
    },
    itemListOptions: {
        component: "ItemList1",
        componentList: ["ItemList1", "ItemList2", "ItemList3"],
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        primaryColor: baseColors.primaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        withPattern: false,
        bgImageFile: null,
        bgImageMode: "list",
        bgImage: "",
        bgImageSize: "30",
        bgImageOpacity: "20",
        bgImageRotation: "0",
        cornerRadius: "16",
        imageMargin: "0",
        zigzag: false,
    },
    navbarOptions: {
        component: "Navbar2",
        componentList: ["Navbar1", "Navbar2", "Navbar3"],
        textColor: baseColors.textColor || "#000000ff",
        bgMainColor: baseColors.bgMainColor || "#000000ff",
        bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
        primaryColor: baseColors.primaryColor || "#000000ff",
        accentColor: baseColors.accentColor || "#000000ff",
        withText: true,
        radius: "50",
    },
});
// -------------------------------------------

// ItemsDialogStyle options --------------------------------
const itemsDialogStyleOptions = ref({
    textColor: baseColors.textColor || "#000000ff",
    bgMainColor: baseColors.bgMainColor || "#000000ff",
    bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
    primaryColor: baseColors.primaryColor || "#000000ff",
    accentColor: baseColors.accentColor || "#000000ff",
    frameComponent: "Frame2",
    frameComponentList: ["Frame1", "Frame2"],
    bodyComponent: "Body2",
    bodyComponentList: ["Body1", "Body2"],
    cornerRadius: "16",
    imageMargin: "0",
});
// -------------------------------------------

// RestaurantDetailsPage --------------------------------
const restaurantDetailsPageOptions = ref({
    textColor: baseColors.textColor || "#000000ff",
    bgMainColor: baseColors.bgMainColor || "#000000ff",
    bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
    primaryColor: baseColors.primaryColor || "#000000ff",
    accentColor: baseColors.accentColor || "#000000ff",
    frameComponent: "Frame3",
    frameComponentList: ["Frame1", "Frame2", "Frame3"],
    bodyComponent: "Body1",
    bodyComponentList: ["Body1"],
    withPattern: false,
    bgImageFile: null,
    bgImageMode: "list",
    bgImage: "",
    bgImageSize: "30",
    bgImageOpacity: "20",
    bgImageRotation: "0",
    marginTop: "0",
    cornerRadius: "16",
});
// -------------------------------------------

// SplashScreen --------------------------------
const splashScreenOptions = ref({
    textColor: baseColors.textColor || "#000000ff",
    bgMainColor: baseColors.bgMainColor || "#000000ff",
    bgSecondaryColor: baseColors.bgSecondaryColor || "#000000ff",
    primaryColor: baseColors.primaryColor || "#000000ff",
    accentColor: baseColors.accentColor || "#000000ff",
    frameComponent: "Frame3",
    frameComponentList: ["Frame1", "Frame2", "Frame3"],
    bodyComponent: "Body1",
    bodyComponentList: ["Body1"],
    withPattern: false,
    bgImageFile: null,
    bgImageMode: "list",
    bgImage: "",
    bgImageSize: "30",
    bgImageOpacity: "10",
    bgImageRotation: "0",
    cornerRadius: "16",
    withLine: true,
    lineRotation: "30",
    lineText: "Some Random Text Here To Test Scrolling - This Is Seprated By The Way",
    transition: "opacity-swing",
    transitionList: ["opacity-swing", "slide-up", "slide-left", "fall", "zoom-fade"],
});
// -------------------------------------------

// save qr code settings -------------------------------------------------
const saving = ref(false);
const saveSettings = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const data = new FormData();
    if (mainMenuStyleOptions.headerOptions.bgImageFile) data.append("headerBgImageFile", mainMenuStyleOptions.headerOptions.bgImageFile);
    if (mainMenuStyleOptions.suggestionsOptions.bgImageFile) data.append("suggestionsBgImageFile", mainMenuStyleOptions.suggestionsOptions.bgImageFile);
    if (mainMenuStyleOptions.itemListOptions.bgImageFile) data.append("itemListBgImageFile", mainMenuStyleOptions.itemListOptions.bgImageFile);
    if (restaurantDetailsPageOptions.value.bgImageFile) data.append("restaurantDetailsBgImageFile", restaurantDetailsPageOptions.value.bgImageFile);
    if (splashScreenOptions.value.bgImageFile) data.append("splashScreenBgImageFile", splashScreenOptions.value.bgImageFile);
    data.append("mainMenuStyleOptions", JSON.stringify(mainMenuStyleOptions));
    data.append("itemsDialogStyleOptions", JSON.stringify(itemsDialogStyleOptions.value));
    data.append("restaurantDetailsPageOptions", JSON.stringify(restaurantDetailsPageOptions.value));
    data.append("splashScreenOptions", JSON.stringify(splashScreenOptions.value));
    data.append("baseColors", JSON.stringify(baseColors));

    await axios
        .post(`/api/v1/panel/menu-styles`, data, { headers: { brand: route.params.brandID } })
        .then((response) => {
            toast.success(t(`panel.menu-style.style settings has been saved`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        })
        .catch((err) => {
            if (typeof err.response !== "undefined" && err.response.data) {
                const errors = err.response.data.errors || err.response.data.message;
                if (typeof errors === "object") {
                    responseMessage.value = errors[0].errors[0];
                    errorField.value = errors[0].property;
                }
            } else responseMessage.value = t("Something went wrong!");
            if (process.server) console.log({ err });
            toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        })
        .finally(() => (saving.value = false));
};
// -------------------------------------------------

const handleErrors = (err) => {
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    if (responseMessage.value && process.client) toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
    // LOGGER : log errors in sentry type thing
};

// loadMenuStyleSettings -------------------------------------------------
const loadMenuStyleSettings_results = await useFetch(`/api/v1/panel/menu-styles`, { lazy: false, headers: { brand: route.params.brandID } });
const loadingMenuStyleSettings = computed(() => loadMenuStyleSettings_results.pending.value);

handleErrors(loadMenuStyleSettings_results.error.value);
watch(loadMenuStyleSettings_results.error, (err) => handleErrors(err));

const handleLoadingMenuStyleSettings_results = (data) => {
    if (!data) return;
    if (data.menuStyles?.baseColors?.textColor) baseColors.textColor = data.menuStyles.baseColors.textColor;
    if (data.menuStyles?.baseColors?.bgMainColor) baseColors.bgMainColor = data.menuStyles.baseColors.bgMainColor;
    if (data.menuStyles?.baseColors?.bgSecondaryColor) baseColors.bgSecondaryColor = data.menuStyles.baseColors.bgSecondaryColor;
    if (data.menuStyles?.baseColors?.primaryColor) baseColors.primaryColor = data.menuStyles.baseColors.primaryColor;
    if (data.menuStyles?.baseColors?.accentColor) baseColors.accentColor = data.menuStyles.baseColors.accentColor;
    if (data.menuStyles?.mainMenuStyleOptions?.headerOptions) mainMenuStyleOptions.headerOptions = data.menuStyles.mainMenuStyleOptions.headerOptions;
    if (data.menuStyles?.mainMenuStyleOptions?.suggestionsOptions)
        mainMenuStyleOptions.suggestionsOptions = data.menuStyles.mainMenuStyleOptions.suggestionsOptions;
    if (data.menuStyles?.mainMenuStyleOptions?.searchOptions) mainMenuStyleOptions.searchOptions = data.menuStyles.mainMenuStyleOptions.searchOptions;
    if (data.menuStyles?.mainMenuStyleOptions?.categoriesOptions)
        mainMenuStyleOptions.categoriesOptions = data.menuStyles.mainMenuStyleOptions.categoriesOptions;
    if (data.menuStyles?.mainMenuStyleOptions?.itemHeaderOptions)
        mainMenuStyleOptions.itemHeaderOptions = data.menuStyles.mainMenuStyleOptions.itemHeaderOptions;
    if (data.menuStyles?.mainMenuStyleOptions?.itemListOptions) mainMenuStyleOptions.itemListOptions = data.menuStyles.mainMenuStyleOptions.itemListOptions;
    if (data.menuStyles?.mainMenuStyleOptions?.navbarOptions) mainMenuStyleOptions.navbarOptions = data.menuStyles.mainMenuStyleOptions.navbarOptions;
    if (data.menuStyles?.itemsDialogStyleOptions) itemsDialogStyleOptions.value = data.menuStyles.itemsDialogStyleOptions;
    if (data.menuStyles?.restaurantDetailsPageOptions) restaurantDetailsPageOptions.value = data.menuStyles.restaurantDetailsPageOptions;
    if (data.menuStyles?.splashScreenOptions) splashScreenOptions.value = data.menuStyles.splashScreenOptions;
};
handleLoadingMenuStyleSettings_results(loadMenuStyleSettings_results.data.value);
watch(loadMenuStyleSettings_results.data, (val) => handleLoadingMenuStyleSettings_results(val));
// -------------------------------------------------
</script>
