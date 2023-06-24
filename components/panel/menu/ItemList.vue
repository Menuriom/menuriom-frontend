<style scoped></style>

<template>
    <div class="flex flex-col w-full">
        <Draggable
            tag="ul"
            class="flex flex-col gap-4 w-full"
            v-model="dishes.list"
            @start="resetSavingOrder()"
            @end="saveOrder()"
            handle=".grab_area"
            item-key="order"
        >
            <template #item="{ element: dish, index: i }">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 rounded-lg group bg-white shadow-nr10 hover:shadow-nr15 transition-all overflow-hidden"
                >
                    <SlideMenu class="-my-2 z-10">
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            @click="toggleDishVisibility(i)"
                            v-if="checkPermissions(['main-panel.menu.items'], brand)"
                        >
                            <div class="flex items-center gap-2" v-if="!hiding">
                                <Icon class="w-4 h-4 bg-white shrink-0" name="eye-slash.svg" folder="icons/light" size="16px" />
                                <small v-if="!dish.hidden">{{ $t("panel.menu.Hide This Item") }}</small>
                                <small v-else>{{ $t("panel.menu.Make Item Visible") }}</small>
                            </div>
                            <Loading size="h-4" v-else />
                        </button>
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/${route.params.brandID}/menu/item/${dish._id}`)"
                            v-if="checkPermissions(['main-panel.menu.items'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.menu.Edit This Item") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-40" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300"
                            @click="openDeleteDialog(i)"
                            v-if="checkPermissions(['main-panel.menu.items'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.menu.Delete Item") }}</small>
                        </button>
                    </SlideMenu>
                    <div class="flex flex-col items-center justify-center gap-2 w-40 h-40 bg-pencil-tip shadow-nr15 rounded-xl">
                        <img class="w-16 h-16 mt-2" :src="dish.icon" alt="" />
                        <b class="w-full text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden text-center px-2">
                            {{ dish.translation?.[locale]?.name || dish.name }}
                        </b>
                    </div>
                    <div class="absolute top-8 start-2 flex flex-col gap-2">
                        <span class="p-1 rounded-md text-xs text-white bg-neutral-500 bg-opacity-60 shadow-md backdrop-blur-sm" v-if="dish.hidden">
                            {{ $t("panel.menu.Hidden") }}
                        </span>
                    </div>
                    <span class="grab_area absolute bottom-0 flex items-center justify-center gap-1.5 w-full h-6 hover:cursor-grab active:cursor-grabbing">
                        <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                        <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                        <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    </span>
                </li>
            </template>
        </Draggable>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.menu.Delete Menu Item')">
                <div class="flex flex-col gap-3">
                    <hr class="w-full opacity-30 mt-2" />
                    <h2 class="text-xl" v-html="$t('panel.menu.You are about to delete this item', { name: dishes.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75 -mt-2">
                        {{ $t("panel.menu.deletingMenuItemDesc") }}
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
                            <span v-if="!deleting"> {{ $t("panel.menu.Delete Menu Item") }} </span>
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

// TODO
// add scleton loading for menu item loading

// ordering with different branches and different categories selected may cuase problem with current numbering system

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

    const id = dishes.list[indexToDelete.value]._id;

    await axios
        .delete(`/api/v1/panel/menu-dishes/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            dishes.list.splice(indexToDelete.value, 1);
            panelStore.closePopUp();
            // TODO : allow user to create new dish if the number became under 200
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
const toggleDishVisibility = async (index) => {
    if (hiding.value) return;
    hiding.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = dishes.list[index]._id;
    if (!id) {
        hiding.value = false;
        return;
    }

    await axios
        .post(`/api/v1/panel/menu-dishes/hide/${id}`, {}, { headers: { brand: route.params.brandID } })
        .then((response) => {
            dishes.list[index].hidden = !dishes.list[index].hidden;
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

        const orderedDishes = dishes.list.map((item, i) => ({ _id: item._id, order: i }));

        await axios
            .post(`/api/v1/panel/menu-dishes/update-order/`, { orderedDishes }, { headers: { brand: route.params.brandID } })
            .then((response) => {
                toast.success(t("panel.menu.Menu items order updated"), { timeout: 2000, rtl: localeProperties.value.dir == "rtl" });
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

// getDishesList -------------------------------------------------
const dishes = reactive({ list: [] });
const canCreateNewDish = ref(true);
const getDishList_results = await useLazyAsyncData(() => getDishesList(route.params.brandID));
const loadingDishes = computed(() => getDishList_results.pending.value);

if (getDishList_results.error.value) handleErrors(getDishList_results.error.value);
watch(getDishList_results.error, (err) => handleErrors(err));

const handleDishList_results = (data) => {
    if (!data) return;
    dishes.list = data._items;
    canCreateNewDish.value = data._canCreateNewDish;
};
watch(getDishList_results.data, (val) => handleDishList_results(val), { immediate: process.server || nuxtApp.isHydrating });

// -------------------------------------------------
</script>
