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
                :headerOptions="headerOptions"
                :searchOptions="searchOptions"
                :categoriesOptions="categoriesOptions"
                :offerOptions="offerOptions"
                :itemHeaderOptions="itemHeaderOptions"
                :itemListOptions="itemListOptions"
                :navbarOptions="navbarOptions"
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

// TODO : remove t() function from all computed properties and from head tags if any
// const title = computed(() => `${t("panel.menu-style.Menu Style Editor")} - ${t("panel.Your Menuriom Panel")}`);
// useHead({ title: title });
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
const headerOptions = reactive({
    component: "Header2",
});
const offerOptions = reactive({
    component: "Offers1",
});
const searchOptions = reactive({
    component: "Search1",
});
const categoriesOptions = reactive({
    component: "Categories1",
});
const itemHeaderOptions = reactive({
    component: "ItemHeader1",
});
const itemListOptions = reactive({
    component: "ItemList1",
});
const navbarOptions = reactive({
    component: "Navbar2",
});
</script>
