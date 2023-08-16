<style scoped></style>

<template>
    <Dialog name="sent-invites">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/envelops-light.png" alt="" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.side-menu.Sent Invites") }}</h3>
            </div>
        </template>
        <hr class="w-full opacity-30 my-1" />
        <div class="flex flex-col items-center gap-4 md:w-screen max-w-md">
            <ul class="flex flex-col gap-4 w-full">
                <transition-group name="slide-left">
                    <li
                        class="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 bg-dolphin rounded-md p-3"
                        v-for="(invite, i) in invites.list"
                        :key="i"
                    >
                        <div class="flex flex-col items-start gap-1 grow">
                            <h2>{{ invite.email }}</h2>
                            <small class="border border-primary text-purple-300 p-0.5 px-2 rounded">{{ invite.role.name }}</small>
                        </div>
                        <div class="flex items-center justify-center md:w-24">
                            <span
                                class="text-sm text-white text-opacity-80 p-1 px-3 rounded-full"
                                :class="[invite.status === 'sent' ? 'bg-black' : 'bg-rose-950']"
                            >
                                {{ invite.status }}
                            </span>
                        </div>
                        <button
                            class="flex items-center gap-2 p-2 rounded-md bg-neutral-700 hover:bg-rose-500 hover:bg-opacity-10 cursor-pointer flex-shrink-0"
                            @click="deleteInvite(i)"
                        >
                            <Icon class="w-5 h-5 bg-red-300" name="trash-can.svg" folder="icons/light" size="18px" />
                        </button>
                    </li>
                </transition-group>
            </ul>
            <Loading v-if="loading" />
            <button class="btn w-max p-2 border border-neutral-500 rounded-md text-zinc-200 text-xs" @click="loadMore()" v-if="!noMoreRecords">
                {{ $t("panel.Load More") }}
            </button>
            <small class="text-xs opacity-75" v-if="noMoreRecords">{{ $t("panel.End of the list") }}</small>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();
const route = useRoute();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

const errorField = ref("");
const responseMessage = ref("");

// deleting invite  ----------------------------------------
const deleteInvite = async (index) => {
    if (loadingInvites.value) return;

    responseMessage.value = "";
    errorField.value = "";

    const invite = invites.list[index];
    invites.list.splice(index, 1);

    await axios
        .delete(`/api/v1/panel/staff/invite/${invite._id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {})
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
        });
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

// getInviteList -------------------------------------------------
const noMoreRecords = ref(false);
const lastRecordID = ref("");
const invites = reactive({ list: [] });
const getInviteList_results = await useLazyAsyncData(() => getSentInviteList(route.params.brandID, invites.list, 25, lastRecordID.value), {
    watch: [lastRecordID],
});
const loadingInvites = computed(() => getInviteList_results.pending.value);

if (getInviteList_results.error.value) handleErrors(getInviteList_results.error.value);
watch(getInviteList_results.error, (err) => handleErrors(err));

const handleInviteList_results = (data) => {
    if (!data) return;
    invites.list = data._invites;
    noMoreRecords.value = data._noMoreRecords;
};
watch(getInviteList_results.data, (val) => handleInviteList_results(val), { immediate: process.server || useNuxtApp().isHydrating });

const loadMore = () => {
    if (noMoreRecords.value) return;
    const lastRecord = invites.list[invites.list.length - 1];
    if (lastRecordID.value === lastRecord._id) noMoreRecords.value = true;
    lastRecordID.value = lastRecord._id;
};
// -------------------------------------------------
</script>
