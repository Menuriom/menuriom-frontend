<style scoped></style>

<template>
    <section class="flex flex-col items-start gap-4 w-full h-full rounded-lg">
        <h2 class="flex items-center gap-2 text-2xl font-bold">
            <img class="w-6" src="~/assets/images/panel-icons/envelope-open-text-dark.png" alt="" />
            {{ $t("panel.account.Invitations List") }}
        </h2>
        <ul class="flex flex-col gap-4 w-full text-white" v-if="records.list.length > 0">
            <li class="flex items-center gap-4 p-4 rounded-md bg-dolphin hover:bg-neutral-700" v-for="(invite, i) in records.list" :key="i">
                <img class="w-12 h-12 rounded-full object-cover bg-pencil-tip shadow-xl shrink-0" :src="invite.brand.logo" v-if="invite.brand.logo" />
                <img class="w-12 h-12 rounded-full object-cover bg-pencil-tip shadow-xl shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                <div class="flex flex-col gap-2 grow">
                    <h5 class="font-bold">{{ invite.brand.name }}</h5>
                    <p class="text-xs opacity-90" v-html="$t('panel.account-setup.roleInviteDesc', { role: invite.role.name })" />
                </div>
                <div class="flex items-center gap-2 shrink-0" v-if="!invite.loading">
                    <button class="btn text-sm w-max p-3 rounded bg-violet shrink-0" @click="acceptInvite(invite, i)">
                        {{ $t("panel.Accept") }}
                    </button>
                    <button class="btn text-sm w-max p-2.5 rounded border-2 shrink-0" @click="rejectInvite(invite, i)">
                        {{ $t("panel.Reject") }}
                    </button>
                </div>
                <Loading class="w-16 shrink-0" v-else />
            </li>
        </ul>
        <Loading class="w-full my-4" v-if="loading" />
        <button class="btn w-max p-2.5 border-2 border-black rounded-md text-black text-xs" @click="loadMore()" v-if="!noMoreRecords">
            {{ $t("panel.Load More") }}
        </button>
        <small class="text-xs opacity-75" v-else>{{ $t("panel.End of the list") }}</small>
        <div class="flex flex-col items-center gap-2 w-full my-4" v-if="records.list.length === 0">
            <img class="" src="~/assets/images/envelop.png" alt="" />
            <p class="opacity-75">{{ $t("panel.account-setup.You Have No Invitations Yet") }}</p>
            <button :class="{ 'animate-spin': !canRefresh }" @click="refreshInviteList()">
                <Icon class="icon w-6 h-6 gradient" name="arrows-rotate.svg" folder="icons" size="22px" />
            </button>
        </div>
    </section>
</template>

<script setup>
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const route = useRoute();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

useHead({ title: computed(() => t("panel.account.Invitations List")) });

const errorField = ref("");
const responseMessage = ref("");

// accepting invites ----------------------------------------
const acceptInvite = async (invite, index) => {
    if (loading.value || invite.loading) return;
    records.list[index].loading = true;

    if (totalBrands.value >= 3) {
        toast.error(t("panel.account.You can join three brands at a max"), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        records.list[index].loading = false;
        return;
    }

    responseMessage.value = "";
    errorField.value = "";

    const invites = [records.list[index]._id];

    await axios
        .post(`/api/v1/account/invites`, { invites })
        .then((response) => {
            // load brands into userStore
            userStore.injectNewBrand(response.data.brands);

            records.list.splice(index, 1);
            toast.success(t("panel.account-setup.You are now part of this brand staff members", { brand: invite.brand.name }), {
                timeout: 3000,
                rtl: localeProperties.value.dir == "rtl",
            });

            totalBrands.value += 1;
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

            if (responseMessage.value) toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        })
        .finally(() => (records.list[index].loading = false));
};
// ----------------------------------------

// rejecting invites ----------------------------------------
const rejectInvite = async (index) => {
    if (loading.value || index.loading) return;
    // TODO
};
// ----------------------------------------

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing

    if (responseMessage.value) toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
};

// getInviteList -------------------------------------------------
const noMoreRecords = ref(false);
const lastRecordID = ref("");
const records = reactive({ list: [] });
const totalBrands = ref(0);
const getInviteList_results = await useLazyAsyncData(() => getInviteList(records.list, 25, lastRecordID.value), { watch: [lastRecordID] });
const loading = computed(() => getInviteList_results.pending.value);

if (getInviteList_results.error.value) handleErrors(getInviteList_results.error.value);
watch(getInviteList_results.error, (err) => handleErrors(err));

const handleInviteList_results = (data) => {
    if (!data) return;
    records.list = data._invites;
    totalBrands.value = data._totalBrands;
    noMoreRecords.value = data._noMoreRecords;
};
watch(getInviteList_results.data, (val) => handleInviteList_results(val), { immediate: process.server || useNuxtApp().isHydrating });

let canRefresh = ref(true);
const refreshInviteList = () => {
    if (!canRefresh.value) return;
    canRefresh.value = false;
    setTimeout(() => (canRefresh.value = true), 5000);
    getInviteList_results.refresh();
};

const loadMore = () => {
    if (noMoreRecords.value) return;
    const lastRecord = records.list[records.list.length - 1];
    if (lastRecordID.value === lastRecord._id) noMoreRecords.value = true;
    lastRecordID.value = lastRecord._id;
};
// -------------------------------------------------
</script>
