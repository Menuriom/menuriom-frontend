<style scoped></style>

<template>
    <div class="flex gap-4 w-full pb-2 overflow-auto">
        <!-- <ul class="flex gap-4 w-full pb-2 overflow-auto">
            <li class="relative flex flex-col items-center gap-4 w-48 h-44 p-4 pb-6 rounded-lg bg-white shadow-nr10 hover:shadow-nr15 transition-all">
                <div class="flex flex-col items-center justify-center gap-2 w-32 h-32 bg-pencil-tip shadow-nr15 rounded-xl">
                    <img class="w-16 h-16 mt-2" src="~/assets/images/panel-icons/grid-2-light.png" alt="" />
                    <h4 class="w-full text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden text-center px-2">All</h4>
                </div>
            </li>
        </ul> -->
        <!-- :class="{ 'flex-row-reverse': localeProperties.dir === 'rtl' }" -->
        <div class="flex max-w-max">
            <Draggable
                tag="ul"
                class="flex gap-4"
                v-model="filteredCategories.list"
                @start="resetSavingOrder()"
                @end="saveOrder()"
                handle=".grab_area"
                item-key="order"
            >
                <template #item="{ element: category, index: i }">
                    <li
                        class="relative flex flex-col items-center justify-center w-48 h-48 p-4 rounded-lg group bg-white shadow-nr10 hover:shadow-nr15 transition-all overflow-hidden"
                    >
                        <SlideMenu class="z-10">
                            <button
                                class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
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
                                class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                                :to="localePath(`/panel/${route.params.brandID}/menu/category/${category._id}`)"
                                v-if="checkPermissions(['main-panel.menu.items'], brand)"
                            >
                                <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                                <small>{{ $t("panel.menu.Edit This Category") }}</small>
                            </nuxt-link>
                            <hr class="w-full opacity-20" />
                            <button
                                class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300"
                                @click="openDeleteDialog(i)"
                                v-if="checkPermissions(['main-panel.menu.items'], brand)"
                            >
                                <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                                <small>{{ $t("panel.menu.Delete Category") }}</small>
                            </button>
                        </SlideMenu>
                        <div class="flex flex-col items-center justify-center gap-2 w-36 h-36 bg-neutral-100 shadow-inner rounded-md">
                            <img class="w-16 h-16 mt-2" :src="category.icon" alt="" loading="lazy" />
                            <h4 class="w-full text-sm text-pencil-tip whitespace-nowrap text-ellipsis overflow-hidden text-center px-2 font-semibold">
                                {{ category.translation?.[locale]?.name || category.name }}
                            </h4>
                        </div>
                        <div class="absolute top-8 start-2 flex flex-col items-start gap-2">
                            <span class="p-1 rounded-md text-xs text-white bg-neutral-500 bg-opacity-60 shadow-md backdrop-blur-sm" v-if="category.hidden">
                                {{ $t("panel.menu.Hidden") }}
                            </span>
                            <span class="p-1 rounded-md text-xs text-white bg-neutral-500 bg-opacity-60 shadow-md backdrop-blur-sm" v-if="category.showAsNew">
                                {{ $t("New") }}
                            </span>
                        </div>
                        <!-- <span class="grab_area absolute bottom-1.5 flex items-center justify-center gap-1.5 w-full h-5 hover:cursor-grab active:cursor-grabbing">
                            <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                            <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                            <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                        </span> -->
                    </li>
                </template>
            </Draggable>
        </div>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.menu.Delete Category')">
                <div class="flex flex-col gap-3">
                    <hr class="w-full opacity-30 mt-2" />
                    <h2 class="text-xl" v-html="$t('panel.menu.You are about to delete this category', { name: categories.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75 -mt-2">
                        {{ $t("panel.menu.deletingCategoryDesc") }}
                    </p>
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md mt-4">
                        {{ $t("panel.brands.This action cannot be reversed") }}
                    </small>
                    <hr class="w-full opacity-20" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                    </small>
                    <div class="flex items-center gap-2 w-full">
                        <button class="btn w-full p-3 rounded bg-dolphin" :disabled="deleting" @click="panelStore.closePopUp()">
                            {{ $t("Cancel") }}
                        </button>
                        <button
                            class="btn w-full p-3 rounded bg-red-500"
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

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

// TODO
// add scleton loading for category loading

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
            // TODO : allow user to create new category if the number became under 100
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
            // TODO : log errors in sentry type thing
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
            // TODO : log errors in sentry type thing
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
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getCategoryList -------------------------------------------------
const categories = reactive({ list: [] });
const filteredCategories = reactive({ list: [] });
const canCreateNewCategory = ref(true);
const getCategoryList_results = await useLazyAsyncData(() => getCategoryList(route.params.brandID));
const loadingCategories = computed(() => getCategoryList_results.pending.value);

if (getCategoryList_results.error.value) handleErrors(getCategoryList_results.error.value);
watch(getCategoryList_results.error, (err) => handleErrors(err));

const handleCategoryList_results = (data) => {
    if (!data) return;
    categories.list = filteredCategories.list = data._categories;
    canCreateNewCategory.value = data._canCreateNewCategory;
};
watch(getCategoryList_results.data, (val) => handleCategoryList_results(val), { immediate: process.server || nuxtApp.isHydrating });

// -------------------------------------------------

const search = (query) => {
    filteredCategories.list = categories.list.filter((category) => {
        return category.name.toLowerCase().includes(query) || category.translation?.[locale.value]?.name.toLowerCase().includes(query);
    });
};

defineExpose({ search });
</script>
