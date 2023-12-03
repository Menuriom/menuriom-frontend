<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full" ref="form">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="cards-blank.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.side-menu.Menu Editor") }}</h1>
                </div>
                <small class="hidden sm:flex gap-1 text-sm opacity-75">
                    {{ $t("panel.menu.Managing and editing your restaurant menu items and categories") }}.
                </small>
            </div>
            <div class="flex flex-wrap items-center gap-2" v-if="categoryLength">
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-fgPrimary text-bgPrimary shrink-0"
                    :to="localePath(`/panel/${panelStore.selectedBrandId}/menu/style`)"
                >
                    <Icon class="w-5 h-5 gradient" name="brush.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.Edit Menu Style") }}
                </nuxt-link>
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-fgPrimary text-bgPrimary shrink-0"
                    target="_blank"
                    :to="menuLink"
                >
                    <Icon class="w-5 h-5 gradient" name="book-open.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.View Live Menu") }}
                </nuxt-link>
            </div>
        </header>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <Search class="w-full max-w-xs" v-model="searchQuery" @search="search()" @clear:search="clearSearch()" v-if="categoryLength" />
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

        <section class="flex flex-col gap-6" name="Categories" v-show="categoryLength">
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
            <Suspense>
                <template #fallback v-if="categoryLength"><CategoryListSkeleton /></template>
                <CategoryList ref="categoryListRef" @category:length="updateCategoryLenght($event)" />
            </Suspense>
        </section>

        <section class="flex flex-col gap-6" name="Menu Items" v-show="categoryLength">
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
            <Suspense>
                <template #fallback v-if="categoryLength"><ItemListSkeleton /></template>
                <ItemList ref="itemListRef" />
            </Suspense>
        </section>

        <section
            class="flex flex-col items-center justify-center gap-6 w-full max-w-lg mx-auto p-4 md:p-10 rounded-2xl bg-bgAccent bg-opacity-50"
            v-if="!categoryLength"
        >
            <NuxtImg class="w-40" src="/img/coffee.png" width="160px" alt="coffee" />
            <div class="flex flex-col items-center gap-1">
                <h3 class="text-lg md:text-2xl font-bold gradient-text">{{ $t("panel.menu.You Have No Items Yet") }}</h3>
                <p class="text-sm md:text-base opacity-60">{{ $t("panel.menu.For creating a menu, first start by creating a category") }}</p>
            </div>
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-3 px-5 hover:px-8 rounded-xl bg-primary shrink-0"
                :to="localePath(`/panel/${route.params.brandID}/menu/category/creation`)"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.menu.New Category") }}
            </nuxt-link>
        </section>
    </div>
</template>

<script setup>
import Search from "~/components/form/Search.vue";
import SelectDropDown from "~/components/form/SelectDropDown.vue";
// const CategoryList = defineAsyncComponent(() => import("~/components/panel/menu/CategoryList.vue"));
import CategoryList from "~/components/panel/menu/CategoryList.vue";
import CategoryListSkeleton from "~/components/panel/menu/CategoryListSkeleton.vue";
// const ItemList = defineAsyncComponent(() => import("~/components/panel/menu/ItemList.vue"));
import ItemList from "~/components/panel/menu/ItemList.vue";
import ItemListSkeleton from "~/components/panel/menu/ItemListSkeleton.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.menu.Menu Editor")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.menu.Menu Editor")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const form = ref(); // Dom Ref
const categoryListRef = ref(); // Dom Ref
const itemListRef = ref(); // Dom Ref
const menuLink = `${runtimeConfig.public.MENU_BASE_URL}/${brand.value.username}`;

const categoryLength = ref(1);
const updateCategoryLenght = (e) => (categoryLength.value = e);

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
</script>
