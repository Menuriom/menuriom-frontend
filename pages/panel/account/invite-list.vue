<style scoped></style>

<template>
    <section class="flex flex-col items-start gap-4 w-full bg-pencil-tip text-white">
        <ul class="flex flex-col w-full" v-if="!loading && records.list.length > 0">
            <li class="flex items-center gap-4 p-4 rounded-md bg-dolphin hover:bg-neutral-700 cursor-pointer" v-for="(invite, i) in records.list" :key="i">
                <img class="w-12 h-12 rounded-full object-cover bg-pencil-tip shadow-xl shrink-0" :src="invite.brand.logo" v-if="invite.brand.logo" />
                <img class="w-12 h-12 rounded-full object-cover bg-pencil-tip shadow-xl shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                <div class="flex flex-col gap-2 grow">
                    <h5 class="font-bold">{{ invite.brand.name }}</h5>
                    <p class="text-xs opacity-90" v-html="$t('panel.account-setup.roleInviteDesc', { role: invite.role.name })" />
                </div>
                <div class="flex items-center gap-2 shrink-0" v-if="!invite.loading">
                    <button
                        class="btn w-max p-3 rounded bg-violet shrink-0"
                        :class="{ 'opacity-50': invite.loading }"
                        :disabled="invite.loading"
                        @click="acceptInvite(i)"
                    >
                        {{ $t("panel.Accept") }}
                    </button>
                    <button
                        class="btn w-max p-3 rounded border-2 shrink-0"
                        :class="{ 'opacity-50': invite.loading }"
                        :disabled="invite.loading"
                        @click="rejectInvite(i)"
                    >
                        {{ $t("panel.Reject") }}
                    </button>
                </div>
                <Loading v-else />
            </li>
        </ul>
        <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!loading && errorField === '' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small>
        <div class="flex flex-col items-center gap-2 my-4" v-if="!loading && records.list.length === 0">
            <img class="" src="~/assets/images/envelop.png" alt="" />
            <p class="opacity-75">{{ $t("panel.account-setup.You Have No Invitations Yet") }}</p>
        </div>
        <Loading v-if="loading" />
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
definePageMeta({ title: "panel.account.Invitations List", icon: "/_nuxt/assets/images/panel-icons/envelope-open-text-dark.png" });

const errorField = ref("");
const responseMessage = ref("");

// accepting invites ----------------------------------------
const acceptInvite = async (index) => {
    if (accepting.value) return;
    accepting.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const invites = selectedInvites.value.map((index) => records.list[index]._id);
    if (invites.length === 0) {
        accepting.value = false;
        return;
    }

    await axios
        .post(`/api/v1/account/invites`, { invites })
        .then((response) => {
            // load brands into userStore
            userStore.injectNewBrand(response.data.brands);

            window.location.reload();

            // close the popup
            // panelStore.closePopUp();
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
        .finally(() => (accepting.value = false));
};
// ----------------------------------------

// rejecting invites ----------------------------------------
const rejectInvite = async (index) => {};
// ----------------------------------------

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getRolesList -------------------------------------------------
const loading = ref(true);
const records = reactive({ list: [] });
const getInviteList_results = await useLazyAsyncData(() => getInviteList());

if (getInviteList_results.error.value) handleErrors(getInviteList_results.error.value);
watch(getInviteList_results.error, (err) => handleErrors(err));

const handleInviteList_results = (data) => {
    records.list = data._invites;
    records.list.map((record) => {
        return { ...record, loading: false };
    });
    loading.value = false;
};
if (getInviteList_results.data.value) handleInviteList_results(getInviteList_results.data.value);
watch(getInviteList_results.data, (val) => handleInviteList_results(val));
// -------------------------------------------------
</script>
