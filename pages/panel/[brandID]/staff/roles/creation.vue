<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="shield.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.staff.roles.Role Creation") }}</h1>
                </div>
                <div class="flex items-center gap-1 text-sm ms-2">
                    <nuxt-link :to="localePath(`/panel/${route.params.brandID}`)">
                        <Icon class="w-4 h-4 bg-fgPrimary hover:bg-primary" name="house.svg" folder="icons/light" size="16px" />
                    </nuxt-link>
                    <span class="opacity-60">&gt;</span>
                    <nuxt-link class="hover:text-primary" :to="localePath(`/panel/${route.params.brandID}/staff/roles`)">
                        {{ $t("panel.staff.Staff Roles") }}
                    </nuxt-link>
                    <span class="opacity-60">&gt;</span>
                    <span class="text-secondary">{{ $t("panel.staff.roles.Role Creation") }}</span>
                </div>
            </div>
        </header>
        <hr class="w-full border-bgSecondary" />
        <section class="flex flex-wrap-reverse lg:flex-nowrap items-start gap-4 w-full">
            <div class="flex flex-col gap-4 w-full max-w-4xl p-4 rounded-2xl bg-bgAccent shadow-nr15">
                <Input
                    :label="$t('panel.staff.roles.Role Name')"
                    :required="true"
                    v-model="roleName"
                    :error="errorField == `roleName` ? responseMessage : ''"
                />
                <hr class="w-full border-bgSecondary" />
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="shield.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.staff.roles.Permissions") }}
                </h3>
                <small class="text-xs opacity-75 -mt-2">
                    {{ $t("panel.staff.roles.You can manage the access of this role to different parts of the panel") }}
                </small>

                <div class="flex flex-wrap gap-4 select-none">
                    <div
                        class="flex items-center justify-between gap-2 p-4 rounded-xl bg-bgSecondary shadow-nr5 hover:shadow-mr25 transition-all cursor-pointer grow"
                        v-for="(permission, i) in permission.groups[0]"
                        :key="i"
                        @click="togglePermissions(permission._id)"
                    >
                        <div class="flex items-center gap-2">
                            <Icon class="w-6 h-6 gradient" name="rectangles-mixed.svg" folder="icons/duo" size="24px" v-if="permission._id === 'main-panel'" />
                            <Icon class="w-6 h-6 gradient" name="cash-register.svg" folder="icons/duo" size="24px" v-if="permission._id === 'orders-panel'" />
                            <Icon class="w-6 h-6 gradient" name="mobile-button.svg" folder="icons/duo" size="24px" v-if="permission._id === 'ordering-app'" />
                            <small class="text-sm">{{ permission.translation?.[locale]?.label || permission.label }}</small>
                        </div>
                        <span
                            class="flex items-center justify-center w-5 h-5 border-2 rounded transition-all shrink-0"
                            :class="[
                                selectedPermissions.list.has(permission._id) ? 'border-secondary bg-secondary shadow-xl shadow-secondary' : 'border-zinc-500',
                            ]"
                        >
                            <Icon class="w-5 h-5 bg-dolphin" name="Check.svg" folder="icons/basil" size="24px" />
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full select-none">
                    <div
                        class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgSecondary bg-opacity-25 shadow-nr10 hover:shadow-mr25 transition-all"
                        v-for="(permissions, i) in permission.groups.slice(1, permission.groups.length)"
                        :key="i"
                    >
                        <div class="flex items-center gap-3 w-max max-w-full cursor-pointer" @click="toggleAllPermissionGroup(i + 1)">
                            <span
                                class="flex items-center justify-center w-4 h-4 border-2 rounded transition-all shrink-0"
                                :class="[
                                    permissions[0].selectLevel == 'all' || permissions[0].selectLevel == 'some'
                                        ? 'border-secondary bg-secondary shadow-nr25 shadow-secondary'
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
                            <h3 class="font-bold text-primary">{{ permissions[0].translation?.[locale]?.groupLabel || permissions[0].groupLabel }}</h3>
                        </div>
                        <hr class="w-full border-bgSecondary" />
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
                                            ? 'border-secondary bg-secondary shadow-xl shadow-secondary'
                                            : 'border-zinc-500',
                                    ]"
                                >
                                    <Icon class="w-4 h-4 bg-pencil-tip" name="Check.svg" folder="icons/basil" size="22px" />
                                </span>
                                <div class="flex flex-wrap items-center gap-1 select-none">
                                    <small
                                        class="text-sm"
                                        :class="[selectedPermissions.list.has(permission._id) ? 'text-cyan-100 text-opacity-90' : ' text-opacity-90']"
                                    >
                                        {{ permission.translation?.[locale]?.label || permission.label }}
                                    </small>
                                    <small class="text-[11px] opacity-75" v-if="permission.desc">
                                        ({{ permission.translation?.[locale]?.desc || permission.desc }})
                                    </small>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <Loading v-if="loadingPermissionsList" />

                <hr class="w-full border-bgSecondary" />
                <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!saving && errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-400 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <div class="flex flex-wrap items-center gap-4">
                    <nuxt-link
                        class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-bgSecondary"
                        :to="localePath(`/panel/${route.params.brandID}/staff/roles`)"
                    >
                        <Icon
                            class="w-3 h-3 py-2 bg-fgPrimary"
                            :class="[localeProperties.dir == 'rtl' ? 'rotate-45' : '-rotate-[135deg]']"
                            name="arrow-angle.svg"
                            folder="icons"
                            size="12px"
                        />
                        {{ $t("panel.Go Back") }}
                    </nuxt-link>
                    <button
                        class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary"
                        :class="{ 'opacity-50': saving }"
                        :disabled="saving"
                        @click="save()"
                        v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                    >
                        <span class="flex items-center gap-2" v-if="!saving">
                            <Icon class="w-3 h-3 bg-fgPrimary" name="plus.svg" folder="icons" size="12px" />
                            {{ $t("panel.staff.roles.Create Role") }}
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
const toast = useToast();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.staff.roles.Role Creation")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.staff.roles.Role Creation")} - ${t("panel.Your Menuriom Panel")}` });

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
        .post(
            `/api/v1/panel/staff-roles/`,
            { roleName: roleName.value, permissions: [...selectedPermissions.list] },
            { headers: { brand: route.params.brandID } }
        )
        .then((response) => {
            toast.success(t(`panel.staff.roles.New role created`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
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

// getPermissionsList -------------------------------------------------
const permission = reactive({ groups: [] });
const getPermissionsList_results = await useLazyAsyncData(() => getPermissionsList(route.params.brandID));
const loadingPermissionsList = computed(() => getPermissionsList_results.pending.value);

if (getPermissionsList_results.error.value) handleErrors(getPermissionsList_results.error.value);
watch(getPermissionsList_results.error, (err) => handleErrors(err));

const handlePermissionsList_results = (data) => {
    permission.groups = data._permissions;
};
watch(getPermissionsList_results.data, (val) => handlePermissionsList_results(val), { immediate: process.server || useNuxtApp().isHydrating });
// -------------------------------------------------
</script>
