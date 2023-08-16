<style scoped>
.mask {
    background-image: linear-gradient(90deg, theme("colors.primary") 0%, theme("colors.secondary") 100%);
    mask: url("~/assets/images/pattern2.png");
    /* mask: url("/patterns/pattern13.webp"); */
    /* mask: url("~/assets/images/pattern.webp"); */
    mask-size: 300px;
    mask-position: 20px 20px;
    opacity: 0.5;
}
</style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="relative flex flex-wrap items-center justify-between gap-4">
            <div class="relative flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/brand.png" alt="" />
                    <h1 class="text-3xl md:text-4xl/tight font-bold">{{ $t("panel.brands.Your Brands") }}</h1>
                </div>
                <small class="text-xs md:text-sm opacity-75">
                    {{ $t("panel.brands.Create new brands, edit your brand details, or manage brands that you are staff of") }}
                </small>
            </div>
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary shrink-0"
                :to="localePath('/panel/brand/creation')"
                v-if="canCreateNewBrand"
            >
                <Icon class="w-3 h-3 bg-fgPrimary" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.brands.New Brand") }}
            </nuxt-link>
        </header>
        <!-- <hr class="w-full border-neutral-500" /> -->
        <section class="relative flex flex-col w-full bg-bgAccent rounded-3xl p-4 md:p-6 shadow-mr15 isolate">
            <div class="absolute inset-0 -z-10 opacity-50 rounded-2xl overflow-hidden"><div class="absolute mask inset-0"></div></div>
            <ul class="grid gap-6 w-full" style="grid-template-columns: repeat(auto-fill, minmax(275px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 w-full rounded-2xl bg-bgPrimary border border-bgSecondary hover:shadow-mr15 transition-all overflow-hidden group"
                    v-for="(brand, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                            :to="localePath(`/panel/${brand._id}`)"
                            v-if="checkPermissions(['panel'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-fgPrimary shrink-0" name="column-light.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Go To Dashboard") }}</small>
                        </nuxt-link>
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                            :to="localePath(`/panel/brand/${brand._id}/general-info`)"
                            v-if="brand.role == 'owner'"
                        >
                            <Icon class="w-4 h-4 bg-fgPrimary shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Brand Settings & Info") }}</small>
                        </nuxt-link>
                        <hr class="w-11/12 mx-auto opacity-10" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30 text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="brand.role == 'owner'"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Delete Brand") }}</small>
                        </button>
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30 text-red-300 cursor-pointer"
                            @click="openLeaveDialog(i)"
                            v-else
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="right-from-bracket.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Leave This Brand") }}</small>
                        </button>
                    </SlideMenu>
                    <div class="flex flex-wrap gap-4 w-full bg-bgSecondary bg-opacity-70 p-4 -mt-4 rounded-xl">
                        <div class="flex items-start gap-4">
                            <div class="flex flex-col items-start gap-2 shrink-0">
                                <nuxt-link
                                    class="btn flex items-center gap-1 p-2 hover:px-4 rounded-lg bg-fgPrimary"
                                    :to="localePath(`/panel/${brand._id}`)"
                                    :title="$t(`panel.brands.Go To Dashboard`)"
                                    v-if="checkPermissions(['panel'], brand)"
                                >
                                    <!-- <Icon class="w-5 h-5 bg-fgPrimary" name="column-light.svg" folder="icons/light" size="20px" /> -->
                                    <img class="w-4" src="~/assets/images/panel-icons/rectangles-mixed-dark.png" alt="" />
                                </nuxt-link>
                                <nuxt-link
                                    class="btn flex items-center gap-1 p-2 hover:px-4 rounded-lg bg-fgPrimary"
                                    :to="localePath(`/orders-panel/${panelStore.selectedBrandId}`)"
                                    :title="$t('panel.side-menu.Orders')"
                                    v-if="checkPermissions(['orders-panel'], brand)"
                                >
                                    <img class="w-4" src="~/assets/images/panel-icons/cash-register.png" alt="" />
                                </nuxt-link>
                                <nuxt-link
                                    class="btn flex items-center gap-1 p-2 hover:px-4 rounded-lg bg-fgPrimary"
                                    :to="localePath(`/ordering-app/${panelStore.selectedBrandId}`)"
                                    :title="$t('panel.side-menu.Ordering App')"
                                    v-if="checkPermissions(['ordering-app'], brand)"
                                >
                                    <img class="w-4" src="~/assets/images/panel-icons/mobile-button.png" alt="" />
                                </nuxt-link>
                            </div>
                            <nuxt-link class="btn rounded-full shrink-0" :to="localePath(`/panel/${brand._id}`)" :title="$t(`panel.brands.Go To Dashboard`)">
                                <img class="w-28 h-28 rounded-2xl object-cover shadow-nr15 flex-shrink-0" :src="brand.logo" v-if="brand.logo" />
                                <img class="w-28 h-28 rounded-2xl object-cover shadow-nr15 flex-shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                            </nuxt-link>
                        </div>
                        <div class="flex flex-wrap items-center justify-between gap-2 w-full grow">
                            <h4 class="text-lg/none font-semibold grow">{{ brand.name }}</h4>
                            <small class="text-xs p-0.5 px-1 text-fgPrimary border-2 border-primary opacity-75 rounded-lg">{{ brand.role }}</small>
                        </div>
                    </div>
                    <!-- <hr class="w-full border-bgSecondary" /> -->
                    <div class="flex items-center justify-between gap-4 w-full">
                        <ul class="flex items-center">
                            <li class="flex items-center justify-center w-8 h-8 rounded-full shadow-nr10">
                                <img class="w-full h-full object-contain" src="/avatar.webp" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 rounded-full shadow-nr10 -ms-3">
                                <img class="w-full h-full object-contain" src="/avatar.webp" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 rounded-full shadow-nr10 -ms-3">
                                <img class="w-full h-full object-contain" src="/avatar.webp" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 bg-bgSecondary rounded-full shadow-nr10 -ms-3 z-2">
                                <small>3+</small>
                            </li>
                        </ul>
                        <div class="flex items-center gap-1" :title="$t('panel.brands.Branch')">
                            <Icon class="w-5 h-5 bg-fgPrimary" name="store.svg" folder="icons/light" size="20px" />
                            <h5 class="">2</h5>
                        </div>
                    </div>
                </li>
                <li
                    class="relative w-full rounded-2xl bg-fgPrimary border-0 hover:border-8 border-primary shadow-nr5 hover:shadow-nr10 overflow-hidden transition-all group"
                    v-if="canCreateNewBrand && records.list.length > 0"
                >
                    <nuxt-link class="flex flex-col items-center justify-center gap-4 w-full h-full p-3" :to="localePath(`/panel/brand/creation`)">
                        <img class="down-pop w-32 group-hover:w-40 object-contain transition-all" src="~/assets/images/store-door.webp" />
                        <div class="flex items-center gap-2">
                            <Icon class="w-3 h-3 bg-primary" name="plus.svg" folder="icons" size="12px" />
                            <small class="text-sm text-primary">{{ $t("panel.brands.Create New Brand") }}</small>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <div class="flex flex-col items-center gap-8 w-full mt-6" v-if="!loading && records.list.length == 0 && errorField == ''">
                <img class="down-pop w-52 object-contain" src="~/assets/images/store-door.webp" />
                <div class="flex flex-col items-center gap-2">
                    <h4 class="text-2xl font-bold text-secondary">{{ $t("panel.brands.No Brands Here Yet") }}</h4>
                    <small class="text-sm text-center opacity-75">
                        {{ $t("panel.brands.Start by creating a brand, or check your invation list to join a existing brand") }}
                    </small>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-4">
                    <nuxt-link
                        class="btn flex items-center gap-2 bg-primary text-fgPrimary p-3 hover:px-6 rounded-xl"
                        :to="localePath(`/panel/brand/creation`)"
                    >
                        <Icon class="w-5 h-5 bg-fgPrimary" name="square-dashed-circle-plus.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.brands.Create New Brand") }}
                    </nuxt-link>
                    <nuxt-link
                        class="btn flex items-center gap-2 border bg-fgPrimary text-bgPrimary p-3 hover:px-6 rounded-xl"
                        :to="localePath(`/panel/account/invite-list`)"
                    >
                        <Icon class="w-5 h-5 bg-black" name="envelope-open-text.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.brands.Check Invite List") }}
                    </nuxt-link>
                </div>
            </div>
            <Loading v-if="loading" />
            <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loading && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.brands.Delete Brand')">
                <div class="flex flex-col gap-4">
                    <img class="w-44 mx-auto" src="~/assets/images/empty.webp" />
                    <div class="flex flex-col gap-2 p-4 rounded-2xl bg-bgSecondary bg-opacity-40 shadow-mr15">
                        <h2 class="text-xl" v-html="$t('panel.brands.You are about to delete this brand', { name: records.list[indexToDelete].name })" />
                        <p class="text-sm opacity-75">
                            {{ $t("panel.brands.deletingBrandDesc") }}
                        </p>
                    </div>
                    <small class="flex items-center gap-2 text-sm text-red-200 bg-red-700 bg-opacity-10 p-4 rounded-xl shadow-inner">
                        <Icon class="icon w-5 h-5 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="20px" />
                        {{ $t("panel.brands.This action cannot be reversed") }}
                    </small>
                    <hr class="w-full border-neutral-500 border-opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
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
                            <span v-if="!deleting"> {{ $t("panel.brands.Delete Brand") }} </span>
                            <Loading class="h-6" v-else />
                        </button>
                    </div>
                </div>
            </Dialog>
            <Dialog name="leave-confirmation" :title="$t('panel.brands.Leave Brand')">
                <div class="flex flex-col gap-3">
                    <img class="w-44 mx-auto" src="~/assets/images/cup-on-ground.webp" />
                    <div class="flex flex-col gap-2 p-4 rounded-2xl bg-bgSecondary bg-opacity-40 shadow-mr15">
                        <h2 class="text-xl" v-html="$t('panel.brands.You are about to leave this brand', { name: records.list[indexToLeave].name })" />
                        <p class="text-sm opacity-75">
                            {{ $t("panel.brands.leavingBrandDesc") }}
                        </p>
                    </div>
                    <small class="flex items-center gap-2 text-sm text-red-200 bg-red-700 bg-opacity-10 p-4 rounded-xl shadow-inner">
                        <Icon class="icon w-5 h-5 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="20px" />
                        {{ $t("panel.brands.You need new invitation to join this brand again") }}
                    </small>
                    <hr class="w-full border-neutral-500 border-opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                    </small>
                    <div class="flex items-center gap-2 w-full">
                        <button class="btn w-full p-3 hover:px-6 rounded-xl bg-bgSecondary" :disabled="leaving" @click="panelStore.closePopUp()">
                            {{ $t("Cancel") }}
                        </button>
                        <button
                            class="btn w-full p-3 hover:px-6 rounded-xl bg-red-400"
                            :class="{ 'opacity-75 cursor-not-allowed': leaving }"
                            :disabled="leaving"
                            @click="leaveBrand()"
                        >
                            <span v-if="!leaving"> {{ $t("panel.brands.Leave Brand") }} </span>
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
import Loading from "~/components/Loading.vue";
import { getBrandList } from "~/composables/useApiCalls";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.brands.Your Brands")} - ${t("panel.Your Menuriom Panel")}`);
// useHead({ title: title });
useHead({ title: `${t("panel.brands.Your Brands")} - ${t("panel.Your Menuriom Panel")}` });

// TODO : if user has only one brand and he is the owner of that brand, redirect user to the brand-edit page
// TODO : add branch count and staff list to brands

const errorField = ref("");
const responseMessage = ref("");

const canCreateNewBrand = ref(false);

// deleting ----------------------------------------
const deleting = ref(false);
const indexToDelete = ref(null);
const openDeleteDialog = (index) => {
    indexToDelete.value = index;
    panelStore.openPopUp("delete-confirmation");
};
// TODO : add some sort of confirmation for this action
const deleteRecord = async () => {
    if (deleting.value) return;
    deleting.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = records.list[indexToDelete.value]._id;

    await axios
        .delete(`/api/v1/panel/brands/${id}`, { headers: { brand: id } })
        .then((response) => {
            // remove the brand from list of brands in the page
            records.list.splice(indexToDelete.value, 1);
            // remove the brand from list of brands in store
            delete userStore.brands.list[id];
            // allow user to create new brand
            canCreateNewBrand.value = true;
            panelStore.closePopUp();
            panelStore.setSelectedBrand("");
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

// loading data -------------------------------------------------
const leaving = ref(false);
const indexToLeave = ref(null);
const openLeaveDialog = (index) => {
    indexToLeave.value = index;
    panelStore.openPopUp("leave-confirmation");
};
const leaveBrand = async () => {
    if (leaving.value) return;
    leaving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = records.list[indexToLeave.value]._id;

    await axios
        .delete(`/api/v1/panel/brands/leave/${id}`, { headers: { brand: id } })
        .then((response) => {
            // remove the brand from list of brands in the page
            records.list.splice(indexToLeave.value, 1);
            // remove the brand from list of brands in store
            delete userStore.brands.list[id];

            panelStore.closePopUp();
            panelStore.setSelectedBrand("");
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
        .finally(() => (leaving.value = false));
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

// getBrandList -------------------------------------------------
const loading = ref(true);
const noMoreRecords = ref(false);
const records = reactive({ list: [] });
const getBrandList_results = await useLazyAsyncData(() => getBrandList());

if (getBrandList_results.error.value) handleErrors(getBrandList_results.error.value);
watch(getBrandList_results.error, (err) => handleErrors(err));

const handleBrandList_results = (data) => {
    records.list = data._records;
    noMoreRecords.value = data._noMoreRecords;
    canCreateNewBrand.value = data._canCreateNewBrand;
    loading.value = false;
};
if (getBrandList_results.data.value) handleBrandList_results(getBrandList_results.data.value);
watch(getBrandList_results.data, (val) => handleBrandList_results(val));
// -------------------------------------------------
</script>
