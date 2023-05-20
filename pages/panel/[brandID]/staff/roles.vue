<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <img class="w-9" src="~/assets/images/panel-icons/user-group-dark.png" alt="" />
                    <h1 class="text-4xl/tight font-bold">{{ $t("panel.staff.Staff Roles") }}</h1>
                </div>
                <small class="hidden sm:flex text-sm">
                    {{ $t("panel.staff.Here you can create roles and manage the access level of each role") }}
                    <!-- TODO : add i icon next to description of any page so that by clicking on it a pop-up opens and shows the general guide for the page -->
                </small>
            </div>
            <button
                class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-lg bg-violet text-white flex-shrink-0"
                @click="panelStore.openPopUp('invite-new-member')"
                v-if="canCreateNewRoles && checkPermissions(['main-panel.staff.roles'], brand)"
            >
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                {{ $t("panel.staff.Create New Role") }}
            </button>
        </header>
        <hr class="w-full border-gray-300 opacity-50" />
        <small class="opacity-75 text-xs">You can create at max 15 roles</small>
        <section class="flex flex-col w-full">
            <ul class="grid gap-3 w-full" style="grid-template-columns: repeat(auto-fill, minmax(230px, 1fr))" v-show="!loading">
                <li
                    class="relative flex flex-col items-center gap-4 p-4 w-full h-32 rounded-lg bg-white group shadow-nr5 hover:shadow-nr10 transition-all overflow-hidden"
                    v-for="(role, i) in records.list"
                    :key="i"
                >
                    <SlideMenu class="-my-2 z-10">
                        <nuxt-link
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                            :to="localePath(`/panel/${route.params.brandID}/staff/roles/${role._id}`)"
                            v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.Edit Role") }}</small>
                        </nuxt-link>
                        <hr class="w-full opacity-40" />
                        <button
                            class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300 cursor-pointer"
                            @click="openDeleteDialog(i)"
                            v-if="checkPermissions(['main-panel.staff.roles'], brand)"
                        >
                            <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                            <small>{{ $t("panel.staff.Delete Role") }}</small>
                        </button>
                    </SlideMenu>
                    <h4 class="text-lg font-bold uppercase">{{ role.name }}</h4>
                    <!-- TODO : show users that got this role (3+ more) -->
                    <!-- <div class="relative w-24 h-24 rounded-full overflow-hidden bg-pencil-tip shadow-nr15 z-2">
                        <img class="w-full h-full object-cover" :src="staff.user.avatar" v-if="staff.user.avatar" />
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="text-xs opacity-75">{{ staff.user.email ? staff.user.email : staff.user.mobile }}</p>
                    </div> -->
                    <hr class="w-3/4 border-b-2 border-dolphin opacity-10 rounded-full" />
                </li>
            </ul>
            <Loading v-if="loading" />
            <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loading && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
        </section>

        <Teleport to="body">
            <Dialog name="delete-confirmation" :title="$t('panel.staff.Delete Role')" v-if="panelStore.popUpOpened == 'delete-confirmation'">
                <div class="flex flex-col gap-3">
                    <!-- <img class="w-28 mx-auto" src="~/assets/images/delete.webp" /> -->
                    <hr class="w-full opacity-30 my-2" />
                    <h2 class="text-xl" v-html="$t('panel.staff.You are about to delete this role', { role: records.list[indexToDelete].name })" />
                    <small class="text-sm text-red-200 bg-red-900 bg-opacity-20 p-2 border border-red-900 rounded-md mt-4">
                        {{ $t("panel.staff.By deleting this role, you need to assign a new role to all staff members that previously had this role") }}
                    </small>
                    <hr class="w-full opacity-40" />
                    <small class="flex items-start text-xs text-rose-300" v-if="responseMessage !== ''">
                        <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
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
            <!-- TODO : For adding new roles make two version that can switch between (one with less complexcity and one more detailed) -->
            <!-- for example complex one shows all the permissions that user can toggle but simple one only shows permission labels and by toggling gives all permissions of that group -->
        </Teleport>

        <!-- TODO : role creation and edit -> page base form -->
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

const title = computed(() => `${t("panel.staff.Staff Members")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const canCreateNewRoles = ref(true);

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
        .delete(`/api/v1/panel/staff/${id}`, { headers: { brand: route.params.brandID } })
        .then((response) => {
            records.list.splice(indexToDelete.value, 1);
            panelStore.closePopUp();
            // TODO : allow user to create new branch if the limit is under the plan's limit
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
const loading = ref(true);
const records = reactive({ list: [] });
const getRolesList_results = await useLazyAsyncData(() => getStaffRolesList(route.params.brandID));

if (getRolesList_results.error.value) handleErrors(getRolesList_results.error.value);
watch(getRolesList_results.error, (err) => handleErrors(err));

const handleStaffRolesList_results = (data) => {
    records.list = data._records;
    canCreateNewRoles.value = data._canCreateNewRoles;
    loading.value = false;
};
if (getRolesList_results.data.value) handleStaffRolesList_results(getRolesList_results.data.value);
watch(getRolesList_results.data, (val) => handleStaffRolesList_results(val));
// -------------------------------------------------
</script>
