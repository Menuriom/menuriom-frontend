<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex items-center justify-between gap-2">
            <div class="flex items-start gap-2">
                <img class="w-9" src="~/assets/images/panel-icons/brand.png" alt="" />
                <div class="flex flex-col gap-2">
                    <h1 class="text-4xl/none font-bold">{{ $t("brand-panel.brands.Manage Your Brands") }}</h1>
                    <small class="text-sm">
                        {{ $t("brand-panel.brands.Create new brands, edit your brand details, or manage brands that you are staff of") }}
                    </small>
                </div>
            </div>
            <nuxt-link
                class="flex items-center justify-center gap-2 p-3 text-sm rounded-lg gradient text-white shadow-nr15 hover:scale-105 transition-all"
                :to="localePath('/brand-panel/brands/new')"
                v-if="canCreateNewBrand"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("brand-panel.brands.New Brand") }}
            </nuxt-link>
        </header>
        <hr class="w-full border-gray-300" />
        <section class="flex flex-col w-full">
            <ul class="grid gap-3 w-full" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))" v-if="!loading">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 w-full rounded-lg bg-white border group hover:shadow-nr5 transition-all overflow-hidden"
                    v-for="(brand, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="z-10">
                        <nuxt-link class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin" :to="localePath(`/brand-panel/brands/${brand._id}`)">
                            <Icon class="w-4 h-4 bg-white" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("brand-panel.brands.Edit Details") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-40" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="brand.roles.includes('owner')"
                        >
                            <Icon class="w-4 h-4 bg-red-300" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("brand-panel.brands.Delete Brand") }}</small>
                        </button>
                        <button class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer" @click="openLeaveDialog(i)" v-else>
                            <Icon class="w-4 h-4 bg-red-300" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("brand-panel.brands.Leave This Brand") }}</small>
                        </button>
                    </SlideMenu>
                    <img class="w-24 h-24 rounded-full object-cover shadow-nr15 flex-shrink-0" :src="brand.logo" v-if="brand.logo" />
                    <img class="w-24 h-24 rounded-full object-cover shadow-nr15 flex-shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                    <div class="flex flex-wrap items-center justify-between gap-2 w-full flex-grow">
                        <h4 class="text-lg/none font-semibold flex-grow">{{ brand.name }}</h4>
                        <small class="text-xs p-0.5 px-1 text-violet border border-violet rounded" v-for="role in brand.roles" :key="role">{{ role }}</small>
                    </div>
                    <hr class="w-full border-zinc-300" />
                    <div class="flex items-center justify-between gap-4 w-full">
                        <ul class="flex items-center">
                            <li class="flex items-center justify-center w-8 h-8 bg-neutral-200 rounded-full shadow-nr10">
                                <img class="w-full h-full object-contain grayscale" src="/avatar.svg" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 bg-neutral-200 rounded-full shadow-nr10 -ms-3">
                                <img class="w-full h-full object-contain grayscale" src="/avatar.svg" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 bg-neutral-200 rounded-full shadow-nr10 -ms-3">
                                <img class="w-full h-full object-contain grayscale" src="/avatar.svg" alt="" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 bg-neutral-200 rounded-full shadow-nr10 -ms-3 z-2">
                                <small>3+</small>
                            </li>
                        </ul>
                        <div class="flex items-center gap-1" :title="$t('brand-panel.brands.Branch')">
                            <Icon class="w-5 h-5 bg-black" name="house.svg" folder="icons/light" size="20px" />
                            <h5 class="font-semibold">2</h5>
                        </div>
                    </div>
                </li>
            </ul>
            <Loading v-else />
            <small class="flex items-start text-xs text-rose-500" v-if="errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('brand-panel.brands.Delete Brand')">
                <div class="flex flex-col gap-3">
                    <img class="w-24 mx-auto" src="~/assets/images/delete3.webp" alt="Delete" />
                    <h2 class="text-xl" v-html="$t('brand-panel.brands.You are about to delete this brand', { name: records.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75">
                        {{ $t("brand-panel.brands.deletingBrandDesc") }}
                    </p>
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md">
                        {{ $t("brand-panel.brands.This action cannot be reversed") }}
                    </small>
                    <hr class="w-full opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                    </small>
                    <div class="flex items-center gap-2 w-full">
                        <button class="btn w-full p-3 rounded bg-dolphin" :disabled="loading" @click="panelStore.closePopUp()">
                            {{ $t("Cancel") }}
                        </button>
                        <button
                            class="btn w-full p-3 rounded bg-red-500"
                            :class="{ 'opacity-75 cursor-not-allowed': loading }"
                            :disabled="loading"
                            @click="deleteBrand()"
                        >
                            <span v-if="!loading"> {{ $t("brand-panel.brands.Delete Brand") }} </span>
                            <Loading class="" v-else />
                        </button>
                    </div>
                </div>
            </Dialog>
        </Teleport>
    </div>
</template>

<script setup>
import Dialog from "~/components/brand-panel/Dialog.vue";
import SlideMenu from "~/components/brand-panel/SlideMenu.vue";
import Loading from "~/components/Loading.vue";
import { delay, getRequestConfig } from "~/composables/useServerUtil";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

useHead({ title: `Brand Managment - Your Menuriom Panel` });

const { t } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();
// const { brands } = storeToRefs(userStore);

// TODO : if user has only one brand and he is the owner of that brand, redirect user to the brand-edit page

const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

const canCreateNewBrand = ref(false);

// deleting ----------------------------------------
const indexToDelete = ref(null);
const openDeleteDialog = (index) => {
    indexToDelete.value = index;
    panelStore.openPopUp("delete-confirmation");
};
// TODO : add some sort of confirmation for this action
const deleteBrand = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await delay(2000);

    await axios
        .delete(`/api/v1/brand-panel/brands/${records.list[indexToDelete.value]._id}`)
        .then((response) => {
            // TODO
            // remove the brand from list of brands in the page
            // remove the brand from list of brands in store
            // if the current selected brand is deleted then change the current brand to the first of store brands
            // if there is no brands in the list pop up the setup account dialog
        })
        .catch((e) => {
            console.log({ e: e.response.data });
            if (typeof e.response !== "undefined" && e.response.data) {
                const errors = e.response.data.errors || e.response.data.message;
                responseMessage.value = errors[0].errors[0];
                errorField.value = errors[0].property;
            }
        })
        .finally(() => (loading.value = false));
};
// -------------------------------------------------

// loading data -------------------------------------------------
const indexToLeave = ref(null);
const openLeaveDialog = (index) => {
    indexToLeave.value = index;
    panelStore.openPopUp("leave-confirmation");
};
// -------------------------------------------------

// loading data -------------------------------------------------
const noMoreRecords = ref(false);
const records = reactive({ list: [] });
const getRecords = async (loadMore = false) => {
    if (noMoreRecords.value || loading.value) return;
    loading.value = true;

    let { url, headers } = getRequestConfig(`/api/v1/brand-panel/brands`, {});
    let params = [`pp=25`];
    if (loadMore && records.list.length != 0) params.push(`lastRecordID=${records.values[records.list.length - 1]._id}`);
    url = encodeURI(`${url}?${params.join("&")}`);

    let _records = [];
    let _canCreateNewBrand = false;
    let _noMoreRecords = false;

    await axios
        .get(url, { headers: headers })
        .then((response) => {
            _records = [..._records, ...response.data.records];
            if (response.data.records.length == 0) _noMoreRecords = true;
            _canCreateNewBrand = response.data.canCreateNewBrand;
        })
        .catch((e) => {
            throw e;
        })
        .finally(() => (loading.value = false));

    return { _records, _noMoreRecords, _canCreateNewBrand };
};
await useAsyncData(() => getRecords()).then(({ data, error }) => {
    if (error.value) {
        errorField.value = "data";
        if (typeof error.value.response !== "undefined" && error.value.response.data && typeof error.value.response.data.errors === "object") {
            responseMessage.value = error.value.response.data.errors[0].errors[0];
        } else responseMessage.value = t("Something went wrong!");
        // TODO : log errors in sentry type thing
    }
    if (data.value) {
        records.list = data.value._records;
        noMoreRecords.value = data.value._noMoreRecords;
        canCreateNewBrand.value = data.value._canCreateNewBrand;
    }
});
// -------------------------------------------------
</script>
