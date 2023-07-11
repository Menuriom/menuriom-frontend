<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/store-dark.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.branches.Branches") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.branches.Here you can manage your branches and customize their menu") }}
                </small>
            </div>
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-violet text-white flex-shrink-0"
                :to="localePath(`/panel/${route.params.brandID}/branches/creation`)"
                v-if="checkPermissions(['main-panel.branches.add'], brand)"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.branches.New Branch") }}
            </nuxt-link>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-col w-full">
            <ul class="grid gap-3 w-full" style="grid-template-columns: repeat(auto-fill, minmax(265px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 w-full rounded-lg bg-white group shadow-nr5 hover:shadow-nr10 transition-all overflow-hidden"
                    v-for="(branch, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="-my-2 z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/${route.params.brandID}/branches/${branch._id}/customize-menu`)"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="cards-blank.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Customize This Branch Menu") }}</small>
                        </nuxt-link>
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/${route.params.brandID}/branches/${branch._id}`)"
                            v-if="checkPermissions(['main-panel.branches.edit'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Edit Details") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-40" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="checkPermissions(['main-panel.branches.delete'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Delete Branch") }}</small>
                        </button>
                    </SlideMenu>
                    <h4 class="text-xl font-semibold me-auto w-52">{{ branch.translation?.[locale]?.name || branch.name }}</h4>
                    <div class="relative flex flex-col rounded-full mb-8">
                        <div class="relative w-56 h-36 rounded-md overflow-hidden bg-pencil-tip shadow-nr15 z-2">
                            <img class="w-full h-full object-cover" :src="branch.gallery[0]" v-if="branch.gallery[0]" />
                        </div>
                        <div class="absolute -end-6 top-4 w-56 h-36 bg-dolphin rounded-md overflow-hidden shadow-nr15">
                            <img class="w-full h-full object-cover" :src="branch.gallery[2]" v-if="branch.gallery[2]" />
                        </div>
                        <div class="absolute -start-6 top-8 w-56 h-36 bg-neutral-600 rounded-md overflow-hidden shadow-nr15">
                            <img class="w-full h-full object-cover" :src="branch.gallery[1]" v-if="branch.gallery[1]" />
                        </div>
                    </div>
                    <hr class="w-full border-dolphin opacity-10" />
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex items-start gap-2">
                            <img width="20" src="~/assets/images/panel-icons/location-dot-dark.png" alt="" />
                            <p class="text-sm">{{ branch.translation?.[locale]?.address || branch.address }}</p>
                        </div>
                        <div class="flex items-start gap-2" v-if="branch.telephoneNumbers.length > 0">
                            <img width="19" src="~/assets/images/panel-icons/phone-rotary-dark.png" alt="" />
                            <ul class="flex flex-wrap items-center gap-2 text-sm">
                                <li class="p-1 bg-neutral-100 rounded" v-for="number in branch.telephoneNumbers" :key="number">{{ number }}</li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li class="w-full rounded-lg bg-white hover:border-2 border-violet shadow-nr5 hover:shadow-nr10 transition-shadow overflow-hidden">
                    <nuxt-link
                        class="flex flex-col items-center justify-center gap-4 w-full h-full p-3 py-10"
                        :to="localePath(`/panel/${route.params.brandID}/branches/creation`)"
                        v-if="checkPermissions(['main-panel.branches.add'], brand)"
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
            <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loading && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.branches.Delete Branch')">
                <div class="flex flex-col gap-3">
                    <!-- <img class="w-44 mx-auto" src="~/assets/images/empty.webp" /> -->
                    <hr class="w-full opacity-30 mt-2" />
                    <h2 class="text-xl" v-html="$t('panel.branches.You are about to delete this branch', { name: records.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75 -mt-2">
                        {{ $t("panel.branches.deletingBranchDesc") }}
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
                            <span v-if="!deleting"> {{ $t("panel.branches.Delete Branch") }} </span>
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
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.branches.Branches")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

// TODO : limit branch creation base on the user's plan on brand

const errorField = ref("");
const responseMessage = ref("");

const canCreateNewBranch = ref(true);

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

    const id = records.list[indexToDelete.value]._id;

    await axios
        .delete(`/api/v1/panel/branches/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            records.list.splice(indexToDelete.value, 1);
            panelStore.closePopUp();
            // TODO : allow user to create new branch if the limit is under the plan's limit
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
    console.log({ err });
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getBranchList -------------------------------------------------
const loading = ref(true);
const noMoreRecords = ref(false);
const records = reactive({ list: [] });
const getBranchList_results = await useLazyAsyncData(() => getBranchList(route.params.brandID));

if (getBranchList_results.error.value) handleErrors(getBranchList_results.error.value);
watch(getBranchList_results.error, (err) => handleErrors(err));

const handleBranchList_results = (data) => {
    records.list = data._records;
    noMoreRecords.value = data._noMoreRecords;
    canCreateNewBranch.value = data._canCreateNewBranch;
    loading.value = false;
};
if (getBranchList_results.data.value) handleBranchList_results(getBranchList_results.data.value);
watch(getBranchList_results.data, (val) => handleBranchList_results(val));
// -------------------------------------------------
</script>
