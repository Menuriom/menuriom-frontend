<style scoped></style>

<template>
    <Dialog name="invite-new-member">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/envelope-open-text-light.png" alt="" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.staff.Invite New Member") }}</h3>
            </div>
        </template>
        <transition name="slide-up" mode="out-in">
            <div class="flex flex-col items-center gap-4 md:w-screen max-w-md mt-4" ref="form" v-if="stage === 1">
                <div class="flex flex-col gap-4 w-full">
                    <small> {{ $t("panel.staff.Enter email of user you want to invite, and then select what role you want to apply to them") }} </small>
                    <Input
                        :required="true"
                        :label="$t('auth.Email Address')"
                        :placeholder="$t('panel.staff.Email address of user that they signup with')"
                        v-model="email"
                        :error="errorField == 'email' ? responseMessage : ''"
                    />
                    <SelectDropDown
                        :required="true"
                        :formHtmlObject="form"
                        :label="$t('panel.staff.Role')"
                        :options="roles.list"
                        v-slot="{ option }"
                        v-model:selected-option="selectedRole.option"
                        :error="errorField == 'selectedRole' ? responseMessage : ''"
                    >
                        <span :value="option.value">{{ option.name }}</span>
                    </SelectDropDown>
                    <nuxt-link
                        class="flex items-center gap-1 w-max text-xs text-purple-300 hover:underline underline-offset-2"
                        :to="localePath(`/panel/${panelStore.selectedBrandId}/staff/roles`)"
                        @click="panelStore.closePopUp()"
                        v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                    >
                        <Icon class="w-3 h-3 bg-purple-300" name="arrow-angle.svg" folder="icons" size="10px" />
                        {{ $t("panel.staff.Go to staff roles") }}
                    </nuxt-link>
                    <hr class="w-full opacity-25" />
                    <small> {{ $t("panel.staff.You can select specific branches for this member") }} </small>
                    <MultiSelectDropDown
                        class="w-full flex-grow"
                        :formHtmlObject="form"
                        :label="$t('panel.branches.Branches')"
                        :options="branches.list"
                        v-slot="{ option }"
                        v-model:selected-options="selectedBranches.list"
                        :error="errorField == 'selectedBranches' ? responseMessage : ''"
                    >
                        <span :value="option.value">{{ option.name }}</span>
                    </MultiSelectDropDown>
                    <small class="text-xs opacity-75">
                        {{ $t("panel.staff.If you dont select any branches this user will have access to all branches") }}
                    </small>
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
            <div class="relative flex flex-col items-center gap-4 md:w-screen max-w-md text-center" v-else-if="stage === 2">
                <div class="flex flex-col items-center gap-4 my-8">
                    <img class="rotate-pop object-contain" src="~/assets/images/check.png" v-if="stage === 2" />
                    <p class="text-xl gradient-text font-extrabold">{{ $t("panel.staff.Invite has been sent") }}</p>
                    <small class="text-blue-200 bg-blue-900 bg-opacity-20 p-2 border border-blue-900 rounded-md" v-if="noUser">
                        {{ $t("panel.staff.noUserNotice") }}
                    </small>
                    <small class="opacity-75"> {{ $t("panel.staff.You can always revoke your sent invitations from sent invite list") }} </small>
                </div>
                <button class="text-sm text-violet underline underline-offset-2" @click="stage = 1">{{ $t("panel.staff.Send Another Invite") }}</button>
            </div>
        </transition>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Input from "~/components/form/Input.vue";
import SelectDropDown from "~/components/form/SelectDropDown.vue";
import MultiSelectDropDown from "~/components/form/MultiSelectDropDown.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const nuxtApp = useNuxtApp();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const stage = ref(1);
const form = ref(); // Dom Ref

const noUser = ref(false);
const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

const email = ref("");
const selectedRole = reactive({ option: { name: "", value: "" } });
const selectedBranches = reactive({ list: [] });

// sending invite  ----------------------------------------
const sendInvite = async () => {
    if (loading.value) return;
    loading.value = true;

    noUser.value = false;
    responseMessage.value = "";
    errorField.value = "";

    const data = {
        email: email.value,
        selectedRole: selectedRole.option.value,
        selectedBranches: selectedBranches.list.map((x) => x.value),
    };

    await axios
        .post(`/api/v1/panel/staff/invite`, data, { headers: { brand: route.params.brandID } })
        .then((response) => {
            noUser.value = !response.data.userExists;
            stage.value = 2;
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

// getBranchList -------------------------------------------------
const loadingBranches = ref(true);
const branches = reactive({ list: [] });
const getBranchList_results = await useLazyAsyncData(() => getBranchList(route.params.brandID));

if (getBranchList_results.error.value) handleErrors(getBranchList_results.error.value);
watch(getBranchList_results.error, (err) => handleErrors(err));

const handleBranchList_results = (data) => {
    branches.list = data._records.map((record) => {
        return { name: record.name, value: record._id };
    });
    loadingBranches.value = false;
};
watch(getBranchList_results.data, (val) => handleBranchList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getRoleList -------------------------------------------------
const loadingRoles = ref(true);
const roles = reactive({ list: [] });
const getRoleList_results = await useLazyAsyncData(() => getStaffRolesList(route.params.brandID, ["name"]));

if (getRoleList_results.error.value) handleErrors(getRoleList_results.error.value);
watch(getRoleList_results.error, (err) => handleErrors(err));

const handleRoleList_results = (data) => {
    roles.list = data._records.map((record) => {
        return { name: record.name, value: record._id };
    });
    loadingRoles.value = false;
};
watch(getRoleList_results.data, (val) => handleRoleList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
