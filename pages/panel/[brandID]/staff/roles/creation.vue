<style scoped></style>

<template>
    <div class="flex flex-col gap-4 md:gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/shield.png" alt="" />
                    <h1 class="text-4xl/tight font-bold">{{ $t("panel.staff.roles.Role Creation") }}</h1>
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
                    <span>{{ $t("panel.staff.roles.Role Creation") }}</span>
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

                <div class="flex flex-wrap gap-4">
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
                            class="flex items-center justify-center w-5 h-5 border-2 rounded transition-all shadow-xl shrink-0"
                            :class="[selectedPermissions.list.has(permission._id) ? 'border-baby-blue bg-baby-blue shadow-baby-blue' : 'border-zinc-500']"
                        >
                            <Icon class="w-5 h-5 bg-dolphin" name="Check.svg" folder="icons/basil" size="24px" />
                        </span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div
                        class="flex flex-col gap-4 p-4 w-full rounded-md bg-neutral-700 shadow-nr15 hover:shadow-nr35"
                        v-for="(permissions, i) in permission.groups.slice(1, permission.groups.length)"
                        :key="i"
                    >
                        <h3 class="">{{ permissions[0].translation?.[locale]?.groupLabel || permissions[0].groupLabel }}</h3>
                        <hr class="w-full opacity-20" />
                        <ul class="flex flex-col gap-4">
                            <li class="flex items-center gap-3" v-for="(permission, j) in permissions" :key="j" @click="togglePermissions(permission._id)">
                                <span
                                    class="flex items-center justify-center w-5 h-5 border-2 rounded transition-all shadow-nr5 shrink-0"
                                    :class="[
                                        selectedPermissions.list.has(permission._id) ? 'border-baby-blue bg-baby-blue shadow-baby-blue' : 'border-zinc-500',
                                    ]"
                                >
                                    <Icon class="w-5 h-5 bg-dolphin" name="Check.svg" folder="icons/basil" size="24px" />
                                </span>
                                {{ permission.translation?.[locale]?.label || permission.label }}
                            </li>
                        </ul>
                    </div>
                </div>

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
                            <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
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
import FormLangList from "~/components/panel/FormLangList.vue";
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

const title = computed(() => `${t("panel.staff.roles.Role Creation")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const selectedPermissions = reactive({ list: new Set() });
const roleName = ref("");

const togglePermissions = (permission_id) => {
    if (!selectedPermissions.list.has(permission_id)) selectedPermissions.list.add(permission_id);
    else selectedPermissions.list.delete(permission_id);
};

// saving ----------------------------------------
const percentage = ref(0);
const saving = ref(false);
const save = async () => {
    if (saving.value) return;
    saving.value = true;

    formLang.value = "default";
    responseMessage.value = "";
    errorField.value = "";

    const data = new FormData();
    gallery.value.forEach((image) => data.append("gallery", image.file));
    for (const val in name.values) data.append(`name.${val}`, name.values[val]);
    for (const val in address.values) data.append(`address.${val}`, address.values[val]);
    if (postalCode.value) data.append("postalCode", postalCode.value);
    telephoneNumbers.value.forEach((number) => {
        if (number) data.append("telephoneNumbers[]", number);
    });

    await axios
        .post(`/api/v1/panel/branches/${route.params.brandID}`, data, {
            headers: { brand: route.params.brandID },
            onUploadProgress: (event) => (percentage.value = parseInt(Math.round((event.loaded / event.total) * 100))),
        })
        .then((response) => {
            toast.success(t(`panel.staff.roles.New branch created`), { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
            router.push(localePath(`/panel/${route.params.brandID}/branches`));
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
const loadingSettings = computed(() => getPermissionsList_results.pending.value);

if (getPermissionsList_results.error.value) handleErrors(getPermissionsList_results.error.value);
watch(getPermissionsList_results.error, (err) => handleErrors(err));

const handlePermissionsList_results = (data) => {
    permission.groups = data._permissions;
};
watch(getPermissionsList_results.data, (val) => handlePermissionsList_results(val), { immediate: process.server || useNuxtApp().isHydrating });
// -------------------------------------------------
</script>
