<style scoped></style>

<template>
    <div class="flex flex-col gap-4 md:gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/shield.png" alt="" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.staff.roles.Edit Role") }}</h1>
                </div>
                <div class="flex items-center gap-1 text-sm ms-2">
                    <nuxt-link :to="localePath(`/panel/${route.params.brandID}`)">
                        <Icon class="w-4 h-4 bg-pencil-tip hover:bg-violet" name="house.svg" folder="icons/light" size="16px" />
                    </nuxt-link>
                    <span>&gt;</span>
                    <nuxt-link class="hover:text-violet" :to="localePath(`/panel/${route.params.brandID}/staff/roles`)">
                        {{ $t("panel.staff.Staff Roles") }}
                    </nuxt-link>
                    <span>&gt;</span>
                    <span>{{ $t("panel.staff.roles.Edit Role") }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <section class="flex flex-wrap-reverse lg:flex-nowrap items-start justify-center gap-4 w-full">
            <div class="flex flex-col gap-4 w-full max-w-screen-lg p-4 rounded-lg bg-pencil-tip text-white shadow-nr35">
                <Input
                    :label="$t('panel.staff.roles.Role Name')"
                    :required="true"
                    v-model="roleName"
                    :error="errorField == `roleName` ? responseMessage : ''"
                />
                <hr class="w-full opacity-20" />
                <h3 class="flex items-center gap-2 text-lg">
                    <Icon class="w-5 h-5 bg-white" name="shield.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.staff.roles.Permissions") }}
                </h3>
                <small class="text-xs opacity-75 -mt-2">
                    {{ $t("panel.staff.roles.You can manage the access of this role to different parts of the panel") }}
                </small>

                <div class="flex flex-wrap gap-4 select-none">
                    <div
                        class="flex items-center justify-between gap-2 p-4 rounded-md bg-dolphin shadow-nr15 hover:shadow-nr35 cursor-pointer grow"
                        v-for="(permission, i) in permission.groups[0]"
                        :key="i"
                        @click="togglePermissions(permission._id)"
                    >
                        <div class="flex items-center gap-2">
                            <img class="w-6" src="~/assets/images/panel-icons/rectangles-mixed.png" alt="" v-if="permission._id === 'main-panel'" />
                            <img class="w-6" src="~/assets/images/panel-icons/cash-register-light.png" alt="" v-if="permission._id === 'orders-panel'" />
                            <img class="w-6" src="~/assets/images/panel-icons/mobile-button-light.png" alt="" v-if="permission._id === 'ordering-app'" />
                            <small class="text-sm">{{ permission.translation?.[locale]?.label || permission.label }}</small>
                        </div>
                        <span
                            class="flex items-center justify-center w-5 h-5 border-2 rounded transition-all shrink-0"
                            :class="[
                                selectedPermissions.list.has(permission._id) ? 'border-baby-blue bg-baby-blue shadow-xl shadow-baby-blue' : 'border-zinc-200',
                            ]"
                        >
                            <Icon class="w-5 h-5 bg-dolphin" name="Check.svg" folder="icons/basil" size="24px" />
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-96 overflow-auto select-none">
                    <div
                        class="flex flex-col gap-4 p-4 w-full rounded-md bg-pencil-tip text-neutral-200 shadow-nr15 hover:shadow-nr35"
                        v-for="(permissions, i) in permission.groups.slice(1, permission.groups.length)"
                        :key="i"
                    >
                        <div class="flex items-center gap-3 w-max max-w-full cursor-pointer" @click="toggleAllPermissionGroup(i + 1)">
                            <span
                                class="flex items-center justify-center w-4 h-4 border-2 rounded transition-all shrink-0"
                                :class="[
                                    permissions[0].selectLevel == 'all' || permissions[0].selectLevel == 'some'
                                        ? 'border-baby-blue bg-baby-blue shadow-xl shadow-baby-blue'
                                        : 'border-zinc-500',
                                ]"
                            >
                                <Icon
                                    class="w-4 h-4 bg-pencil-tip"
                                    :name="permissions[0].selectLevel == 'all' ? 'Check.svg' : 'Minus.svg'"
                                    folder="icons/basil"
                                    size="22px"
                                />
                            </span>
                            <h3 class="font-bold text-violet">{{ permissions[0].translation?.[locale]?.groupLabel || permissions[0].groupLabel }}</h3>
                        </div>
                        <hr class="w-full opacity-20" />
                        <ul class="flex flex-col gap-5 w-full">
                            <li
                                class="flex items-center gap-3 w-max max-w-full cursor-pointer"
                                v-for="(permission, j) in permissions"
                                :key="j"
                                @click="togglePermissions(permission._id, i + 1)"
                            >
                                <span
                                    class="flex items-center justify-center w-4 h-4 border-2 rounded transition-all shrink-0"
                                    :class="[
                                        selectedPermissions.list.has(permission._id)
                                            ? 'border-baby-blue bg-baby-blue shadow-xl shadow-baby-blue'
                                            : 'border-zinc-500',
                                    ]"
                                >
                                    <Icon class="w-4 h-4 bg-pencil-tip" name="Check.svg" folder="icons/basil" size="22px" />
                                </span>
                                <div class="flex flex-wrap items-center gap-1 select-none">
                                    <small class="text-sm" :class="[selectedPermissions.list.has(permission._id) ? 'text-cyan-200' : 'text-white']">
                                        {{ permission.translation?.[locale]?.label || permission.label }}
                                    </small>
                                    <small class="text-[11px] opacity-80" v-if="permission.desc">
                                        ({{ permission.translation?.[locale]?.desc || permission.desc }})
                                    </small>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <Loading v-if="loadingPermissionsList" />

                <hr class="w-full opacity-20" />
                <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!saving && errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <div class="flex flex-wrap items-center gap-4">
                    <nuxt-link
                        class="btn flex items-center justify-center gap-2 p-3 py-2.5 text-sm rounded-lg border-2 border-neutral-300 flex-shrink-0"
                        :to="localePath(`/panel/${route.params.brandID}/staff/roles`)"
                    >
                        <Icon
                            class="w-3 h-3 py-2 bg-white"
                            :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                            name="arrow-angle.svg"
                            folder="icons"
                            size="12px"
                        />
                        {{ $t("panel.Go Back") }}
                    </nuxt-link>
                    <button
                        class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-violet text-white flex-shrink-0"
                        :class="{ 'opacity-50': saving }"
                        :disabled="saving"
                        @click="save()"
                        v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                    >
                        <span class="flex items-center gap-2" v-if="!saving">
                            <Icon class="w-4 h-4 bg-white" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            {{ $t("panel.staff.roles.Edit Role") }}
                        </span>
                        <Loading v-else />
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import Input from "~/components/form/Input.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, localeProperties, t } = useI18n();
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const toast = useToast();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.staff.roles.Edit Role")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const selectedPermissions = reactive({ list: new Set() });
const roleName = ref("");

const containAllPermissionsInGroup = (permissions = []) => {
    let count = 0;
    for (let i = 0; i < permissions.length; i++) {
        if (selectedPermissions.list.has(permissions[i])) count++;
    }
    if (count === 0) return "none";
    else if (count === permissions.length) return "all";
    else return "some";
};

const togglePermissions = (permission_id, index) => {
    if (!selectedPermissions.list.has(permission_id)) selectedPermissions.list.add(permission_id);
    else selectedPermissions.list.delete(permission_id);

    if (!index) return;
    permission.groups[index][0].selectLevel = containAllPermissionsInGroup(permission.groups[index].map((p) => p._id));
};

const toggleAllPermissionGroup = (index) => {
    const selectLevel = permission.groups[index][0].selectLevel;
    const permissions = permission.groups[index].map((p) => p._id);
    if (selectLevel == "all" || selectLevel == "some") {
        for (let i = 0; i < permissions.length; i++) selectedPermissions.list.delete(permissions[i]);
        permission.groups[index][0].selectLevel = "none";
    } else {
        for (let i = 0; i < permissions.length; i++) selectedPermissions.list.add(permissions[i]);
        permission.groups[index][0].selectLevel = "all";
    }
};

// saving ----------------------------------------
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    responseMessage.value = "";
    errorField.value = "";

    await axios
        .put(
            `/api/v1/panel/staff-roles/${route.params.id}`,
            { roleName: roleName.value, permissions: [...selectedPermissions.list] },
            { headers: { brand: route.params.brandID } }
        )
        .then((response) => {
            toast.info(t(`panel.staff.roles.Role has been updated`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            router.push(localePath(`/panel/${route.params.brandID}/staff/roles`));
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
        .finally(() => (saving.value = false));
};
// -------------------------------------------------

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getRoleInfo -------------------------------------------------
const getRoleInfo_results = await useLazyAsyncData(() => getRoleInfo(route.params.brandID, route.params.id));
const loadingRoleInfo = computed(() => getRoleInfo_results.pending.value);

if (getRoleInfo_results.error.value) handleErrors(getRoleInfo_results.error.value);
watch(getRoleInfo_results.error, (err) => handleErrors(err));

const handleRoleInfo_results = (data) => {
    roleName.value = data._name;
    selectedPermissions.list = new Set([...data._permissions]);
};
watch(getRoleInfo_results.data, (val) => handleRoleInfo_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getPermissionsList -------------------------------------------------
const permission = reactive({ groups: [] });
const getPermissionsList_results = await useLazyAsyncData(() => getPermissionsList(route.params.brandID));
const loadingPermissionsList = computed(() => getPermissionsList_results.pending.value);

if (getPermissionsList_results.error.value) handleErrors(getPermissionsList_results.error.value);
watch(getPermissionsList_results.error, (err) => handleErrors(err));

const handlePermissionsList_results = (data) => {
    permission.groups = data._permissions;

    for (let i = 1; i < permission.groups.length; i++) {
        permission.groups[i][0].selectLevel = containAllPermissionsInGroup(permission.groups[i].map((p) => p._id));
    }
};
watch(getPermissionsList_results.data, (val) => handlePermissionsList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
