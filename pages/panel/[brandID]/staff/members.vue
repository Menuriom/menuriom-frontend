<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full" ref="form">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="user-group.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.staff.Staff Members") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm opacity-75">
                    {{ $t("panel.staff.Invite new staff to your team and manage their access") }}
                    <!-- TODO : add i icon next to description of any page so that by clicking on it a pop-up opens and shows the general guide for the page -->
                </small>
            </div>
            <div class="flex flex-wrap items-center gap-2">
                <button
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-fgPrimary text-bgPrimary shrink-0"
                    @click="panelStore.openPopUp('sent-invites')"
                    v-if="canInviteNewMembers && checkPermissions(['main-panel.staff.invite'], brand)"
                >
                    <Icon class="w-4 h-4 gradient" name="envelope-open-text.svg" folder="icons/light" size="16px" />
                    {{ $t("panel.side-menu.Sent Invites") }}
                </button>
                <button
                    class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary text-fgPrimary shrink-0"
                    @click="panelStore.openPopUp('invite-new-member')"
                    v-if="canInviteNewMembers && checkPermissions(['main-panel.staff.invite'], brand)"
                >
                    <Icon class="w-3 h-3 bg-fgPrimary" name="plus.svg" folder="icons" size="12px" />
                    {{ $t("panel.staff.Invite Members") }}
                </button>
            </div>
        </header>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <Search class="w-full max-w-xs" v-model="searchQuery" @keyup="searchKeyUp($event)" @search="search()" @clear:search="clearSearch()" />
            <label class="flex items-center gap-2">
                <small class="text-sm">{{ $t("panel.Record per page") }}</small>
                <SelectDropDown
                    class="w-20"
                    customPadding="px-2 py-1"
                    :formHtmlObject="form"
                    :options="[
                        { name: '25', value: '25' },
                        { name: '50', value: '50' },
                        { name: '100', value: '100' },
                    ]"
                    v-slot="{ option }"
                    v-model:selected-option="pp"
                >
                    <span :value="option.value">{{ option.name }}</span>
                </SelectDropDown>
            </label>
        </div>
        <hr class="w-full border-bgSecondary" />
        <ul class="scroll-thin flex items-center gap-2 w-full -my-3 overflow-auto shrink-0">
            <li
                class="btn flex items-center gap-2 text-sm p-2 px-3 hover:px-5 border-2 rounded-xl shrink-0 bg-bgAccent cursor-pointer"
                :class="[selectedBranch === '' ? 'bg-bgSecondary border-primary border-opacity-75' : 'border-bgSecondary opacity-80']"
                @click="selectedBranch = ''"
            >
                <Icon
                    class="w-4 h-4 shrink-0"
                    :class="[selectedBranch === '' ? 'bg-primary  shadow-md shadow-primary' : 'bg-fgPrimary']"
                    name="Stack.svg"
                    folder="icons/basil"
                    size="20px"
                />
                {{ $t("panel.staff.All Branches") }}
            </li>
            <li
                class="btn text-sm p-2 px-3 hover:px-5 border-2 rounded-xl shrink-0 bg-bgAccent cursor-pointer"
                :class="[selectedBranch === branch._id ? 'bg-bgSecondary border-primary border-opacity-75' : 'border-bgSecondary opacity-80']"
                v-for="(branch, i) in branches.list"
                :key="i"
                @click="selectedBranch = branch._id"
            >
                {{ branch.name }}
            </li>
        </ul>
        <hr class="w-full border-bgSecondary" />
        <small class="flex items-center gap-1 -my-2" v-if="totalRecords > 0">
            <b>{{ filteredRecords.list.length }}</b> {{ $t("panel.record out of") }} <span>{{ totalRecords }}</span>
        </small>
        <section class="flex flex-col gap-4 w-full grow">
            <ul class="grid gap-3 w-full" style="grid-template-columns: repeat(auto-fill, minmax(230px, 1fr))">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 md:p-6 w-full rounded-2xl bg-bgAccent group shadow-nr15 hover:shadow-mr35 transition-all overflow-hidden"
                    v-for="(staff, i) in filteredRecords.list"
                    :key="i"
                >
                    <SlideMenu class="-my-2 z-10">
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                            @click="openEditDialog(i)"
                            v-if="checkPermissions(['main-panel.staff.alter'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-fgPrimary shrink-0" name="shield.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.Change Access Of Staff") }}</small>
                        </button>
                        <hr class="w-11/12 mx-auto opacity-10" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30 text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="checkPermissions(['main-panel.staff.delete'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.Remove staff") }}</small>
                        </button>
                    </SlideMenu>
                    <div class="relative w-24 h-24 rounded-full overflow-hidden bg-pencil-tip shadow-nr15 z-2">
                        <img class="w-full h-full object-cover" :src="staff.user.avatar ?? '/avatar.webp'" />
                    </div>
                    <div class="flex flex-col items-center">
                        <h4 class="font-semibold">{{ `${staff.user.name} ${staff.user.family}` }}</h4>
                        <p class="text-xs opacity-75">{{ staff.user.email ? staff.user.email : staff.user.mobile }}</p>
                    </div>
                    <small class="text-xs p-1 px-2 text-fgPrimary border-2 border-primary opacity-75 rounded-lg">{{ staff.role.name }}</small>
                    <div class="flex flex-wrap items-center justify-between gap-2 p-2 px-4 rounded-xl w-full bg-bgSecondary shadow-mr15">
                        <small class="text-secondary">{{ $t("panel.staff.Joined At") }}:</small>
                        <span class="text-xs">{{ new Date(staff.createdAt).toLocaleDateString(locale) }}</span>
                    </div>
                </li>
                <li
                    class="w-full rounded-2xl bg-bgSecondary bg-opacity-50 border-0 hover:border-8 border-primary shadow-nr15 hover:shadow-mr35 transition-all group"
                    v-if="!loading"
                >
                    <button
                        class="flex flex-col items-center justify-center gap-4 w-full h-full p-3 py-10"
                        @click="panelStore.openPopUp('invite-new-member')"
                        v-if="canInviteNewMembers && checkPermissions(['main-panel.staff.invite'], brand)"
                    >
                        <img class="down-pop w-20 group-hover:w-24 object-contain transition-all" src="~/assets/images/team.webp" />
                        <div class="flex items-center gap-2">
                            <Icon class="w-3 h-3 bg-primary" name="plus.svg" folder="icons" size="12px" />
                            <small class="text-sm text-primary">{{ $t("panel.staff.Invite New Member") }}</small>
                        </div>
                    </button>
                </li>
            </ul>
            <Loading v-if="loading" />
            <button
                class="btn w-max p-3 hover:px-6 border border-bgSecondary hover:bg-fgPrimary hover:text-bgPrimary rounded-xl text-xs"
                @click="loadMore()"
                v-if="!noMoreRecords"
            >
                {{ $t("panel.Load More") }}
            </button>
            <small class="text-xs opacity-75" v-if="noMoreRecords && records.list.length > 0">{{ $t("panel.End of the list") }}</small>
            <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loading && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.staff.Remove Staff')" v-if="panelStore.popUpOpened == 'delete-confirmation'">
                <div class="flex flex-col gap-4">
                    <!-- <img class="w-44 mx-auto" src="~/assets/images/empty.webp" /> -->
                    <div class="flex flex-col gap-2 p-4 rounded-2xl bg-bgSecondary bg-opacity-40 shadow-mr15">
                        <h2
                            class="text-xl"
                            v-html="
                                $t('panel.staff.You are about to remove this member', {
                                    member: `${records.list[indexToDelete].user.name} ${records.list[indexToDelete].user.family}`,
                                })
                            "
                        />
                        <p class="text-sm opacity-75">
                            {{ $t("panel.staff.deletingStaffDesc") }}
                        </p>
                    </div>
                    <small class="flex items-center gap-2 text-sm text-red-200 bg-red-700 bg-opacity-10 p-4 rounded-xl shadow-inner">
                        {{ $t("panel.staff.For this user to join your team again, you need to send them a new invite") }}
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
                            <span v-if="!deleting"> {{ $t("panel.staff.Remove Staff") }} </span>
                            <Loading class="h-6" v-else />
                        </button>
                    </div>
                </div>
            </Dialog>
            <InviteNewMember v-if="panelStore.popUpOpened == 'invite-new-member'" />
            <EditMemberAccess
                :_id="staffToEdit._id"
                :user="staffToEdit.user"
                :role="staffToEdit.role"
                :branches="staffToEdit.branches"
                @update:record="editRecord($event)"
                v-if="panelStore.popUpOpened == 'edit-member-access'"
            />
        </Teleport>
    </div>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Search from "~/components/form/Search.vue";
import SlideMenu from "~/components/panel/SlideMenu.vue";
import SelectDropDown from "~/components/form/SelectDropDown.vue";
const InviteNewMember = defineAsyncComponent(() => import("~/components/panel/dialogs/staff/InviteNewMember.vue"));
const EditMemberAccess = defineAsyncComponent(() => import("~/components/panel/dialogs/staff/EditMemberAccess.vue"));
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

useHead({ title: `${t("panel.staff.Staff Members")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const form = ref(); // Dom Ref
const errorField = ref("");
const responseMessage = ref("");

const canInviteNewMembers = ref(true);

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
        .delete(`/api/v1/panel/staff/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            records.list.splice(indexToDelete.value, 1);
            panelStore.closePopUp();

            //  allow user to invite new staff if the limit is under the plan's limit
            canInviteNewMembers.value = response.data.canInviteNewMembers;
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

// editing -------------------------------------------------
const indexToEdit = ref(null);
const staffToEdit = ref(null);
const openEditDialog = (index) => {
    indexToEdit.value = index;
    staffToEdit.value = records.list[index];
    panelStore.openPopUp("edit-member-access");
};
const editRecord = (newRecord) => (records.list[indexToEdit.value] = newRecord);
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

// getStaffList -------------------------------------------------
const searchQuery = ref("");
const noMoreRecords = ref(false);
const lastRecordID = ref("");
const pp = ref({ value: 25, name: "25" });
const records = reactive({ list: [] });
const filteredRecords = reactive({ list: [] });
const totalRecords = ref(0);
const getStaffList_results = await useLazyAsyncData(
    () => getStaffList(route.params.brandID, null, records.list, pp.value.value, lastRecordID.value, searchQuery.value),
    { watch: [lastRecordID] }
);
const loading = computed(() => getStaffList_results.pending.value);

if (getStaffList_results.error.value) handleErrors(getStaffList_results.error.value);
watch(getStaffList_results.error, (err) => handleErrors(err));

const handleStaffList_results = (data) => {
    if (!data) return;
    records.list = data._records;
    totalRecords.value = data._total;
    canInviteNewMembers.value = data._canInviteNewMembers;
    noMoreRecords.value = data._noMoreRecords;
};
watch(getStaffList_results.data, (val) => handleStaffList_results(val), { immediate: process.server || nuxtApp.isHydrating });

const loadMore = () => {
    if (noMoreRecords.value) return;
    const lastRecord = records.list[records.list.length - 1];
    if (lastRecordID.value === lastRecord._id) noMoreRecords.value = true;
    lastRecordID.value = lastRecord._id;
};
// -------------------------------------------------

// getBranchList -------------------------------------------------
const branches = reactive({ list: [] });
const getBranchList_results = await useLazyAsyncData(() => getBranchList(route.params.brandID));
const loadingBranches = computed(() => getBranchList_results.pending.value);

if (getBranchList_results.error.value) handleErrors(getBranchList_results.error.value);
watch(getBranchList_results.error, (err) => handleErrors(err));

const handleBranchList_results = (data) => {
    branches.list = data._records;
};
watch(getBranchList_results.data, (val) => handleBranchList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// records filtering -------------------------------------------------
const selectedBranch = ref("");
const filterRecords = (branchId) => {
    if (!branchId) return (filteredRecords.list = records.list);
    filteredRecords.list = records.list.filter((record) => {
        if (record.branches.length === 0) return true;
        for (let i = 0; i < record.branches.length; i++) {
            if (record.branches[i]._id === branchId) return true;
        }
        return false;
    });
};
watch(selectedBranch, (branchId) => filterRecords(branchId));
watch(records, () => filterRecords(selectedBranch.value), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// search records -------------------------------------------------
const search = () => {
    records.list = [];
    if (lastRecordID.value) lastRecordID.value = "";
    else getStaffList_results.refresh();
};
const searchKeyUp = (event) => {
    if (event.key !== "Enter" || loading.value || !searchQuery.value) return;
    search();
};
const clearSearch = () => {
    if (loading.value || !searchQuery.value) return;
    searchQuery.value = "";
    search();
};
// -------------------------------------------------
</script>
