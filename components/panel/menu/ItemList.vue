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
                <div class="flex flex-col gap-3 rounded-3xl">
                    <div class="sticky -top-3 flex items-center gap-2 w-full px-2 bg-bgSecondary rounded-2xl shadow-nr10 z-2">
                        <div class="group_grab_area">
                            <Icon
                                class="w-5 h-5 bg-secondary rotate-90 hover:cursor-grab active:cursor-grabbing"
                                name="grip-dots.svg"
                                folder="icons/light"
                                size="20px"
                                v-if="!inSearchMode"
                            />
                        </div>
                        <img class="h-7" :src="filteredDishes.list[k][0].category.icon" alt="" />
                        <h3 class="shrink-0">
                            {{ filteredDishes.list[k][0].category.translation?.[locale]?.name || filteredDishes.list[k][0].category.name }}
                        </h3>
                        <button
                            class="flex items-center gap-2 w-full py-3.5"
                            @click="filteredDishes.list[k][0].category.close = !filteredDishes.list[k][0].category.close"
                        >
                            <span class="h-0.5 bg-primary bg-opacity-5 w-full grow"></span>
                            <Icon
                                class="w-5 h-5 bg-primary transition-all"
                                :class="{ 'rotate-90': filteredDishes.list[k][0].category.close }"
                                name="caret-left.svg"
                                folder="icons/tabler"
                                size="24px"
                            />
                        </button>
                    </div>
                    <small class="opacity-75" v-if="!filteredDishes.list[k][1]">{{ $t("panel.menu.This Category Has No Items") }}</small>

                    <div class="dropdown-box" :class="{ open: !filteredDishes.list[k][0].category.close }">
                        <div class="w-full rounded-2xl overflow-hidden">
                            <Draggable
                                tag="ul"
                                class="flex flex-col gap-3 w-full"
                                v-model="filteredDishes.list[k]"
                                @start="resetSavingOrder()"
                                @end="saveOrder()"
                                handle=".grab_area"
                                item-key="order"
                                group="items"
                            >
                                <template #item="{ element: dish, index: i }">
                                    <li
                                        class="relative flex flex-col md:flex-row items-center md:items-stretch flex-wrap @6xl:flex-nowrap gap-4 p-4 ps-9 rounded-2xl group bg-bgAccent shadow-mr35 transition-all overflow-hidden"
                                        v-if="dish._id"
                                    >
                                        <div class="flex flex-col gap-4 w-full max-w-lg">
                                            <div class="flex flex-wrap 2sm:flex-nowrap items-center gap-4 w-full max-w-lg shrink-0">
                                                <img
                                                    class="w-28 aspect-square object-cover rounded-xl bg-fgPrimary"
                                                    :src="dish.images[0]"
                                                    alt=""
                                                    loading="lazy"
                                                />
                                                <div class="flex flex-col gap-3 w-full overflow-hidden">
                                                    <div class="flex flex-col gap-1 bg-bgSecondary bg-opacity-50 p-2.5 rounded-xl shadow-mr15">
                                                        <h4 class="w-full font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                                                            {{ dish.translation?.[locale]?.name || dish.name }}
                                                        </h4>
                                                        <p class="w-full text-xs whitespace-nowrap text-ellipsis overflow-hidden opacity-75">
                                                            {{ dish.translation?.[locale]?.description || dish.description }}
                                                        </p>
                                                    </div>
                                                    <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                                                        <div class="flex flex-wrap gap-3">
                                                            <span class="flex items-baseline font-bold text-emerald-300 text-2xl" dir="auto">
                                                                {{ Intl.NumberFormat(locale).format(dish.price) }}
                                                            </span>
                                                            <span class="f-inter text-sm font-extralight -ms-2"> {{ currency }} </span>
                                                            <div
                                                                class="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-rose-400 bg-opacity-75 text-white shadow-nr10 shadow-rose-900"
                                                                v-if="dish.discountActive"
                                                            >
                                                                <h5 class="text-xs font-bold">{{ dish.discountPercentage }}%</h5>
                                                                <small class="font-extralight opacity-75">{{ $t("pricing.OFF") }}</small>
                                                            </div>
                                                        </div>
                                                        <div class="flex items-center gap-1 p-1 px-2 bg-bgPrimary rounded-full">
                                                            <b class="text-sm md:text-base">{{ Intl.NumberFormat(locale).format(dish.likes) }}</b>
                                                            <Icon
                                                                class="w-4 h-4 bg-rose-400 shrink-0"
                                                                name="heart-filled.svg"
                                                                folder="icons/tabler"
                                                                size="16px"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="flex flex-wrap items-center gap-2 w-full">
                                                <button
                                                    class="btn flex items-center gap-2 p-2 hover:px-4 border border-bgSecondary rounded-xl cursor-pointer"
                                                    :class="{ 'bg-fgPrimary text-bgPrimary': dish.hidden }"
                                                    @click="toggleStates(k, i, 'hidden')"
                                                    v-if="!dish[`toggling_hidden`]"
                                                >
                                                    <Icon
                                                        class="w-4 h-4"
                                                        :class="[dish.hidden ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                                        name="eye-slash.svg"
                                                        folder="icons/light"
                                                        size="16px"
                                                    />
                                                    <small class="" v-if="dish.hidden"> {{ $t(`panel.menu.Item is hidden`) }} </small>
                                                    <small class="" v-else> {{ $t("panel.menu.Hide this item") }} </small>
                                                </button>
                                                <Loading v-if="dish[`toggling_hidden`]" />
                                                <button
                                                    class="btn flex items-center gap-2 p-2 hover:px-4 border border-bgSecondary rounded-xl cursor-pointer"
                                                    :class="{ 'bg-fgPrimary text-bgPrimary': dish.soldOut }"
                                                    @click="toggleStates(k, i, 'soldOut')"
                                                    v-if="hasItemHighlighting && !dish[`toggling_soldOut`]"
                                                >
                                                    <Icon
                                                        class="w-4 h-4"
                                                        :class="[dish.soldOut ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                                        name="xmark-to-slot.svg"
                                                        folder="icons/light"
                                                        size="16px"
                                                    />
                                                    <small class=""> {{ $t("SOLD OUT") }} </small>
                                                    <!-- <small class="" v-else> {{ $t("panel.menu.Mark as sold out") }} </small> -->
                                                </button>
                                                <Loading v-if="dish[`toggling_soldOut`]" />
                                                <button
                                                    class="btn flex items-center gap-2 p-2 hover:px-4 border border-bgSecondary rounded-xl cursor-pointer"
                                                    :class="{ 'bg-fgPrimary text-bgPrimary': dish.pinned }"
                                                    @click="toggleStates(k, i, 'pinned')"
                                                    v-if="hasItemHighlighting && !dish[`toggling_pinned`]"
                                                >
                                                    <Icon
                                                        class="w-4 h-4 -rotate-45"
                                                        :class="[dish.pinned ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                                        name="thumbtack.svg"
                                                        folder="icons/light"
                                                        size="16px"
                                                    />
                                                    <small class=""> {{ $t(`panel.menu.Mark as suggested`) }} </small>
                                                </button>
                                                <Loading v-if="dish[`toggling_pinned`]" />
                                                <button
                                                    class="btn flex items-center gap-2 p-2 hover:px-4 border border-bgSecondary rounded-xl cursor-pointer"
                                                    :class="{ 'bg-fgPrimary text-bgPrimary': dish.showAsNew }"
                                                    @click="toggleStates(k, i, 'showAsNew')"
                                                    v-if="hasItemHighlighting && !dish[`toggling_showAsNew`]"
                                                >
                                                    <Icon
                                                        class="w-4 h-4"
                                                        :class="[dish.showAsNew ? 'bg-primary' : 'bg-fgPrimary bg-opacity-30']"
                                                        name="new.svg"
                                                        folder="icons/light"
                                                        size="16px"
                                                    />
                                                    <small class=""> {{ $t(`panel.menu.New Item`) }} </small>
                                                </button>
                                                <Loading v-if="dish[`toggling_showAsNew`]" />
                                            </div>
                                        </div>

                                        <div class="flex flex-col gap-4 w-full max-w-screen-2xs p-3 rounded-2xl border border-bgSecondary border-opacity-50">
                                            <h4 class="flex items-center gap-1 text-sm font-semibold">
                                                <Icon class="w-5 h-5 gradient" name="calendar-range.svg" folder="icons/light" size="20px" />
                                                {{ $t("panel.menu.Special Of The Day Tag") }}
                                                <span class="bg-fgPrimary bg-opacity-10 h-0.5 grow"></span>
                                            </h4>
                                            <ul
                                                class="flex flex-wrap items-center gap-2 w-full"
                                                v-if="dish.specialDaysActive && dish.specialDaysList.length > 0"
                                            >
                                                <li
                                                    class="flex items-center gap-2 text-xs bg-secondary bg-opacity-60 p-1 px-2 rounded-lg"
                                                    v-for="day in dish.specialDaysList"
                                                >
                                                    <span class="w-2.5 h-2.5 rounded-full bg-bgPrimary bg-opacity-30"></span> {{ $t(day) }}
                                                </li>
                                            </ul>
                                            <div class="flex flex-col rounded-md" v-else>
                                                <small class="opacity-75">{{ $t("panel.menu.No day is selected") }}</small>
                                                <nuxt-link
                                                    class="text-primary underline underline-offset-4 text-xs"
                                                    :to="localePath(`/panel/${route.params.brandID}/menu/item/${dish._id}`)"
                                                >
                                                    {{ $t("panel.menu.Add this tag") }}
                                                </nuxt-link>
                                            </div>
                                        </div>

                                        <div class="flex flex-col gap-4 w-full max-w-screen-2xs p-3 rounded-2xl border border-bgSecondary border-opacity-50">
                                            <h4 class="flex items-center gap-1 text-sm font-semibold">
                                                <Icon class="w-5 h-5 gradient" name="falafel.svg" folder="icons/light" size="20px" />
                                                {{ $t("panel.menu.Item Variants") }}
                                                <span class="bg-fgPrimary bg-opacity-10 h-0.5 grow"></span>
                                            </h4>
                                            <ul class="flex flex-col gap-1 w-full" v-if="dish.variants.length > 0">
                                                <li class="flex items-center gap-1" v-for="variant in dish.variants">
                                                    <span class="w-2.5 h-2.5 rounded-full bg-primary shrink-0"></span>
                                                    <small class="me-1 whitespace-nowrap text-ellipsis overflow-hidden">
                                                        {{ variant.translation?.[locale]?.name || variant.name }}
                                                    </small>
                                                    <span class="w-1 h-0.5 rounded-full bg-bgPrimary grow"></span>
                                                    <div class="flex items-center gap-1">
                                                        <small class="text-emerald-300">{{ Intl.NumberFormat(locale).format(dish.price) }}</small>
                                                        <span class="f-inter text-xs font-extralight me-2"> {{ $t("pricing.Toman") }} </span>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="flex flex-col rounded-md" v-else>
                                                <small class="opacity-75">{{ $t("panel.menu.No variants for this item") }}</small>
                                                <nuxt-link
                                                    class="text-primary underline underline-offset-4 text-xs"
                                                    :to="localePath(`/panel/${route.params.brandID}/menu/item/${dish._id}`)"
                                                >
                                                    {{ $t("panel.menu.Add variants") }}
                                                </nuxt-link>
                                            </div>
                                        </div>
                                        <div class="flex flex-wrap md:flex-col items-center gap-4 md:ms-auto shrink-0">
                                            <nuxt-link
                                                class="btn flex items-center gap-2 p-3 rounded-xl border border-bgSecondary hover:bg-sky-300 group/btn"
                                                :title="$t('panel.Edit')"
                                                :to="localePath(`/panel/${route.params.brandID}/menu/item/${dish._id}`)"
                                            >
                                                <Icon
                                                    class="w-5 h-5 bg-sky-200 group-hover/btn:bg-bgPrimary shrink-0"
                                                    name="pen-to-square.svg"
                                                    folder="icons/light"
                                                    size="18px"
                                                />
                                            </nuxt-link>
                                            <button
                                                class="btn flex items-center gap-2 p-3 rounded-xl border border-bgSecondary hover:bg-rose-300 group/btn"
                                                @click="openDeleteDialog(k, i)"
                                                :title="$t('panel.Delete')"
                                            >
                                                <Icon
                                                    class="w-5 h-5 bg-rose-200 group-hover/btn:bg-bgPrimary shrink-0"
                                                    name="trash-can.svg"
                                                    folder="icons/light"
                                                    size="18px"
                                                />
                                            </button>
                                        </div>
                                        <div
                                            class="absolute start-7 top-3 px-2 py-1 rounded-lg bg-primary bg-opacity-80 backdrop-blur-sm shadow-nr5"
                                            v-if="dish.showAsNew"
                                        >
                                            <h5 class="text-xs font-bold">
                                                {{ $t("New") }}
                                            </h5>
                                        </div>
                                        <span
                                            class="grab_area absolute top-6 start-1.5 flex flex-col items-center justify-center gap-1.5 hover:cursor-grab active:cursor-grabbing shrink-0"
                                            v-if="!inSearchMode"
                                        >
                                            <Icon class="w-5 h-5 bg-secondary rotate-90" name="grip-dots.svg" folder="icons/light" size="20px" />
                                            <Icon class="w-5 h-5 bg-secondary rotate-90" name="grip-dots.svg" folder="icons/light" size="20px" />
                                            <Icon class="w-5 h-5 bg-secondary rotate-90" name="grip-dots.svg" folder="icons/light" size="20px" />
                                            <Icon class="w-5 h-5 bg-secondary rotate-90" name="grip-dots.svg" folder="icons/light" size="20px" />
                                        </span>
                                    </li>
                                </template>
                            </Draggable>
                        </div>
                    </div>
                </div>
            </template>
        </Draggable>

        <span class="my-2"></span>

        <Teleport to="body">
            <Dialog name="delete-item-confirmation" :title="$t('panel.menu.Delete Menu Item')">
                <div class="flex flex-col gap-4">
                    <h2
                        class="text-lg"
                        v-html="
                            $t('panel.menu.You are about to delete this item', {
                                name:
                                    dishes.list[indexToDelete.k][indexToDelete.i].translation?.[locale]?.name ||
                                    dishes.list[indexToDelete.k][indexToDelete.i].name,
                            })
                        "
                    />
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

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});
const hasItemHighlighting = computed(() => checkLimitations([["item-highlighting", true]], brand.value));

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

            canCreateNewDish.value = response.data.canCreateNewDish;
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
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // LOGGER : log errors in sentry type thing
};

// getDishesList -------------------------------------------------
const dishes = reactive({ list: [] });
const filteredDishes = reactive({ list: [] });
const canCreateNewDish = ref(true);
const currency = ref('');
const getDishList_results = await useAsyncData(() => getDishesList(route.params.brandID), { lazy: false });
const loadingDishes = computed(() => getDishList_results.pending.value);

handleErrors(getDishList_results.error.value);
watch(getDishList_results.error, (err) => handleErrors(err));

const handleDishList_results = (data) => {
    if (!data) return;
    dishes.list = filteredDishes.list = data._items;
    canCreateNewDish.value = data._canCreateNewDish;
    currency.value = data._currency;
};
handleDishList_results(getDishList_results.data.value);
watch(getDishList_results.data, (val) => handleDishList_results(val));

// -------------------------------------------------

const inSearchMode = ref(false);
const search = (query) => {
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
