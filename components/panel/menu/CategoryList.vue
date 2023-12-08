<style scoped></style>

<template>
    <div class="flex gap-4 w-full pb-2 overflow-auto">
        <ul class="flex gap-6 w-full pb-2 overflow-auto">
            <li
                class="relative flex flex-col items-center justify-center w-48 h-48 p-4 rounded-2xl group bg-bgSecondary bg-opacity-50 shadow-nr15 hover:shadow-mr25 transition-all overflow-hidden shrink-0"
                v-for="(category, i) in filteredCategories.list"
                :key="i"
            >
                <SlideMenu class="z-10">
                    <button
                        class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                        @click="toggleCategoryVisibility(i)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <div class="flex items-center gap-2" v-if="!hiding">
                            <Icon class="w-4 h-4 bg-white shrink-0" name="eye-slash.svg" folder="icons/light" size="16px" />
                            <small v-if="!category.hidden">{{ $t("panel.menu.Hide This Category") }}</small>
                            <small v-else>{{ $t("panel.menu.Make Category Visible") }}</small>
                        </div>
                        <Loading size="h-4" v-else />
                    </button>
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                        :to="localePath(`/panel/${route.params.brandID}/menu/category/${category._id}`)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Edit This Category") }}</small>
                    </nuxt-link>
                    <hr class="w-11/12 mx-auto opacity-10" />
                    <button
                        class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30 text-red-300"
                        @click="openDeleteDialog(i)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Delete Category") }}</small>
                    </button>
                </SlideMenu>
                <div class="flex flex-col items-center justify-center gap-2 w-36 h-36 bg-bgSecondary shadow-mr25 rounded-xl">
                    <img class="w-16 h-16 mt-2" :src="category.icon" alt="" loading="lazy" />
                    <h4 class="w-full whitespace-nowrap text-ellipsis overflow-hidden text-center px-2">
                        {{ category.translation?.[locale]?.name || category.name }}
                    </h4>
                </div>
                <div class="absolute top-8 start-2 flex flex-col items-start gap-2">
                    <span class="p-1 rounded-md text-xs text-white bg-primary bg-opacity-60 shadow-md backdrop-blur-sm" v-if="category.hidden">
                        {{ $t("panel.menu.Hidden") }}
                    </span>
                    <span class="p-1 rounded-md text-xs text-white bg-secondary bg-opacity-60 shadow-md backdrop-blur-sm" v-if="category.showAsNew">
                        {{ $t("New") }}
                    </span>
                </div>
            </li>
        </ul>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.menu.Delete Category')">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2 p-4 rounded-2xl bg-bgSecondary bg-opacity-40 shadow-mr15">
                        <h2 class="text-xl" v-html="$t('panel.menu.You are about to delete this category', { name: categories.list[indexToDelete].name })" />
                        <p class="text-sm opacity-75">
                            {{ $t("panel.menu.deletingCategoryDesc") }}
                        </p>
                    </div>
                    <small class="flex items-center gap-2 text-sm text-red-200 bg-red-700 bg-opacity-10 p-4 rounded-xl shadow-inner">
                        {{ $t("panel.brands.This action cannot be reversed") }}
                    </small>
                    <hr class="w-full border-neutral-500 border-opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                    </small>
                    <div class="flex items-center gap-2 w-full">
                        <button class="btn w-full p-3 hover:px-6 rounded-xl bg-bgSecondary" :disabled="deleting" @click="panelStore.closePopUp()">
                            {{ $t("Cancel") }}
                        </button>
                        <button
                            class="btn w-full p-3 hover:px-6 rounded-xl bg-red-400"
                            :class="{ 'opacity-75 cursor-not-allowed': deleting }"
                            :disabled="deleting"
                            @click="deleteRecord()"
                        >
                            <span v-if="!deleting"> {{ $t("panel.menu.Delete Category") }} </span>
                            <Loading class="h-6" v-else />
                        </button>
                    </div>
                </div>
            </Dialog>
        </Teleport>
    </div>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import SlideMenu from "~/components/panel/SlideMenu.vue";
import Draggable from "vuedraggable";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

const emit = defineEmits(["category:length"]);

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const searchQuery = ref("");
const errorField = ref("");
const responseMessage = ref("");

// deleting ----------------------------------------
const deleting = ref(false);
const indexToDelete = ref(null);
const openDeleteDialog = (index) => {
    indexToDelete.value = index;
    panelStore.openPopUp("delete-confirmation");
};
const deleteRecord = async () => {
    if (deleting.value) return;
    deleting.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = categories.list[indexToDelete.value]._id;

    await axios
        .delete(`/api/v1/panel/menu-categories/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            categories.list.splice(indexToDelete.value, 1);
            panelStore.closePopUp();

            canCreateNewCategory.value = response.data.canCreateNewCategory;
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
            // LOGGER : log errors in sentry type thing
        })
        .finally(() => (deleting.value = false));
};
// -------------------------------------------------

// visibility ----------------------------------------
const hiding = ref(false);
const toggleCategoryVisibility = async (index) => {
    if (hiding.value) return;
    hiding.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = categories.list[index]._id;
    if (!id) {
        hiding.value = false;
        return;
    }

    await axios
        .post(`/api/v1/panel/menu-categories/hide/${id}`, {}, { headers: { brand: route.params.brandID } })
        .then((response) => {
            categories.list[index].hidden = !categories.list[index].hidden;
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
            // LOGGER : log errors in sentry type thing
            toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        })
        .finally(() => (hiding.value = false));
};
// -------------------------------------------------

// save the order ----------------------------------------
let saveOrderTimeout;
const saveOrder = () => {
    saveOrderTimeout = setTimeout(async () => {
        responseMessage.value = "";
        errorField.value = "";

        const orderedCategories = categories.list.map((item, i) => ({ _id: item._id, order: i }));

        await axios
            .post(`/api/v1/panel/menu-categories/update-order/`, { orderedCategories }, { headers: { brand: route.params.brandID } })
            .then((response) => {
                toast.success(t("panel.menu.Category order saved"), { timeout: 2000, rtl: localeProperties.value.dir == "rtl" });
            })
            .catch((err) => {
                if (typeof err.response !== "undefined" && err.response.data) {
                    const errors = err.response.data.errors || err.response.data.message;
                    if (typeof errors === "object") {
                        responseMessage.value = errors[0].errors[0];
                        errorField.value = errors[0].property;
                    }
                } else responseMessage.value = t("Something went wrong!");
                toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            });
    }, 3000);
};
const resetSavingOrder = () => {
    clearTimeout(saveOrderTimeout);
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
    // LOGGER : log errors in sentry type thing
};

// getCategoryList -------------------------------------------------
const categories = reactive({ list: [] });
const filteredCategories = reactive({ list: [] });
const canCreateNewCategory = ref(true);
const getCategoryList_results = await useAsyncData(() => getCategoryList(route.params.brandID), { lazy: false });
const loadingCategories = computed(() => getCategoryList_results.pending.value);

handleErrors(getCategoryList_results.error.value);
watch(getCategoryList_results.error, (err) => handleErrors(err));

const handleCategoryList_results = (data) => {
    if (!data) return;
    categories.list = filteredCategories.list = data._categories;
    canCreateNewCategory.value = data._canCreateNewCategory;
    emit("category:length", categories.list.length);
};
handleCategoryList_results(getCategoryList_results.data.value);
watch(getCategoryList_results.data, (val) => handleCategoryList_results(val));
// -------------------------------------------------

const search = (query) => {
    filteredCategories.list = categories.list.filter((category) => {
        return category.name.toLowerCase().includes(query) || category.translation?.[locale.value]?.name.toLowerCase().includes(query);
    });
};

defineExpose({ search });
</script>
