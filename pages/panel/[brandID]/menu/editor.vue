<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full" ref="form">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="cards-blank.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.side-menu.Menu Editor") }}</h1>
                </div>
                <!-- <small class="hidden sm:flex gap-1 text-sm">
                    {{ $t("panel.menu.You are editing the general menu") }}.
                    <span v-html="$t('panel.menu.For', { branch: `<b>all branches</b>` })" />
                </small> -->
                <small class="hidden sm:flex gap-1 text-sm opacity-75">
                    {{ $t("panel.menu.Managing and editing your restaurant menu items and categories") }}.
                </small>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-bgSecondary shrink-0"
                    :to="localePath(`/panel/${panelStore.selectedBrandId}/menu/style`)"
                >
                    <Icon class="w-5 h-5 gradient" name="brush.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.Edit Menu Style") }}
                </nuxt-link>
                <button
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-bgSecondary shrink-0"
                    @click="panelStore.openPopUp('invite-new-member')"
                >
                    <Icon class="w-5 h-5 gradient" name="book-open.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.View Live Menu") }}
                </button>
            </div>
        </header>
        <!-- TODO : add a reset button for every branch menu that returns any branch menu to default state -->
        <!-- TODO : when editing a menu item add button to save the item for general menu or one branch specific -->
        <div class="flex flex-wrap items-center justify-between gap-4">
            <!-- TODO : add single search bar that can search both in category and menus at same time -->
            <Search class="w-full max-w-xs" v-model="searchQuery" @search="search()" @clear:search="clearSearch()" />
            <!-- <label class="flex flex-wrap items-center gap-2">
                <small class="text-sm">{{ $t("panel.menu.For Branch") }}</small>
                <SelectDropDown
                    class="w-64"
                    customPadding="px-2.5 py-2.5"
                    :formHtmlObject="form"
                    :options="[{ name: 'General Menu (all branch)', value: null }]"
                    v-slot="{ option }"
                    v-model:selected-option="forBranch"
                >
                    <span :value="option.value">{{ option.name }}</span>
                </SelectDropDown>
            </label> -->
        </div>

        <!-- <hr class="w-full border-bgSecondary" /> -->

        <section class="flex flex-col gap-6" name="Categories">
            <header class="flex flex-wrap items-center justify-between gap-4">
                <h2 class="text-xl md:text-2xl/tight font-bold">{{ $t("panel.menu.Categories") }}</h2>
                <hr class="border-bgSecondary grow" />
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary shrink-0"
                    :to="localePath(`/panel/${route.params.brandID}/menu/category/creation`)"
                >
                    <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                    {{ $t("panel.menu.New Category") }}
                </nuxt-link>
            </header>
            <CategoryList ref="categoryListRef" />
        </section>

        <!-- <hr class="w-full border-bgSecondary" /> -->

        <section class="flex flex-col gap-6" name="Menu Items">
            <header class="flex flex-wrap items-center justify-between gap-4">
                <h2 class="text-xl md:text-2xl/tight font-bold">{{ $t("panel.menu.Items") }}</h2>
                 <hr class="border-bgSecondary grow" />
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary shrink-0"
                    :to="localePath(`/panel/${route.params.brandID}/menu/item/creation`)"
                >
                    <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                    {{ $t("panel.menu.New Item") }}
                </nuxt-link>
            </header>
            <ItemList ref="itemListRef" />
        </section>

        <!-- <Teleport to="body"> </Teleport> -->
    </div>
</template>

<script setup>
import Search from "~/components/form/Search.vue";
import SelectDropDown from "~/components/form/SelectDropDown.vue";
import Loading from "~/components/Loading.vue";
// const CategoryList = defineAsyncComponent(() => import("~/components/panel/menu/CategoryList.vue"));
import CategoryList from "~/components/panel/menu/CategoryList.vue";
// const ItemList = defineAsyncComponent(() => import("~/components/panel/menu/ItemList.vue"));
import ItemList from "~/components/panel/menu/ItemList.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.menu.Menu Editor")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.menu.Menu Editor")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const form = ref(); // Dom Ref
const errorField = ref("");
const responseMessage = ref("");

const categoryListRef = ref(); // Dom Ref
const itemListRef = ref(); // Dom Ref

const forBranch = ref({ value: null, name: "General Menu (all branch)" });
const searchQuery = ref("");
const search = () => {
    const query = searchQuery.value.toLowerCase();
    itemListRef.value.search(query);
    categoryListRef.value.search(query);
};
const clearSearch = () => {
    searchQuery.value = "";
    search();
};

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};
</script>
