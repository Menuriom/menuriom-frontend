<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/user-group-dark.png" alt="" />
                    <h1 class="text-4xl/none font-bold">{{ $t("panel.staff.Staff Members") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.staff.Invite new staff to your team and manage their access") }}
                </small>
            </div>
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-violet text-white flex-shrink-0"
                :to="localePath(`/panel/${route.params.brandID}/staff/invite`)"
                v-if="checkPermissions(['main-panel.staff.invite'], brand)"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.staff.Invite Members") }}
            </nuxt-link>
        </header>
        <div class="flex items-center justify-between gap-4">
            <input class="shadow-nr10 p-2 h-10 rounded w-full max-w-xs" placeholder="Search..." type="text" name="" id="" />
            <label class="flex items-center gap-2">
                <select class="text-sm shadow-nr15 rounded-md bg-dolphin text-white p-1">
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select>
                <small class="text-sm">{{ $t("panel.Record per page") }}</small>
            </label>
        </div>
        <hr class="w-full border-gray-300 opacity-50" />
        <ul class="scroll-thin flex items-center gap-2 w-full pb-2 -my-1 -mb-3 overflow-auto">
            <li class="flex items-center gap-1 text-sm p-1 px-2 border-2 border-dolphin rounded-lg shrink-0">
                <Icon class="w-4 h-4 bg-black shrink-0" name="Stack.svg" folder="icons/basil" size="16px" />
                All Branches
            </li>
            <li class="text-sm p-1 px-2 border-2 rounded-lg shrink-0">Main Branch</li>
            <li class="text-sm p-1 px-2 border-2 rounded-lg shrink-0">Saadat Branch</li>
            <li class="text-sm p-1 px-2 border-2 rounded-lg shrink-0">Saadat Branch</li>
        </ul>
        <hr class="w-full border-gray-300 opacity-50" />
        <small class="flex items-center gap-1 -my-2"><b>25 </b> {{ $t("panel.record out of") }} 125</small>
        <section class="flex flex-col w-full">
            <ul class="grid gap-3 w-full" style="grid-template-columns: repeat(auto-fill, minmax(230px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 w-full rounded-lg bg-white group shadow-nr5 hover:shadow-nr10 transition-all overflow-hidden"
                    v-for="(staff, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="-my-2 z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/${route.params.brandID}/staff/${staff._id}`)"
                            v-if="checkPermissions(['main-panel.staff.edit'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.Edit Role") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-40" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="checkPermissions(['main-panel.staff.delete'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.Remove staff") }}</small>
                        </button>
                    </SlideMenu>
                    <div class="relative w-24 h-24 rounded-full overflow-hidden bg-pencil-tip shadow-nr15 z-2">
                        <img class="w-full h-full object-cover" :src="staff.gallery[0]" v-if="staff.gallery[0]" />
                    </div>
                    <div class="flex flex-col items-center">
                        <h4 class="font-semibold">Kasra Keshvardoost</h4>
                        <p class="text-xs opacity-75">kasrakeshvardoost@gmail.com</p>
                    </div>
                    <small class="border border-violet text-violet p-0.5 px-2 rounded">Waiter</small>
                    <hr class="w-3/4 border-b-2 border-dolphin opacity-10 rounded-full" />
                </li>
                <li class="w-full rounded-lg bg-white hover:border-2 border-violet shadow-nr5 hover:shadow-nr10 transition-shadow overflow-hidden">
                    <nuxt-link
                        class="flex flex-col items-center justify-center gap-4 w-full h-full p-3 py-10"
                        :to="localePath(`/panel/${route.params.brandID}/staff/invite`)"
                        v-if="checkPermissions(['main-panel.staff.invite'], brand)"
                    >
                        <img class="down-pop w-20 object-contain" src="~/assets/images/team.webp" />
                        <div class="flex items-center gap-2">
                            <Icon class="w-3 h-3 bg-violet" name="plus.svg" folder="icons" size="12px" />
                            <small class="text-sm text-violet">{{ $t("panel.staff.Invite New Member") }}</small>
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
            <Dialog name="delete-confirmation" :title="$t('panel.staff.Delete Branch')" v-if="panelStore.popUpOpened == 'delete-confirmation'">
                <div class="flex flex-col gap-3">
                    <img class="w-44 mx-auto" src="~/assets/images/empty.webp" />
                    <h2 class="text-xl" v-html="$t('panel.staff.You are about to delete this branch', { name: records.list[indexToDelete].name })" />
                    <p class="text-sm opacity-75">
                        {{ $t("panel.staff.deletingBranchDesc") }}
                    </p>
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
                            <span v-if="!deleting"> {{ $t("panel.staff.Delete Branch") }} </span>
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
import { getBranchList } from "~/composables/useApiCalls";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.staff.Branches")} - ${t("panel.Your Menuriom Panel")}`);
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
