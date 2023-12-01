<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="store.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-3xl md:text-4xl/tight font-bold">{{ $t("panel.branches.Branches") }}</h1>
                </div>
                <small class="text-xs md:text-sm opacity-75">
                    {{ $t("panel.branches.Here you can manage your business branches and their info") }}
                </small>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-fgPrimary text-bgPrimary shrink-0"
                    :to="localePath(`/panel/${route.params.brandID}/working-hours`)"
                >
                    <Icon class="w-4 h-4 gradient" name="calendar-clock.svg" folder="icons/light" size="16px" />
                    {{ $t("panel.branches.Working Hours") }}
                </nuxt-link>
                <nuxt-link
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary shrink-0"
                    :to="localePath(`/panel/${route.params.brandID}/branches/creation`)"
                    v-if="checkPermissions(['main-panel.branches.add'], brand)"
                >
                    <Icon class="w-3 h-3 bg-fgPrimary" name="plus.svg" folder="icons" size="12px" />
                    {{ $t("panel.branches.New Branch") }}
                </nuxt-link>
            </div>
        </header>
        <hr class="w-full border-bgSecondary" />
        <section class="flex flex-col w-full">
            <ul class="grid gap-6 w-full" style="grid-template-columns: repeat(auto-fill, minmax(265px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-6 p-4 md:p-6 w-full rounded-2xl bg-bgAccent group shadow-nr15 hover:shadow-mr35 transition-all overflow-hidden"
                    v-for="(branch, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="-my-2 z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                            :to="localePath(`/panel/${route.params.brandID}/branches/${branch._id}/customize-menu`)"
                        >
                            <Icon class="w-4 h-4 bg-fgPrimary shrink-0" name="cards-blank.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Customize This Branch Menu") }}</small>
                        </nuxt-link>
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                            :to="localePath(`/panel/${route.params.brandID}/branches/${branch._id}`)"
                            v-if="checkPermissions(['main-panel.branches.edit'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-fgPrimary shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Edit Details") }}</small>
                        </nuxt-link>
                        <hr class="w-11/12 mx-auto opacity-10" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30 text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="checkPermissions(['main-panel.branches.delete'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.branches.Delete Branch") }}</small>
                        </button>
                    </SlideMenu>
                    <h4 class="text-xl font-semibold me-auto w-52">{{ branch.translation?.[locale]?.name || branch.name }}</h4>
                    <div class="relative flex flex-col rounded-full mb-8">
                        <div class="img-bg relative w-56 h-36 rounded-xl overflow-hidden bg-primary shadow-nr15 z-2">
                            <img class="w-full h-full object-cover" :src="branch.gallery[0]" v-if="branch.gallery[0]" />
                        </div>
                        <div class="img-bg absolute -end-6 top-4 w-56 h-36 bg-fgPrimary bg-opacity-75 rounded-xl overflow-hidden shadow-nr15">
                            <img class="w-full h-full object-cover" :src="branch.gallery[2]" v-if="branch.gallery[2]" />
                        </div>
                        <div class="img-bg absolute -start-5 top-8 w-56 h-36 bg-neutral-600 rounded-xl overflow-hidden shadow-nr15">
                            <img class="w-full h-full object-cover" :src="branch.gallery[1]" v-if="branch.gallery[1]" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 w-full">
                        <div class="flex items-center gap-2">
                            <div class="p-1.5 bg-fgPrimary bg-opacity-10 rounded-lg">
                                <Icon class="w-4 h-4 bg-secondary" name="location-dot.svg" folder="icons/duo" size="16px" />
                            </div>
                            <p class="text-sm opacity-80">{{ branch.translation?.[locale]?.address || branch.address }}</p>
                        </div>
                        <div class="flex items-start gap-2" v-if="branch.telephoneNumbers.length > 0">
                            <div class="p-1.5 bg-fgPrimary bg-opacity-10 rounded-lg">
                                <Icon class="w-4 h-4 bg-secondary" name="phone-rotary.svg" folder="icons/duo" size="16px" />
                            </div>
                            <ul class="flex flex-wrap items-center gap-2 text-sm">
                                <li class="p-1 px-3 border border-bgSecondary rounded-lg" v-for="number in branch.telephoneNumbers" :key="number">
                                    {{ number }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li
                    class="w-full rounded-2xl bg-bgSecondary bg-opacity-50 border-0 hover:border-8 border-primary shadow-nr15 hover:shadow-mr35 transition-all group"
                >
                    <nuxt-link
                        class="flex flex-col items-center justify-center gap-4 w-full h-full p-3 py-10"
                        :to="localePath(`/panel/${route.params.brandID}/branches/creation`)"
                        v-if="checkPermissions(['main-panel.branches.add'], brand)"
                    >
                        <img class="down-pop w-32 group-hover:w-40 object-contain transition-all" src="~/assets/images/store.webp" />
                        <div class="flex items-center gap-2">
                            <Icon class="w-3 h-3 bg-primary" name="plus.svg" folder="icons" size="12px" />
                            <small class="text-sm text-primary">{{ $t("panel.branches.Create New Branch") }}</small>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
            <Loading v-if="loading" />
            <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loading && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.branches.Delete Branch')">
                <div class="flex flex-col gap-4">
                    <!-- <img class="w-44 mx-auto" src="~/assets/images/empty.webp" /> -->
                    <div class="flex flex-col gap-2 p-4 rounded-2xl bg-bgSecondary bg-opacity-40 shadow-mr15">
                        <h2 class="text-xl" v-html="$t('panel.branches.You are about to delete this branch', { name: records.list[indexToDelete].name })" />
                        <p class="text-sm opacity-75">
                            {{ $t("panel.branches.deletingBranchDesc") }}
                        </p>
                    </div>
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

// const title = computed(() => `${t("panel.branches.Branches")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.branches.Branches")} - ${t("panel.Your Menuriom Panel")}` });

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
            // LOGGER : log errors in sentry type thing
        })
        .finally(() => (deleting.value = false));
};
// -------------------------------------------------

const handleErrors = (err) => {
    if(!err) return
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // LOGGER : log errors in sentry type thing
};

// getBranchList -------------------------------------------------
const loading = ref(true);
const noMoreRecords = ref(false);
const records = reactive({ list: [] });
const getBranchList_results = await useLazyAsyncData(() => getBranchList(route.params.brandID));

handleErrors(getBranchList_results.error.value);
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
