<style scoped></style>

<template>
    <section class="flex flex-col items-start gap-4 w-full h-full rounded-lg">
        <h2 class="flex items-center gap-2 text-2xl font-bold">
            <Icon class="w-6 h-6 gradient" name="laptop-mobile.svg" folder="icons/duo" size="24px" />
            {{ $t("panel.account.Sessions") }}
        </h2>
        <div class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-bgAccent shadow-mr15">
            <h3 class="text-primary text-lg font-bold">{{ $t("panel.account.This Device") }}</h3>
            <div class="flex flex-col gap-2">
                <h4 class="flex items-center gap-2 w-fit font-bold">
                    <span> {{ currentSession.userAgent?.browser?.name }} {{ currentSession.userAgent?.browser?.version }} </span>
                    -
                    <span> {{ currentSession.userAgent?.os?.name }} {{ currentSession.userAgent?.os?.version }} </span>
                </h4>
                <div class="flex items-center justify-between gap-2 w-full max-w-md">
                    <div class="flex items-center gap-1">
                        <span class="opacity-75"> {{ $t("panel.account.Device") }} </span>: {{ currentSession.userAgent?.device?.model }}
                        {{ currentSession.userAgent?.device?.type || "?" }}
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="opacity-75"> {{ $t("panel.account.IP Address") }} </span>: {{ currentSession.ip }}
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="opacity-75"> {{ $t("panel.account.Online Status") }} </span>:
                        <small class="flex items-center gap-2 border-2 border-green-500 border-opacity-50 rounded-lg p-0.5 px-2">
                            <b class="w-2 h-2 rounded-full bg-green-400"></b> Online
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4 w-full p-4 rounded-2xl bg-bgAccent shadow-mr15">
            <h3 class="text-primary text-lg font-bold">
                {{ $t("panel.account.Other Devices") }} <small class="text-fgPrimary opacity-50">({{ otherActiveSessions.length }})</small>
            </h3>
            <ul class="flex flex-col gap-4 w-full">
                <li
                    class="flex flex-wrap items-center justify-between gap-4 bg-bgSecondary bg-opacity-75 p-3 rounded-xl"
                    v-for="session in otherActiveSessions"
                >
                    <div class="flex flex-col gap-1.5">
                        <h4 class="flex items-center gap-1.5 w-fit font-bold">
                            <span> {{ session.userAgent?.browser?.name }} {{ session.userAgent?.browser?.version }} </span>
                            -
                            <span> {{ session.userAgent?.os?.name }} {{ session.userAgent?.os?.version }} </span>
                        </h4>
                        <div class="flex flex-wrap items-center gap-1.5 text-sm">
                            <span class="opacity-75" v-if="session.userAgent?.device?.type">
                                {{ session.userAgent?.device?.model }}
                                {{ session.userAgent?.device?.type || "?" }}
                                -
                            </span>
                            <span class="opacity-75"> {{ session.ip }} -</span>
                            <small
                                class="flex items-center gap-2 border-2 border-green-500 border-opacity-50 rounded-lg p-0.5 px-2"
                                v-if="session.lastOnline === 'online'"
                            >
                                <b class="w-2 h-2 rounded-full bg-green-400"></b> Online
                            </small>
                            <span class="flex flex-wrap items-center gap-1.5" v-else
                                >{{ $t("panel.account.Last active") }} <b>{{ session.lastOnline }}</b> {{ $t("panel.account.ago") }}</span
                            >
                        </div>
                    </div>
                    <button
                        class="btn border-2 border-rose-500 border-opacity-50 hover:bg-rose-500 bg-opacity-60 hover:bg-opacity-80 text-white p-2 px-3 hover:px-6 text-sm rounded-xl"
                        @click="terminate(session)"
                    >
                        <span v-if="!session.terminating"> {{ $t("panel.account.Terminate") }} </span>
                        <Loading class="" v-else />
                    </button>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import axios from "axios";
import { useFetch } from "nuxt/app";
import { useToast } from "vue-toastification";

const { t, localeProperties } = useI18n();
const toast = useToast();

useHead({ title: t("panel.account.Sessions") });

const errorField = ref("");
const responseMessage = ref("");

const terminate = async (session) => {
    if (session.terminating) return;
    session.terminating = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/api/v1/account/terminate-session`, { session: session._id })
        .then((response) => {
            getSessionInfo_results.refresh();
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
            if (responseMessage.value && process.client) toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
        });
};

const handleErrors = (err) => {
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
    if (responseMessage.value && process.client) toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
};

// getSessionInfo -------------------------------------------------
const currentSession = ref({});
const otherActiveSessions = ref([]);
const getSessionInfo_results = await useFetch("/api/v1/account/active-sessions", { lazy: process.client });
const loading = computed(() => getSessionInfo_results.pending.value);

if (getSessionInfo_results.error.value) handleErrors(getSessionInfo_results.error.value);
watch(getSessionInfo_results.error, (err) => handleErrors(err));

const handleSessionInfo_results = (data) => {
    if (!data) return;
    currentSession.value = data.currentSession;
    otherActiveSessions.value = data.otherActiveSessions;
};
handleSessionInfo_results(getSessionInfo_results.data.value);
watch(getSessionInfo_results.data, (val) => handleSessionInfo_results(val));
// -------------------------------------------------
</script>
