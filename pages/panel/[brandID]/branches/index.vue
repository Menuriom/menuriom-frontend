<style scoped></style>

<template>
    <div class="flex flex-col gap-4 sm:gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/store-dark.png" alt="" />
                    <h1 class="text-4xl/none font-bold">{{ $t("panel.branches.Branches") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.branches.Here you can manage your branches and customize their menu") }}
                </small>
            </div>
            <nuxt-link
                class="flex items-center justify-center gap-2 p-3 text-sm rounded-lg gradient text-white shadow-nr15 hover:scale-105 transition-all flex-shrink-0"
                :to="localePath(`/panel/${route.params.brandID}/brand/creation`)"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.branches.New Branch") }}
            </nuxt-link>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-col w-full">
            <ul class="grid gap-3 w-full" style="grid-template-columns: repeat(auto-fill, minmax(265px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 w-full rounded-lg bg-white border group hover:shadow-nr5 transition-all overflow-hidden"
                    v-for="(branch, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/${route.params.brandID}/branch/${branch._id}`)"
                        >
                            <Icon class="w-4 h-4 bg-white" name="cards-blank.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Customize This Branch Menu") }}</small>
                        </nuxt-link>
                        <nuxt-link class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin" :to="localePath(`/panel/branch/${branch._id}`)">
                            <Icon class="w-4 h-4 bg-white" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Edit Details") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-40" />
                        <button class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer" @click="openDeleteDialog(i)">
                            <Icon class="w-4 h-4 bg-red-300" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Delete Branch") }}</small>
                        </button>
                    </SlideMenu>
                    <div class="relative flex flex-col rounded-full mt-4 mb-8">
                        <div class="relative w-56 h-36 rounded-md bg-pencil-tip shadow-nr15 z-2">
                            <img class="w-full h-full object-cover" :src="branch.logo1" v-if="branch.logo1" />
                        </div>
                        <div class="absolute -start-6 top-8 w-56 h-36 bg-dolphin rounded-md shadow-nr15">
                            <img class="w-full h-full object-cover" :src="branch.logo2" v-if="branch.logo2" />
                        </div>
                        <div class="absolute -end-6 top-4 w-56 h-36 bg-neutral-600 rounded-md shadow-nr15">
                            <img class="w-full h-full object-cover" :src="branch.logo3" v-if="branch.logo3" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 w-full">
                        <h4 class="text-xl/none font-semibold flex-grow">{{ branch.name }}</h4>
                        <hr class="w-full border-zinc-300" />
                        <div class="flex items-start gap-2">
                            <img width="24" src="~/assets/images/panel-icons/location-dot-dark.png" alt="" />
                            <p>{{ branch.name }}</p>
                        </div>
                        <div class="flex items-start gap-2">
                            <img width="24" src="~/assets/images/panel-icons/phone-rotary-dark.png" alt="" />
                            <ul class="flex flex-col gap-1 text-sm">
                                <li>032-3232323</li>
                                <li>032-6542341</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="w-full rounded-lg bg-white border hover:shadow-nr5 transition-all overflow-hidden">
                    <nuxt-link
                        class="flex flex-col items-center justify-center gap-4 w-full h-full p-3"
                        :to="localePath(`/panel/${route.params.brandID}/branch/creation`)"
                    >
                        <img class="down-pop w-32 object-contain" src="~/assets/images/store.webp" />
                        <div class="flex items-center gap-2">
                            <Icon class="w-3 h-3 bg-violet" name="plus.svg" folder="icons" size="12px" />
                            <small class="text-sm text-violet">{{ $t("panel.branches.Create New Branch") }}</small>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <Loading v-if="loading" />
            <small class="flex items-start text-xs text-rose-500" v-if="!loading && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.branches.Delete Brand')">
                <div class="flex flex-col gap-3">
                    <img class="w-44 mx-auto" src="~/assets/images/empty.webp" />
                    <h2 class="text-xl" v-html="$t('panel.branches.You are about to delete this brand', { name: records.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75">
                        {{ $t("panel.branches.deletingBrandDesc") }}
                    </p>
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md">
                        {{ $t("panel.branches.This action cannot be reversed") }}
                    </small>
                    <hr class="w-full opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
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
                            <span v-if="!deleting"> {{ $t("panel.branches.Delete Brand") }} </span>
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
import { delay, getRequestConfig } from "~/composables/useServerUtil";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

useHead({ title: `Brand Managment - Your Menuriom Panel` });

const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// TODO : limit branch creation base on the user's plan on brand
// TODO : add permission check for actions
// TODO : check if any field got translation and if so show it base on current locale

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
        .delete(`/api/v1/panel/brands/${id}`)
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
        .catch((e) => {
            console.log({ e: e.response.data });
            if (typeof e.response !== "undefined" && e.response.data) {
                const errors = e.response.data.errors || e.response.data.message;
                responseMessage.value = errors[0].errors[0];
                errorField.value = errors[0].property;
            }
        })
        .finally(() => (deleting.value = false));
};
// -------------------------------------------------

// loading data -------------------------------------------------
const loading = ref(false);
const noMoreRecords = ref(false);
const records = reactive({ list: [] });
const getRecords = async (loadMore = false) => {
    if (noMoreRecords.value || loading.value) return;
    loading.value = true;

    let { url, headers } = getRequestConfig(`/api/v1/panel/brands`, {});
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
        if (typeof error.value.response !== "undefined" && error.value.response.data) {
            const errors = e.response.data.errors || e.response.data.message;
            responseMessage.value = errors[0].errors[0];
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
