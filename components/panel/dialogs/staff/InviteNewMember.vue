<style scoped></style>

<template>
    <Dialog name="invite-new-member">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/envelope-open-text-dark.png" alt="" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.staff.Invite New Member") }}</h3>
            </div>
        </template>
        <div class="flex flex-col items-center gap-4 w-screen max-w-md mt-4">
            <div class="flex flex-col gap-4 w-full">
                <p class="text-xs opacity-75 max-w-sm">
                    {{ $t("panel.staff.Enter email of user you want to invite, and then select what role you want to apply to them") }}
                </p>
                <Input
                    class="w-full flex-grow"
                    :required="true"
                    :label="$t('auth.Email Address')"
                    v-model="name"
                    :error="errorField == 'name' ? responseMessage : ''"
                />
                <Input
                    class="w-full flex-grow"
                    :label="$t('panel.brands.Brand Slogan')"
                    v-model="slogan"
                    :error="errorField == 'slogan' ? responseMessage : ''"
                />
                <nuxt-link
                    class="flex items-center gap-1 w-max text-xs text-purple-300 hover:underline underline-offset-2"
                    :to="localePath(`/panel/${panelStore.selectedBrandId}/staff/roles`)"
                    v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                >
                    <Icon class="w-3 h-3 bg-purple-300" name="arrow-angle.svg" folder="icons" size="10px" />
                    {{ $t("panel.staff.Go to staff roles") }}
                </nuxt-link>
                <hr class="w-full opacity-25" />
                <h4 class="flex items-center gap-2">
                    <img class="w-5" src="~/assets/images/panel-icons/newspaper.png" />
                    {{ $t("panel.brands.Your main branch info") }}
                </h4>
                <Input
                    :required="true"
                    :label="$t('panel.brands.Main Branch Address')"
                    v-model="address"
                    :error="errorField == 'address' ? responseMessage : ''"
                />
                <hr class="w-full opacity-25" />
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <button class="btn w-full p-3 rounded bg-violet" :class="{ 'opacity-75': loading }" :disabled="loading" @click="sendInvite()">
                    <span v-if="!loading"> {{ $t("panel.staff.Send Invite") }} </span>
                    <Loading v-else />
                </button>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Input from "~/components/form/Input.vue";
import RangeSlider from "~/components/form/RangeSlider.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

const logo = ref(""); // Dom Ref
const logoBlob = ref(null);

const name = ref("");
const slogan = ref("");
const branchSize = ref(1);
const address = ref("");
const tel = ref("");

const sendInvite = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .post(`/api/v1/panel/staff/invite`, {})
        .then((response) => {
            panelStore.openPopUp("invite-success");
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
        .finally(() => (loading.value = false));
};
</script>
