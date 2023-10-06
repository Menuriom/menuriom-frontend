<style scoped></style>

<template>
    <Dialog name="edit-member-access">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <Icon class="w-9 h-9 gradient" name="shield.svg" folder="icons/duo" size="36px" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.staff.Change Access Of Staff") }}</h3>
            </div>
        </template>
        <transition name="slide-up" mode="out-in">
            <div class="flex flex-col items-center gap-4 md:w-screen max-w-md mt-4" ref="form">
                <div class="flex flex-col gap-4 w-full">
                    <div class="flex items-center gap-2 bg-fgPrimary text-bgPrimary p-4 rounded-2xl shadow-mr25">
                        <img class="w-14 aspect-square object-cover rounded-full shadow-nr35" :src="user.avatar ?? '/avatar.webp'" />
                        <div class="flex flex-col">
                            <h4 class="font-bold text-xl">{{ `${user.name} ${user.family}` }}</h4>
                            <p class="text-xs opacity-75">{{ user.email ? user.email : user.mobile }}</p>
                        </div>
                    </div>
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
                        class="flex items-center gap-1 w-max text-xs text-secondary border border-bgSecondary p-1 px-2 rounded-lg hover:underline underline-offset-2"
                        :to="localePath(`/panel/${panelStore.selectedBrandId}/staff/roles`)"
                        @click="panelStore.closePopUp()"
                        v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                    >
                        <Icon class="w-3 h-3 bg-secondary" name="arrow-angle.svg" folder="icons" size="10px" />
                        {{ $t("panel.staff.Go to staff roles") }}
                    </nuxt-link>
                    <hr class="w-full border-bgSecondary" />
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
                    <hr class="w-full border-bgSecondary" />
                    <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                    </small>
                    <button
                        class="btn w-full p-3 hover:px-6 rounded-xl bg-primary"
                        :class="{ 'opacity-75': loading }"
                        :disabled="loading"
                        @click="editingAccess()"
                    >
                        <span v-if="!loading"> {{ $t("panel.Save") }} </span>
                        <Loading v-else />
                    </button>
                </div>
            </div>
        </transition>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import SelectDropDown from "~/components/form/SelectDropDown.vue";
import MultiSelectDropDown from "~/components/form/MultiSelectDropDown.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { localeProperties, t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const nuxtApp = useNuxtApp();
const toast = useToast();
const panelStore = usePanelStore();
const userStore = useUserStore();

const props = defineProps({
    _id: String,
    user: Object,
    role: Object,
    branches: Array,
});
const emit = defineEmits(["update:record"]);

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const form = ref(); // Dom Ref

const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

const user = reactive({ ...props.user });
const selectedRole = reactive({ option: { name: props.role.name, value: props.role._id } });
const selectedBranches = reactive({ list: [...props.branches.map((branch) => ({ name: branch.name, value: branch._id }))] });

// editing access  ----------------------------------------
const editingAccess = async () => {
    if (loading.value) return;
    loading.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const data = {
        selectedRole: selectedRole.option.value,
        selectedBranches: selectedBranches.list.map((x) => x.value),
    };

    await axios
        .put(`/api/v1/panel/staff/${props._id}`, data, { headers: { brand: route.params.brandID } })
        .then((response) => {
            toast.info(t("panel.staff.Member access has been updated"), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            emit("update:record", response.data.updatedRecord);
            panelStore.closePopUp();
        })
        .catch((err) => {
            console.log({ err });
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
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getBranchList -------------------------------------------------
const branches = reactive({ list: [] });
const getBranchList_results = await useLazyAsyncData(() => getBranchList(route.params.brandID));
const loadingBranches = computed(() => getBranchList_results.pending.value);

if (getBranchList_results.error.value) handleErrors(getBranchList_results.error.value);
watch(getBranchList_results.error, (err) => handleErrors(err));

const handleBranchList_results = (data) => {
    branches.list = data._records.map((record) => {
        return { name: record.name, value: record._id };
    });
};
watch(getBranchList_results.data, (val) => handleBranchList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getRoleList -------------------------------------------------
const roles = reactive({ list: [] });
const getRoleList_results = await useLazyAsyncData(() => getStaffRolesList(route.params.brandID, ["name"]));
const loadingRoles = computed(() => getRoleList_results.pending.value);

if (getRoleList_results.error.value) handleErrors(getRoleList_results.error.value);
watch(getRoleList_results.error, (err) => handleErrors(err));

const handleRoleList_results = (data) => {
    roles.list = data._records.map((record) => {
        return { name: record.name, value: record._id };
    });
};
watch(getRoleList_results.data, (val) => handleRoleList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
