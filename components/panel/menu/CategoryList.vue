<style scoped></style>

<template>
    <div class="flex flex-col w-full">
        <ul class="flex gap-4 w-full pb-2 overflow-auto">
            <li
                class="relative flex flex-col items-center gap-4 p-4 pb-6 rounded-lg bg-white group shadow-nr10 hover:shadow-nr15 transition-all overflow-hidden"
            >
                <div class="flex flex-col items-center justify-center gap-2 w-40 h-40 bg-pencil-tip rounded-xl">
                    <img class="w-16 h-16 mt-2" src="~/assets/images/panel-icons/grid-2-light.png" alt="" />
                    <b class="w-full text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden text-center px-2">All</b>
                </div>
                <span class="absolute bottom-0 flex items-center justify-center gap-1.5 w-full h-6 hover:cursor-grab active:cursor-grabbing">
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                </span>
            </li>
            <li
                class="relative flex flex-col items-center gap-4 p-4 rounded-lg bg-white group shadow-nr10 hover:shadow-nr15 transition-all overflow-hidden"
                v-for="(category, i) in categories.list"
                :key="i"
            >
                <SlideMenu class="-my-2 z-10">
                    <button
                        class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                        @click="openEditDialog(i)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-white shrink-0" name="eye-slash.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Hide This Category") }}</small>
                    </button>
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                        :to="localePath(`/panel/${route.params.brandID}/menu/category/${category._id}`)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Edit This Category") }}</small>
                    </nuxt-link>
                    <hr class="w-full opacity-40" />
                    <button
                        class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300"
                        @click="openDeleteDialog(i)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Delete Category") }}</small>
                    </button>
                </SlideMenu>
                <div class="flex flex-col items-center justify-center gap-2 w-40 h-40 bg-pencil-tip rounded-xl">
                    <img class="w-16 h-16 mt-2" :src="category.icon" alt="" />
                    <b class="w-full text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden text-center px-2">
                        {{ category.translation?.[locale]?.name || category.name }}
                    </b>
                </div>
                <span class="absolute bottom-0 flex items-center justify-center gap-1.5 w-full h-6 hover:cursor-grab active:cursor-grabbing">
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                </span>
            </li>
        </ul>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.menu.Delete Category')">
                <div class="flex flex-col gap-3">
                    <hr class="w-full opacity-30 my-2" />
                    <h2 class="text-xl" v-html="$t('panel.menu.You are about to delete this category', { name: categories.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75">
                        {{ $t("panel.menu.deletingCategoryDesc") }}
                    </p>
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md mt-4">
                        {{ $t("panel.brands.This action cannot be reversed") }}
                    </small>
                    <hr class="w-full opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
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
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

// TODO : category max is hard 100
// only pro tier can upload category logos : others can only pick (we need icon picker [jesus])
// icon picker : list of icons with urls and groups like drinks and salads etc

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

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getStaffList -------------------------------------------------
const categories = reactive({ list: [] });
const canCreateNewCategory = ref(true);
const getCategoryList_results = await useLazyAsyncData(() => getCategoryList(route.params.brandID));
const loadingCategories = computed(() => getCategoryList_results.pending.value);

if (getCategoryList_results.error.value) handleErrors(getCategoryList_results.error.value);
watch(getCategoryList_results.error, (err) => handleErrors(err));

const handleCategoryList_results = (data) => {
    if (!data) return;
    categories.list = data._categories;
    canCreateNewCategory.value = data._canCreateNewCategory;
};
watch(getCategoryList_results.data, (val) => handleCategoryList_results(val), { immediate: process.server || nuxtApp.isHydrating });

// -------------------------------------------------
</script>
