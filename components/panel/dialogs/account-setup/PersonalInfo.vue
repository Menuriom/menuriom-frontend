<style scoped></style>

<template>
    <Dialog name="personal-info" :closeable="false">
        <div class="flex flex-col items-center gap-4 md:w-screen max-w-md">
            <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.account-setup.Setting Up Your Account") }}</h3>
            <p class="text-xs opacity-75 text-center max-w-sm">
                {{ $t("panel.account-setup.please answer a few questions so that we can set up your account to fit you best") }}
            </p>
            <hr class="w-3/4 border-neutral-500 border-opacity-40" />
            <form class="flex flex-col gap-4 w-full" @submit.prevent="completeSignup()">
                <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgPrimary bg-opacity-90 shadow-inner">
                    <h4 class="text-lg">{{ $t("panel.account-setup.What is your full name and phone number?") }}</h4>
                    <div class="flex items-center gap-4">
                        <Input
                            class="w-full flex-grow"
                            name="name"
                            :required="true"
                            :label="$t('auth.First Name')"
                            v-model="name"
                            :error="errorField == 'name' ? responseMessage : ''"
                        />
                        <Input
                            class="w-full flex-grow"
                            name="family"
                            :required="true"
                            :label="$t('auth.Last Name')"
                            v-model="family"
                            :error="errorField == 'family' ? responseMessage : ''"
                        />
                    </div>
                    <Input
                        name="mobile"
                        :required="true"
                        mask="+98 ### ### ####"
                        :label="$t('auth.Phone Number')"
                        v-model="mobile"
                        :error="errorField == 'mobile' ? responseMessage : ''"
                    />
                </div>
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <button class="btn w-full p-3 hover:px-6 rounded-xl bg-primary" :class="{ 'opacity-75 cursor-not-allowed': loading }" :disabled="loading">
                    <span v-if="!loading"> {{ $t("auth.Continue") }} </span>
                    <Loading class="" v-else />
                </button>
            </form>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Input from "~/components/form/Input.vue";
import MobileInput from "~/components/form/MobileInput.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();
const user = storeToRefs(userStore);

const name = ref(user.name.value || "");
const family = ref(user.name.family || "");
const mobile = ref(user.name.mobile || "");

const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

const completeSignup = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/api/v1/user/complete-info`, {
            name: name.value,
            family: family.value,
            mobile: mobile.value,
        })
        .then((response) => {
            user.name.value = response.data.name;
            user.family.value = response.data.family;
            user.mobile.value = response.data.mobile.replaceAll(" ", "");

            if (Object.keys(user.brands.value).length == 0) {
                panelStore.openPopUp("select-account-type");
            }
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
        .finally(() => (loading.value = false));
};
</script>
