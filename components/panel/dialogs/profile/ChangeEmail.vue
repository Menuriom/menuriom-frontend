<style scoped></style>

<template>
    <Dialog name="change-email" :title="$t('panel.profile.Change And Verify Email')">
        <div class="flex flex-col gap-4 md:w-screen max-w-md mt-4">
            <small class="opacity-75">{{ $t(`panel.profile.emailVerifyMessage`) }}</small>
            <div class="flex flex-wrap sm:flex-nowrap items-start gap-2" v-if="timeLeft == 0">
                <Input
                    name="email address"
                    class="w-full flex-grow"
                    :label="$t('panel.profile.Email Address')"
                    :required="true"
                    v-model="email"
                    :error="errorField == `email` ? responseMessage : ''"
                />
                <button class="btn border-2 border-primary rounded-xl p-3 hover:px-6 text-sm shrink-0" @click="sendCode()">
                    <span v-if="!sending"> {{ $t("panel.profile.send code") }} </span>
                    <Loading class="h-6" v-else />
                </button>
            </div>
            <Input
                class="w-full flex-grow"
                :label="$t('panel.profile.Verfication Code')"
                :required="true"
                v-model="code"
                :error="errorField == `code` ? responseMessage : ''"
                v-else
            />

            <hr class="w-full border-neutral-500 border-opacity-40" />
            <small class="flex items-start text-xs text-rose-300" v-if="errorField == '' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <button
                class="btn w-full p-3 hover:px-6 rounded-xl bg-primary"
                :class="{ 'opacity-75 cursor-not-allowed': verifying }"
                :disabled="verifying"
                @click="verify()"
                v-if="timeLeft > 0"
            >
                <span v-if="!verifying">
                    {{ $t("panel.Confirm") }}
                    <span v-if="timeLeft">{{ new Date(timeLeft * 1000).toISOString().substring(14, 19) }}</span>
                </span>
                <Loading class="h-6" v-else />
            </button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Input from "~/components/form/Input.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t, localeProperties } = useI18n();
const toast = useToast();
const userStore = useUserStore();
const panelStore = usePanelStore();

const errorField = ref("");
const responseMessage = ref("");

const email = ref(userStore.email);
const code = ref("");
const canResend = ref(false);
const timeLeft = ref(0);

const sending = ref(false);
const sendCode = async () => {
    if (sending.value) return;
    sending.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/api/v1/user/change-email`, { email: useNumbersToEnglish(email.value.toLowerCase()) })
        .then((response) => {
            timeLeft.value = response.data.expireIn;
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
        .finally(() => (sending.value = false));
};

const verifying = ref(false);
const verify = async () => {
    if (verifying.value) return;
    verifying.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/api/v1/user/verify-email`, { code: useNumbersToEnglish(code.value) })
        .then((response) => {
            userStore.email = response.data.email;
            toast.info(t(`panel.profile.Your email address has been updated`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            timeLeft.value = 0;
            code.value = "";
            panelStore.closePopUp();
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
        .finally(() => (verifying.value = false));
};

onMounted(() => {
    setInterval(() => {
        if (timeLeft.value) {
            timeLeft.value = Math.max(0, timeLeft.value - 1);
            canResend.value = false;
        } else canResend.value = true;
    }, 1000);
});
</script>
