<style scoped></style>

<template>
    <section class="flex flex-col items-start gap-4 w-full h-full rounded-lg">
        <h2 class="flex items-center gap-2 text-2xl font-bold">
            <Icon class="w-6 h-6 gradient" name="user-edit.svg" folder="icons/duo" size="24px" />
            {{ $t("panel.account.Profile") }}
        </h2>
        <div class="flex flex-col gap-4 w-full lg:max-w-screen-md p-4 rounded-2xl bg-bgAccent bg-opacity-75 text-fgPrimary">
            <div class="flex flex-wrap items-center gap-4">
                <div
                    class="relative flex flex-col items-start justify-center gap-2 w-20 h-20 rounded-full hover:border-2 border-primary bg-bgSecondary shrink-0"
                >
                    <img class="w-full h-full rounded-full object-contain" :src="avatarBlob" v-if="avatarBlob" />
                    <div class="flex flex-col items-center justify-center gap-2 w-full" v-else>
                        <img class="w-10" src="~/assets/images/panel-icons/knife-fork.svg" alt="" />
                        <span class="text-sm text-pencil-tip opacity-90">{{ $t("panel.brands.Select avatar") }}</span>
                    </div>
                    <form class="absolute inset-0 opacity-0 cursor-pointer" @submit.prevent="" ref="fileInputForm">
                        <input class="absolute inset-0" ref="avatar" type="file" accept=".jpg,.jpeg,.png,.webp" @change="selectAvatarImage()" />
                    </form>
                </div>
                <button
                    class="btn flex items-center gap-1 text-xs p-2 hover:px-6 border-2 border-red-500 border-opacity-50 rounded-lg bg-bgAccent cursor-pointer"
                    v-if="avatarBlob != userStore.avatar"
                    @click="avatarBlob = userStore.avatar"
                >
                    <Icon class="w-4 h-4 bg-rose-300" name="trash-can.svg" folder="icons/light" size="16px" />
                    {{ $t("panel.profile.Delete Avatar Image") }}
                </button>
            </div>
            <div class="flex flex-wrap @3xl:flex-nowrap items-start gap-4 w-full">
                <Input
                    class="w-full flex-grow"
                    :label="$t('panel.profile.Name')"
                    :required="true"
                    v-model="name"
                    :error="errorField == `name` ? responseMessage : ''"
                />
                <Input
                    class="w-full flex-grow"
                    :label="$t('panel.profile.Family')"
                    :required="true"
                    v-model="family"
                    :error="errorField == `family` ? responseMessage : ''"
                />
            </div>
            <small class="flex items-start text-xs text-rose-300" v-if="errorField === 'avatar' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <hr class="w-full opacity-10" />
            <div class="flex flex-wrap @3xl:flex-nowrap items-center gap-4 w-full">
                <div class="flex items-center justify-center gap-1 shrink-0">
                    <h5 class="w-20 text-sm text-secondary text-opacity-75">{{ $t("panel.profile.Email Address") }}</h5>
                    <Icon
                        class="icon w-6 h-6 gradient"
                        :class="{ 'grayscale opacity-50': !emailVerified }"
                        name="badge-check.svg"
                        folder="icons"
                        size="24px"
                        v-if="!loadingVerfications"
                    />
                    <Loading v-else />
                </div>
                <div class="flex items-center justify-center gap-2 w-full md:w-auto grow">
                    <span
                        class="min-h-[52px] p-3.5 bg-bgSecondary bg-opacity-60 text-fgPrimary text-opacity-75 overflow-hidden overflow-ellipsis rounded-xl shadow-mr15 grow"
                        dir="ltr"
                    >
                        {{ userStore.email }}
                    </span>
                    <button
                        class="btn border-2 border-secondary hover:bg-secondary hover:text-bgPrimary rounded-lg p-2 hover:px-6 text-xs sm:text-sm shrink-0"
                        @click="panelStore.openPopUp('change-email')"
                    >
                        {{ $t("panel.profile.Change and verify") }}
                    </button>
                </div>
            </div>
            <div class="flex flex-wrap @3xl:flex-nowrap items-center gap-4 w-full">
                <div class="flex items-center justify-center gap-1 shrink-0">
                    <h5 class="w-20 text-sm text-secondary text-opacity-75">{{ $t("panel.profile.Phone Number") }}</h5>
                    <Icon
                        class="icon w-6 h-6 gradient"
                        :class="{ 'grayscale opacity-50': !mobileVerified }"
                        name="badge-check.svg"
                        folder="icons"
                        size="24px"
                        v-if="!loadingVerfications"
                    />
                    <Loading v-else />
                </div>
                <div class="flex items-center justify-center gap-2 w-full md:w-auto grow">
                    <span
                        class="min-h-[52px] p-3.5 bg-bgSecondary bg-opacity-60 text-fgPrimary text-opacity-75 overflow-hidden overflow-ellipsis rounded-xl shadow-mr15 grow"
                        dir="ltr"
                    >
                        {{ userStore.mobile }}
                    </span>
                    <button
                        class="btn border-2 border-secondary hover:bg-secondary hover:text-bgPrimary rounded-lg p-2 hover:px-6 text-xs sm:text-sm shrink-0"
                        @click="panelStore.openPopUp('change-mobile')"
                    >
                        {{ $t("panel.profile.Change and verify") }}
                    </button>
                </div>
            </div>
            <hr class="w-full opacity-10" />
            <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <button
                class="btn w-max p-3 hover:px-6 rounded-lg bg-primary"
                :class="{ 'opacity-75 cursor-not-allowed': saving }"
                :disabled="saving"
                @click="save()"
            >
                <span v-if="!saving"> {{ $t("panel.profile.Update Info") }} </span>
                <Loading v-else />
            </button>
        </div>

        <Teleport to="body">
            <ChangeEmail />
            <ChangeMobile />
        </Teleport>
    </section>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Loading from "~/components/Loading.vue";
import ChangeEmail from "~/components/panel/dialogs/profile/ChangeEmail.vue";
import ChangeMobile from "~/components/panel/dialogs/profile/ChangeMobile.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

const { t, localeProperties } = useI18n();
const toast = useToast();
const userStore = useUserStore();
const panelStore = usePanelStore();

useHead({ title: t("panel.account.Profile") });

const errorField = ref("");
const responseMessage = ref("");

const fileInputForm = ref(""); // Dom Ref
const avatar = ref(""); // Dom Ref
const avatarFile = ref(null);
const avatarBlob = ref(userStore.avatar);

const name = ref(userStore.name);
const family = ref(userStore.family);

const selectAvatarImage = () => {
    if (!avatar.value.files[0]) return;
    avatarBlob.value = URL.createObjectURL(avatar.value.files[0]);
    avatarFile.value = avatar.value.files[0];
    fileInputForm.value.reset();
};

// saving ----------------------------------------
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const data = new FormData();
    if (avatarFile.value) {
        if (avatarFile.value.size > 1_048_576) {
            responseMessage.value = t("panel.Images must be less than nMB", { size: 1 });
            saving.value = false;
            return;
        }
        data.append("avatar", avatarFile.value);
    }
    data.append("name", name.value);
    data.append("family", family.value);

    await axios
        .put(`/api/v1/user/edit-info`, data)
        .then((response) => {
            userStore.name = response.data.name;
            userStore.family = response.data.family;
            avatarBlob.value = userStore.avatar = response.data.avatar;

            toast.info(t(`panel.profile.Your info has been updated`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
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
        .finally(() => (saving.value = false));
};
// ----------------------------------------

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

// getVerficationInfo -------------------------------------------------
const emailVerified = ref(false);
const mobileVerified = ref(false);
const getVerficationInfo_results = await useFetch("/api/v1/user/check-verification", { lazy: process.client });
const loadingVerfications = computed(() => getVerficationInfo_results.pending.value);

if (getVerficationInfo_results.error.value) handleErrors(getVerficationInfo_results.error.value);
watch(getVerficationInfo_results.error, (err) => handleErrors(err));

const handleVerficationInfo_results = (data) => {
    if (!data) return;
    emailVerified.value = data.emailVerified;
    mobileVerified.value = data.mobileVerified;
};
handleVerficationInfo_results(getVerficationInfo_results.data.value);
watch(getVerficationInfo_results.data, (val) => handleVerficationInfo_results(val));
// -------------------------------------------------
</script>
