<style scoped></style>

<template>
    <Dialog name="find-your-team" :closeable="false">
        <div class="flex flex-col items-center gap-4 md:w-screen max-w-md">
            <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.account-setup.Finding Your Team") }}</h3>
            <p class="text-xs opacity-75 text-center max-w-sm">
                {{ $t("panel.account-setup.An invitation from a restaurant brand must be sent for you to be able to join a team") }}
            </p>
            <ul class="flex items-center gap-2">
                <li class="w-2.5 h-2.5 rounded-full bg-neutral-500"></li>
                <li class="w-5 h-0.5 bg-zinc-500 opacity-50"></li>
                <li class="w-2.5 h-2.5 rounded-full bg-primary"></li>
            </ul>
            <!-- <hr class="w-full border-0 h-0.5 gradient" /> -->
            <hr class="w-3/4 border-neutral-500 border-opacity-40" />
            <h4 class="text-lg">{{ $t("panel.account-setup.Select from your list of staff invites") }}</h4>
            <ul class="flex flex-col gap-2 w-full" v-if="!loading && records.list.length > 0">
                <li
                    class="flex items-center gap-4 p-6 rounded-xl bg-bgSecondary bg-opacity-50 hover:bg-opacity-75 cursor-pointer"
                    v-for="(invite, i) in records.list"
                    :key="i"
                    @click="selectInvite(i)"
                >
                    <img class="w-12 h-12 rounded-full object-cover shadow-xl shrink-0" :src="invite.brand.logo" v-if="invite.brand.logo" />
                    <img class="w-12 h-12 rounded-full object-cover shadow-xl shrink-0" src="~/assets/images/fake-logo2.svg" v-else />
                    <div class="flex flex-col gap-1 grow">
                        <h5 class="font-bold">{{ invite.brand.name }}</h5>
                        <p class="text-xs opacity-75" v-html="$t('panel.account-setup.roleInviteDesc', { role: invite.role.name })" />
                    </div>
                    <span
                        class="flex items-center justify-center w-5 h-5 border-2 border-baby-blue rounded-full shrink-0"
                        :class="{ 'bg-baby-blue': selectedInvites.includes(i) }"
                    >
                        <Icon class="w-5 h-5 bg-dolphin" name="Check.svg" folder="icons/basil" size="22px" v-if="selectedInvites.includes(i)" />
                    </span>
                </li>
            </ul>
            <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!accepting && errorField === '' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <button
                class="btn w-full text-sm p-3 rounded-xl bg-primary"
                :class="{ 'opacity-50': accepting }"
                :disabled="accepting"
                @click="acceptInvites()"
                v-if="!loading && records.list.length > 0"
            >
                <span class="flex items-center justify-center gap-2" v-if="!accepting">
                    {{ $t("panel.account-setup.Accept Selected Invites") }}
                </span>
                <Loading v-else />
            </button>
            <div
                class="flex flex-col items-center gap-2 w-full bg-bgSecondary bg-opacity-50 p-6 rounded-2xl shadow-mr25"
                v-if="!loading && records.list.length === 0"
            >
                <img class="" src="~/assets/images/envelop.png" alt="" />
                <p class="opacity-75">{{ $t("panel.account-setup.You Have No Invitations Yet") }}</p>
            </div>
            <Loading v-if="loading" />
            <hr class="w-3/4 border-neutral-500 border-opacity-40" />
            <button class="w-max text-xs text-secondary hover:underline" :disabled="loading" @click="panelStore.openPopUp('select-account-type')">
                {{ $t("panel.Go Back") }}
            </button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const route = useRoute();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

const errorField = ref("");
const responseMessage = ref("");

const selectedInvites = ref([]);

const selectInvite = (index) => {
    if (selectedInvites.value.includes(index)) selectedInvites.value.splice(index, 1);
    else {
        if (selectedInvites.value.length >= 3) {
            toast.warning(t(`panel.account-setup.You can select n invites at max`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            return;
        }
        selectedInvites.value.push(index);
    }
};

// accepting invites ----------------------------------------
const accepting = ref(false);
const acceptInvites = async () => {
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
        .post(`/api/v1/account/accept-invites`, { invites })
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
    loading.value = false;
};
if (getInviteList_results.data.value) handleInviteList_results(getInviteList_results.data.value);
watch(getInviteList_results.data, (val) => handleInviteList_results(val));
// -------------------------------------------------
</script>
