<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Icon class="w-9 h-9 gradient" name="shield.svg" folder="icons/duo" size="36px" />
                    <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.staff.Staff Roles") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm opacity-75">
                    {{ $t("panel.staff.Here you can create roles and manage the access level of each role") }}
                    <!-- TODO : add i icon next to description of any page so that by clicking on it a pop-up opens and shows the general guide for the page -->
                </small>
            </div>
            <nuxt-link
                class="btn flex items-center justify-center gap-2 p-3 hover:px-6 text-sm rounded-xl bg-primary shrink-0"
                :to="localePath(`/panel/${route.params.brandID}/staff/roles/creation`)"
                v-if="records.list.length < 15 && checkPermissions(['main-panel.staff.roles'], brand)"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.staff.Create New Role") }}
            </nuxt-link>
        </header>
        <hr class="w-full border-bgSecondary" />
        <small class="opacity-75 text-xs">{{ $t("panel.staff.roles.You can create at max 15 roles") }}</small>
        <section class="flex flex-col w-full">
            <ul class="grid gap-3 w-full" style="grid-template-columns: repeat(auto-fill, minmax(230px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-6 p-6 w-full rounded-2xl bg-bgAccent group shadow-nr15 hover:shadow-mr25 transition-all overflow-hidden"
                    v-for="(role, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="-my-2 z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30"
                            :to="localePath(`/panel/${route.params.brandID}/staff/roles/${role._id}`)"
                            v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.roles.Edit Role") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-20" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-bgAccent hover:bg-opacity-30 text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.Delete Role") }}</small>
                        </button>
                    </SlideMenu>
                    <h4 class="text-lg/none font-bold uppercase">{{ role.name }}</h4>
                    <hr class="w-full h-1 border-0 gradient opacity-50 rounded-full" />
                    <div class="flex flex-wrap items-center justify-between gap-1 w-full p-3 px-4 rounded-xl bg-bgSecondary shadow-mr15">
                        <small>{{ $t("panel.staff.Staff Members") }}:</small>
                        <ul class="flex items-center" v-if="role.staff.length > 0">
                            <li class="-ms-3 rounded-full shadow-nr10" v-for="(user, j) in role.staff.slice(0, 3)" :key="j">
                                <img class="w-8 h-8 object-cover" :src="user.avatar ? user.avatar : '/avatar.webp'" :title="`${user.name} ${user.family}`" />
                            </li>
                            <li class="flex items-center justify-center w-8 h-8 rounded-full shadow-nr10 -ms-3 z-2" v-if="role.staff.length > 3">
                                <small class="opacity-50">•••</small>
                            </li>
                        </ul>
                        <small class="text-xs opacity-75 py-2" v-else>{{ $t("panel.staff.roles.No Members") }}</small>
                    </div>
                </li>
            </ul>
            <Loading v-if="loading" />
            <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loading && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.staff.Delete Role')" v-if="panelStore.popUpOpened == 'delete-confirmation'">
                <div class="flex flex-col gap-3">
                    <!-- <img class="w-28 mx-auto" src="~/assets/images/delete.webp" /> -->
                    <hr class="w-full opacity-30 mt-2" />
                    <h2 class="text-xl" v-html="$t('panel.staff.You are about to delete this role', { role: records.list[indexToDelete].name })" />
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md">
                        {{ $t("panel.staff.By deleting this role, you need to assign a new role to all staff members that previously had this role") }}
                    </small>
                    <hr class="w-full opacity-20" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                    </small>
                    <div class="flex items-center gap-2 w-full">
                        <button class="btn w-full p-3 rounded bg-dolphin" :disabled="deleting" @click="panelStore.closePopUp()">
                            {{ $t("Cancel") }}
                        </button>
                        <button
                            class="btn w-full p-3 rounded bg-red-500"
                            :class="{ 'opacity-75 cursor-not-allowed': deleting }"
                            :disabled="deleting"
                            @click="deleteRecord()"
                        >
                            <span v-if="!deleting"> {{ $t("panel.staff.Delete Role") }} </span>
                            <Loading class="h-6" v-else />
                        </button>
                    </div>
                </div>
            </Dialog>
        </Teleport>
    </div>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import SlideMenu from "~/components/panel/SlideMenu.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// const title = computed(() => `${t("panel.staff.Staff Members")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.staff.Staff Members")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

// deleting ----------------------------------------
const deleting = ref(false);
const indexToDelete = ref(null);
const openDeleteDialog = (index) => {
    indexToDelete.value = index;
    panelStore.openPopUp("delete-confirmation");
};
const deleteRecord = async () => {
    if (deleting.value) return;
    deleting.value = true;

    responseMessage.value = "";
    errorField.value = "";

    const id = records.list[indexToDelete.value]._id;

    await axios
        .delete(`/api/v1/panel/staff-roles/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            records.list.splice(indexToDelete.value, 1);
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
            // TODO : log errors in sentry type thing
        })
        .finally(() => (deleting.value = false));
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

// getRolesList -------------------------------------------------
const records = reactive({ list: [] });
const getRolesList_results = await useLazyAsyncData(() => getStaffRolesList(route.params.brandID));
const loading = computed(() => getRolesList_results.pending.value);

if (getRolesList_results.error.value) handleErrors(getRolesList_results.error.value);
watch(getRolesList_results.error, (err) => handleErrors(err));

const handleStaffRolesList_results = (data) => {
    records.list = data._records;
};
watch(getRolesList_results.data, (val) => handleStaffRolesList_results(val), { immediate: process.server || useNuxtApp().isHydrating });
// -------------------------------------------------
</script>
