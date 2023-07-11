<style scoped></style>

<template>
    <div class="flex flex-col w-full">
        <Draggable
            tag="ul"
            class="flex flex-col gap-6 w-full"
            v-model="filteredDishes.list"
            @start="resetSavingOrder()"
            @end="saveOrder()"
            handle=".group_grab_area"
            item-key="order"
            group="categories"
        >
            <template #item="{ element: groups, index: k }">
                <div class="flex flex-col gap-3">
                    <div class="sticky top-4 flex items-center gap-1 max-w-max p-2 bg-pencil-tip text-white rounded-md shadow-nr10 z-2">
                        <Icon
                            class="group_grab_area w-5 h-5 bg-white rotate-90 hover:cursor-grab active:cursor-grabbing"
                            name="grip-dots.svg"
                            folder="icons/light"
                            size="20px"
                            v-if="!inSearchMode"
                        />
                        <img class="h-6 grayscale" :src="filteredDishes.list[k][0].category.icon" alt="" />
                        <h3 class="">
                            {{ filteredDishes.list[k][0].category.translation?.[locale]?.name || filteredDishes.list[k][0].category.name }}
                        </h3>
                        <button class="p-1.5" @click="filteredDishes.list[k][0].category.close = !filteredDishes.list[k][0].category.close">
                            <Icon
                                class="w-3 h-3 bg-violet ms-2 transition-all"
                                :class="{ '-rotate-90': filteredDishes.list[k][0].category.close }"
                                name="arrow.svg"
                                folder="icons"
                                size="12px"
                            />
                        </button>
                    </div>
                    <small class="opacity-75" v-if="!filteredDishes.list[k][1]">{{ $t("panel.menu.This Category Has No Items") }}</small>

                    <div class="dropdown-box" :class="{ open: !filteredDishes.list[k][0].category.close }">
                        <Draggable
                            tag="ul"
                            class="flex flex-col gap-3 w-full ps-3 border-s-2 border-neutral-200 overflow-hidden"
                            :class="{ 'pb-2': !filteredDishes.list[k][0].category.close }"
                            v-model="filteredDishes.list[k]"
                            @start="resetSavingOrder()"
                            @end="saveOrder()"
                            handle=".grab_area"
                            item-key="order"
                            group="items"
                        >
                            <template #item="{ element: dish, index: i }">
                                <li
                                    class="relative h-auto flex flex-wrap 2xl:flex-nowrap items-center gap-4 p-4 ps-8 rounded-lg group bg-white shadow-nr10 hover:shadow-nr15 transition-all overflow-hidden"
                                    v-if="dish._id"
                                >
                                    <h6
                                        class="absolute top-3 start-6 p-1 rounded-md text-xs text-white bg-neutral-500 bg-opacity-60 shadow-md backdrop-blur-sm"
                                        v-if="dish.showAsNew"
                                    >
                                        {{ $t("New") }}
                                    </h6>
                                    <div class="flex flex-wrap xl:flex-nowrap items-center gap-4 w-full max-w-md shrink-0">
                                        <div class="flex flex-col items-center justify-center gap-2 w-24 h-24 shadow-nr15 rounded-xl shrink-0">
                                            <img class="w-full object-contain" :src="dish.images[0]" alt="" loading="lazy" />
                                        </div>
                                        <div class="flex flex-col gap-2 w-full max-w-xs shrink-0">
                                            <h4 class="w-full font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                                                {{ dish.translation?.[locale]?.name || dish.name }}
                                            </h4>
                                            <p class="w-full -mt-1.5 text-xs whitespace-nowrap text-ellipsis overflow-hidden opacity-75">
                                                {{ dish.translation?.[locale]?.description || dish.description }}
                                            </p>
                                            <hr class="w-full" />
                                            <div class="flex flex-wrap items-center gap-1">
                                                <span class="flex items-baseline font-bold text-emerald-900 opacity-60 text-xl" dir="auto">
                                                    {{ Intl.NumberFormat(locale).format(dish.price / 1000) }}
                                                    <small class="text-sm">,{{ Array(3).fill(Intl.NumberFormat(locale).format(0)).join("") }}</small>
                                                </span>
                                                <span class="f-inter text-sm font-extralight me-2"> {{ $t("pricing.Toman") }} </span>
                                                <div
                                                    class="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-rose-600 bg-opacity-75 text-white shadow-nr15"
                                                    v-if="dish.discountActive"
                                                >
                                                    <h5 class="text-xs font-bold">{{ dish.discountPercentage }}%</h5>
                                                    <small class="font-extralight opacity-75">{{ $t("pricing.OFF") }}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-col gap-2 w-full max-w-screen-2xs shrink-0">
                                        <div
                                            class="flex items-center gap-2 max-w-max cursor-pointer"
                                            @click="toggleStates(k, i, 'hidden')"
                                            v-if="!dish[`toggling_hidden`]"
                                        >
                                            <button class="btn p-1.5 border border-neutral-400 rounded-md" :class="{ 'bg-dolphin': dish.hidden }">
                                                <Icon
                                                    class="w-4 h-4"
                                                    :class="[dish.hidden ? 'bg-white' : 'bg-black']"
                                                    name="eye-slash.svg"
                                                    folder="icons/light"
                                                    size="16px"
                                                />
                                            </button>
                                            <small class="p-2 py-1 rounded-md bg-neutral-400 bg-opacity-20 font-semibold" v-if="dish.hidden">
                                                {{ $t(`panel.menu.Item is hidden`) }}
                                            </small>
                                            <small class="" v-else>{{ $t("panel.menu.Hide this item") }}</small>
                                        </div>
                                        <Loading v-if="dish[`toggling_hidden`]" />
                                        <div
                                            class="flex items-center gap-2 max-w-max cursor-pointer"
                                            @click="toggleStates(k, i, 'soldOut')"
                                            v-if="!dish[`toggling_soldOut`]"
                                        >
                                            <button class="btn p-1.5 border border-neutral-400 rounded-md" :class="{ 'bg-dolphin': dish.soldOut }">
                                                <Icon
                                                    class="w-4 h-4"
                                                    :class="[dish.soldOut ? 'bg-white' : 'bg-black']"
                                                    name="xmark-to-slot.svg"
                                                    folder="icons/light"
                                                    size="16px"
                                                />
                                            </button>
                                            <small class="p-2 py-1 rounded-md bg-neutral-400 bg-opacity-20 font-semibold" v-if="dish.soldOut">
                                                {{ $t("SOLD OUT") }}
                                            </small>
                                            <small class="" v-else>{{ $t("panel.menu.Mark as sold out") }}</small>
                                        </div>
                                        <Loading v-if="dish[`toggling_soldOut`]" />
                                        <div
                                            class="flex items-center gap-2 max-w-max cursor-pointer"
                                            @click="toggleStates(k, i, 'pinned')"
                                            v-if="checkLimitations([['item-highlighting', true]], brand) && !dish[`toggling_pinned`]"
                                        >
                                            <button class="btn p-1.5 border border-neutral-400 rounded-md" :class="{ 'bg-dolphin': dish.pinned }">
                                                <Icon
                                                    class="w-4 h-4 -rotate-45"
                                                    :class="[dish.pinned ? 'bg-white' : 'bg-black']"
                                                    name="thumbtack.svg"
                                                    folder="icons/light"
                                                    size="16px"
                                                />
                                            </button>
                                            <small class="p-2 py-1 rounded-md bg-neutral-400 bg-opacity-20 font-semibold" v-if="dish.pinned">
                                                {{ $t(`panel.menu.Item is pinned`) }}
                                            </small>
                                            <small class="" v-else>{{ $t("panel.menu.Pin to the top of category") }}</small>
                                        </div>
                                        <Loading v-if="dish[`toggling_pinned`]" />
                                    </div>
                                    <div class="flex flex-col gap-2 w-full max-w-screen-2xs shrink-0">
                                        <h4 class="flex items-center gap-1 text-sm font-semibold">
                                            <Icon class="w-4 h-4 bg-pencil-tip" name="calendar-range.svg" folder="icons/light" size="16px" />
                                            {{ $t("panel.menu.Special Of The Day Tag") }}
                                            <span class="bg-neutral-200 h-0.5 grow"></span>
                                        </h4>
                                        <ul class="flex flex-wrap items-center gap-4 w-full" v-if="dish.specialDaysActive && dish.specialDaysList.length > 0">
                                            <li class="flex items-center gap-1 text-xs" v-for="day in dish.specialDaysList">
                                                <span class="w-2.5 h-2.5 rounded-full bg-baby-blue"></span> {{ $t(day) }}
                                            </li>
                                        </ul>
                                        <div class="flex flex-col rounded-md" v-else>
                                            <small class="opacity-75">{{ $t("panel.menu.No day is selected") }}</small>
                                            <nuxt-link
                                                class="text-violet underline underline-offset-4 text-xs"
                                                :to="localePath(`/panel/${route.params.brandID}/menu/item/${dish._id}`)"
                                            >
                                                {{ $t("panel.menu.Add this tag") }}
                                            </nuxt-link>
                                        </div>
                                    </div>
                                    <div class="flex flex-col gap-2 w-full max-w-screen-2xs">
                                        <h4 class="flex items-center gap-1 text-sm font-semibold">
                                            <Icon class="w-5 h-5 bg-black" name="falafel.svg" folder="icons/light" size="20px" />
                                            {{ $t("panel.menu.Item Variants") }}
                                            <span class="bg-neutral-200 h-0.5 grow"></span>
                                        </h4>
                                        <ul class="flex flex-col gap-1 w-full" v-if="dish.variants.length > 0">
                                            <li class="flex items-center gap-1" v-for="variant in dish.variants">
                                                <span class="w-2.5 h-2.5 rounded-full bg-yellow-600 bg-opacity-40 shrink-0"></span>
                                                <small class="me-1 whitespace-nowrap text-ellipsis overflow-hidden">
                                                    {{ variant.translation?.[locale]?.name || variant.name }}
                                                </small>
                                                <div class="flex items-center gap-1">
                                                    <small class="text-emerald-900">{{ Intl.NumberFormat(locale).format(dish.price) }}</small>
                                                    <span class="f-inter text-xs font-extralight me-2"> {{ $t("pricing.Toman") }} </span>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="flex flex-col rounded-md" v-else>
                                            <small class="opacity-75">{{ $t("panel.menu.No variants for this item") }}</small>
                                            <nuxt-link
                                                class="text-violet underline underline-offset-4 text-xs"
                                                :to="localePath(`/panel/${route.params.brandID}/menu/item/${dish._id}`)"
                                            >
                                                {{ $t("panel.menu.Add variants") }}
                                            </nuxt-link>
                                        </div>
                                    </div>
                                    <!-- <div class="flex flex-col gap-2 w-full max-w-screen-2xs">
                                <h4 class="flex items-center gap-1 text-sm font-semibold">
                                    <Icon class="w-5 h-5 bg-black" name="list-tree2.svg" folder="icons/light" size="20px" />
                                    {{ $t("panel.menu.Side Items") }}
                                    <span class="bg-neutral-200 h-0.5 grow"></span>
                                </h4>
                            </div> -->
                                    <!-- TODO : show menu item like count if limitations allows it "menu-item-like" -->
                                    <div class="flex flex-wrap md:flex-col items-center gap-4 max-w-max ms-auto shrink-0">
                                        <nuxt-link
                                            class="btn flex items-center gap-2 p-2 rounded-md bg-dolphin"
                                            :title="$t('panel.Edit')"
                                            :to="localePath(`/panel/${route.params.brandID}/menu/item/${dish._id}`)"
                                        >
                                            <Icon class="w-5 h-5 bg-stone-200 shrink-0" name="pen-to-square.svg" folder="icons/light" size="18px" />
                                        </nuxt-link>
                                        <button
                                            class="btn flex items-center gap-2 p-2 rounded-md bg-dolphin"
                                            @click="openDeleteDialog(k, i)"
                                            :title="$t('panel.Delete')"
                                        >
                                            <Icon class="w-5 h-5 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="18px" />
                                        </button>
                                    </div>
                                    <span
                                        class="grab_area absolute top-11 start-1.5 flex flex-col items-center justify-center gap-1.5 hover:cursor-grab active:cursor-grabbing shrink-0"
                                        v-if="!inSearchMode"
                                    >
                                        <Icon class="w-5 h-5 bg-black rotate-90" name="grip-dots.svg" folder="icons/light" size="20px" />
                                        <Icon class="w-5 h-5 bg-black rotate-90" name="grip-dots.svg" folder="icons/light" size="20px" />
                                    </span>
                                </li>
                            </template>
                        </Draggable>
                    </div>
                </div>
            </template>
        </Draggable>

        <span class="my-2"></span>

        <!-- TODO : add state for when there is not category or items available -->

        <Teleport to="body">
            <Dialog name="delete-item-confirmation" :title="$t('panel.menu.Delete Menu Item')">
                <div class="flex flex-col gap-3">
                    <hr class="w-full opacity-30 mt-2" />
                    <h2
                        class="text-xl"
                        v-html="
                            $t('panel.menu.You are about to delete this item', {
                                name:
                                    dishes.list[indexToDelete.k][indexToDelete.i].translation?.[locale]?.name ||
                                    dishes.list[indexToDelete.k][indexToDelete.i].name,
                            })
                        "
                    />
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md">
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

// TODO : show all items with heading of their category (one ul for every category - show all)
// and when user clicket at a category scroll to specific category heading
// user can change order of items in a category or change category by moving onto a category
// make headings sticky
// there is no need to an all category this way

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const searchQuery = ref("");

const errorField = ref("");
const responseMessage = ref("");

// deleting ----------------------------------------
const deleting = ref(false);
const indexToDelete = ref({ k: "", i: "" });
const openDeleteDialog = (indexK, indexI) => {
    indexToDelete.value.k = indexK;
    indexToDelete.value.i = indexI;
    panelStore.openPopUp("delete-item-confirmation");
};
const deleteRecord = async () => {
    if (deleting.value) return;
    deleting.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = dishes.list[indexToDelete.value.k][indexToDelete.value.i]._id;

    await axios
        .delete(`/api/v1/panel/menu-items/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            dishes.list[indexToDelete.value.k].splice(indexToDelete.value.i, 1);
            panelStore.closePopUp();
            // TODO : allow user to create new dishes if the number became under 500
        })
        .catch((err) => {
            if (typeof err.response !== "undefined" && err.response.data) {
                const errors = err.response.data.errors || err.response.data.message;
                if (typeof errors === "object") {
                    responseMessage.value = errors[0].errors[0];
                    errorField.value = errors[0].property;
                }
            } else responseMessage.value = t("Something went wrong!");
        })
        .finally(() => (deleting.value = false));
};
// -------------------------------------------------

const toggleStates = async (indexK, indexI, state = "") => {
    if (dishes.list[indexK][indexI][`toggling_${state}`] === true) return;
    dishes.list[indexK][indexI][`toggling_${state}`] = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = dishes.list[indexK][indexI]._id;

    await axios
        .post(`/api/v1/panel/menu-items/toggle-${state}/${id}`, {}, { headers: { brand: route.params.brandID } })
        .then((response) => {
            dishes.list[indexK][indexI][state] = !dishes.list[indexK][indexI][state];
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
        })
        .finally(() => (dishes.list[indexK][indexI][`toggling_${state}`] = false));
};

// save the order ----------------------------------------
let saveOrderTimeout;
const saveOrder = () => {
    saveOrderTimeout = setTimeout(async () => {
        responseMessage.value = "";
        errorField.value = "";

        const orderedGroup = [];
        for (let k = 0; k < filteredDishes.list.length; k++) {
            const categories = filteredDishes.list[k];
            orderedGroup.push({ category: { _id: categories[0].category._id, order: k }, items: [] });
            for (let i = 0; i < categories.length; i++) {
                const item = categories[i];
                if (!item._id) continue;
                orderedGroup.at(-1).items.push({ _id: item._id, order: i });
            }
        }

        await axios
            .post(`/api/v1/panel/menu-items/update-order/`, { orderedGroup }, { headers: { brand: route.params.brandID } })
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
    }, 2000);
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
const filteredDishes = reactive({ list: [] });
const canCreateNewDish = ref(true);
const getDishList_results = await useLazyAsyncData(() => getDishesList(route.params.brandID));
const loadingDishes = computed(() => getDishList_results.pending.value);

if (getDishList_results.error.value) handleErrors(getDishList_results.error.value);
watch(getDishList_results.error, (err) => handleErrors(err));

const handleDishList_results = (data) => {
    if (!data) return;
    dishes.list = filteredDishes.list = data._items;
    canCreateNewDish.value = data._canCreateNewDish;
};
watch(getDishList_results.data, (val) => handleDishList_results(val), { immediate: process.server || nuxtApp.isHydrating });

// -------------------------------------------------

const inSearchMode = ref(false);
const search = (query) => {
    // if (query) inSearchMode.value = true;
    // else inSearchMode.value = false;

    inSearchMode.value = !!query;

    filteredDishes.list = dishes.list.map((categories) => {
        return categories.filter((item, i) => {
            if (i === 0) return true;
            return (
                item.name.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.translation?.[locale.value]?.name?.toLowerCase().includes(query) ||
                item.translation?.[locale.value]?.description?.toLowerCase().includes(query)
            );
        });
    });
};

defineExpose({ search });
</script>
