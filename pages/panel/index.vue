<style scoped>
.mask {
    background-image: linear-gradient(90deg, theme("colors.violet") 0%, theme("colors.baby-blue") 100%);
    mix-blend-mode: plus-lighter;
    mask: url("~/assets/images/pattern2.png");
    /* mask: url("~/assets/images/pattern.webp"); */
    mask-size: 200px;
    mask-position: 20px 20px;
    opacity: 0.75;
}
</style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="relative flex flex-wrap items-center justify-between gap-4">
            <div class="relative flex flex-col gap-1">
                <div class="flex items-center gap-1">
                    <img class="w-9" src="~/assets/images/panel-icons/brand.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.brands.Your Brands") }}</h1>
                </div>
                <small class="text-xs md:text-sm">
                    {{ $t("panel.brands.Create new brands, edit your brand details, or manage brands that you are staff of") }}
                </small>
            </div>
            <nuxt-link
                class="btn relative flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-violet text-white flex-shrink-0"
                :to="localePath('/panel/brand/creation')"
                v-if="canCreateNewBrand"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.brands.New Brand") }}
            </nuxt-link>
        </header>
        <hr class="w-full border-gray-400 opacity-50" />
        <section class="relative flex flex-col w-full">
            <div class="absolute -top-6 w-full h-40 bg-dolphin rounded-lg shadow-nr25"><div class="absolute mask inset-0"></div></div>
            <ul class="grid gap-6 px-6 w-full" style="grid-template-columns: repeat(auto-fill, minmax(245px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 w-full rounded-xl bg-pencil-tip text-white group shadow-nr5 hover:shadow-nr35 transition-all overflow-hidden"
                    v-for="(brand, i) in records.list"
                    :key="i"
                >
                    <div class="absolute top-4 start-4 flex flex-col gap-2">
                        <nuxt-link
                            class="btn flex items-center gap-1 p-2 rounded-md bg-white"
                            :to="localePath(`/panel/${brand._id}`)"
                            :title="$t(`panel.brands.Go To Dashboard`)"
                            v-if="checkPermissions(['panel'], brand)"
                        >
                            <!-- <Icon class="w-5 h-5 bg-white" name="column-light.svg" folder="icons/light" size="20px" /> -->
                            <img class="w-4" src="~/assets/images/panel-icons/rectangles-mixed-dark.png" alt="" />
                        </nuxt-link>
                        <nuxt-link
                            class="btn flex items-center gap-1 p-2 rounded-md bg-white"
                            :to="localePath(`/orders-panel/${panelStore.selectedBrandId}`)"
                            :title="$t('panel.side-menu.Orders')"
                            v-if="checkPermissions(['orders-panel'], brand)"
                        >
                            <img class="w-4" src="~/assets/images/panel-icons/cash-register.png" alt="" />
                        </nuxt-link>
                        <nuxt-link
                            class="btn flex items-center gap-1 p-2 rounded-md bg-white"
                            :to="localePath(`/ordering-app/${panelStore.selectedBrandId}`)"
                            :title="$t('panel.side-menu.Ordering App')"
                            v-if="checkPermissions(['ordering-app'], brand)"
                        >
                            <img class="w-4" src="~/assets/images/panel-icons/mobile-button.png" alt="" />
                        </nuxt-link>
                    </div>
                    <SlideMenu class="z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/${brand._id}`)"
                            v-if="checkPermissions(['panel'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="column-light.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Go To Dashboard") }}</small>
                        </nuxt-link>
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/brand/${brand._id}/general-info`)"
                            v-if="brand.role == 'owner'"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Brand Settings & Info") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-40" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="brand.role == 'owner'"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Delete Brand") }}</small>
                        </button>
                        <button class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer" @click="openLeaveDialog(i)" v-else>
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="right-from-bracket.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.brands.Leave This Brand") }}</small>
                        </button>
                    </SlideMenu>
                    <nuxt-link class="btn rounded-full -mt-2 mb-4" :to="localePath(`/panel/${brand._id}`)" :title="$t(`panel.brands.Go To Dashboard`)">
                        <img class="w-28 h-28 rounded-full object-cover shadow-nr15 flex-shrink-0" :src="brand.logo" v-if="brand.logo" />
                        <img class="w-28 h-28 rounded-full object-cover shadow-nr15 flex-shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                    </nuxt-link>
                    <div class="flex flex-wrap items-center justify-between gap-2 w-full flex-grow">
                        <h4 class="text-lg/none font-semibold flex-grow">{{ brand.name }}</h4>
                        <small class="text-xs p-0.5 px-1 text-violet border border-violet rounded">{{ brand.role }}</small>
                    </div>
                    <hr class="w-full border-zinc-300" />
                    <div class="flex items-center justify-between gap-4 w-full">
                        <ul class="flex items-center">
                            <li class="flex items-center justify-center w-8 h-8 bg-dolphin rounded-full shadow-nr10">
                                <img class="w-full h-full object-contain" src="/avatar.webp" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 bg-dolphin rounded-full shadow-nr10 -ms-3">
                                <img class="w-full h-full object-contain" src="/avatar.webp" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 bg-dolphin rounded-full shadow-nr10 -ms-3">
                                <img class="w-full h-full object-contain" src="/avatar.webp" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 bg-neutral-200 text-dolphin rounded-full shadow-nr10 -ms-3 z-2">
                                <small>3+</small>
                            </li>
                        </ul>
                        <div class="flex items-center gap-1" :title="$t('panel.brands.Branch')">
                            <Icon class="w-5 h-5 bg-white" name="house.svg" folder="icons/light" size="20px" />
                            <h5 class="">2</h5>
                        </div>
                    </div>
                </li>
                <li
                    class="relative w-full rounded-lg bg-white hover:border-2 border-violet shadow-nr5 hover:shadow-nr10 transition-shadow overflow-hidden"
                    v-if="canCreateNewBrand && records.list.length > 0"
                >
                    <nuxt-link class="flex flex-col items-center justify-center gap-4 w-full h-full p-3" :to="localePath(`/panel/brand/creation`)">
                        <img class="down-pop w-32 object-contain" src="~/assets/images/store-door.webp" />
                        <div class="flex items-center gap-2">
                            <Icon class="w-3 h-3 bg-violet" name="plus.svg" folder="icons" size="12px" />
                            <small class="text-sm text-violet">{{ $t("panel.brands.Create New Brand") }}</small>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <div class="flex flex-col items-center gap-8 w-full" v-if="!loading && records.list.length == 0 && errorField == ''">
                <img class="down-pop w-52 object-contain" src="~/assets/images/store-door.webp" />
                <div class="flex flex-col items-center gap-2">
                    <h4 class="text-xl font-bold">{{ $t("panel.brands.No Brands Here Yet") }}</h4>
                    <small class="text-sm text-center">
                        {{ $t("panel.brands.Start by creating a brand, or check your invation list to join a existing brand") }}
                    </small>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-4">
                    <nuxt-link class="btn flex items-center gap-2 bg-violet text-white p-3 rounded-md" :to="localePath(`/panel/brand/creation`)">
                        <Icon class="w-5 h-5 bg-white" name="square-dashed-circle-plus.svg" folder="icons/light" size="20px" />
                        {{ $t("panel.brands.Create New Brand") }}
                    </nuxt-link>
                    <nuxt-link class="btn flex items-center gap-2 border bg-white p-3 rounded-md" :to="localePath(`/panel/account/invite-list`)">
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
                <div class="flex flex-col gap-3">
                    <img class="w-44 mx-auto" src="~/assets/images/empty.webp" />
                    <h2 class="text-xl" v-html="$t('panel.brands.You are about to delete this brand', { name: records.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75">
                        {{ $t("panel.brands.deletingBrandDesc") }}
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
                            <span v-if="!deleting"> {{ $t("panel.brands.Delete Brand") }} </span>
                            <Loading class="h-6" v-else />
                        </button>
                    </div>
                </div>
            </Dialog>
            <Dialog name="leave-confirmation" :title="$t('panel.brands.Leave Brand')">
                <div class="flex flex-col gap-3">
                    <img class="w-44 mx-auto" src="~/assets/images/cup-on-ground.webp" />
                    <h2 class="text-xl" v-html="$t('panel.brands.You are about to leave this brand', { name: records.list[indexToLeave].name })" />
                    <p class="text-sm opacity-75">
                        {{ $t("panel.brands.leavingBrandDesc") }}
                    </p>
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md mt-4">
                        {{ $t("panel.brands.You need new invitation to join this brand again") }}
                    </small>
                    <hr class="w-full opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                    </small>
                    <div class="flex items-center gap-2 w-full">
                        <button class="btn w-full p-3 rounded bg-dolphin" :disabled="leaving" @click="panelStore.closePopUp()">
                            {{ $t("Cancel") }}
                        </button>
                        <button
                            class="btn w-full p-3 rounded bg-red-500"
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
