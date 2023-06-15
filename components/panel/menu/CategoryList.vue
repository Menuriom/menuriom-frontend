<style scoped></style>

<template>
    <div class="flex flex-col w-full">
        <ul class="flex gap-4 w-full pb-2 overflow-auto">
            <li
                class="relative flex flex-col items-center gap-4 p-4 pb-6 rounded-lg bg-white group shadow-nr10 hover:shadow-nr15 transition-all overflow-hidden"
            >
                <div class="flex flex-col items-center justify-center gap-2 w-40 h-40 bg-pencil-tip rounded-xl">
                    <img class="w-16 h-16 mt-2" src="~/assets/images/panel-icons/grid-2-light.png" alt="" />
                    <b class="w-full text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden text-center px-2">All</b>
                </div>
                <span class="absolute bottom-0 flex items-center justify-center gap-1.5 w-full h-6 hover:cursor-grab active:cursor-grabbing">
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                </span>
            </li>
            <li
                class="relative flex flex-col items-center gap-4 p-4 rounded-lg bg-white group shadow-nr10 hover:shadow-nr15 transition-all overflow-hidden"
                v-for="(category, i) in categories.list"
                :key="i"
            >
                <SlideMenu class="-my-2 z-10">
                    <button
                        class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                        @click="openEditDialog(i)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-white shrink-0" name="eye-slash.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Hide This Category") }}</small>
                    </button>
                    <nuxt-link
                        class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin"
                        :to="localePath(`/panel/${route.params.brandID}/menu/category/${category._id}`)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-white shrink-0" name="pen-to-square.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Edit This Category") }}</small>
                    </nuxt-link>
                    <hr class="w-full opacity-40" />
                    <button
                        class="flex items-center gap-2 p-2 rounded-md hover:bg-dolphin text-red-300"
                        @click="openDeleteDialog(i)"
                        v-if="checkPermissions(['main-panel.menu.items'], brand)"
                    >
                        <Icon class="w-4 h-4 bg-red-300 shrink-0" name="trash-can.svg" folder="icons/light" size="16px" />
                        <small>{{ $t("panel.menu.Delete Category") }}</small>
                    </button>
                </SlideMenu>
                <div class="flex flex-col items-center justify-center gap-2 w-40 h-40 bg-pencil-tip rounded-xl">
                    <img class="w-16 h-16 mt-2" src="~/assets/images/icons/burger.png" alt="" />
                    <b class="w-full text-sm text-white whitespace-nowrap text-ellipsis overflow-hidden text-center px-2">Burgers</b>
                </div>
                <span class="absolute bottom-0 flex items-center justify-center gap-1.5 w-full h-6 hover:cursor-grab active:cursor-grabbing">
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                    <Icon class="w-5 h-5 bg-black" name="grip-dots.svg" folder="icons/light" size="20px" />
                </span>
            </li>
        </ul>

        <!-- <Teleport to="body"> </Teleport> -->
    </div>
</template>

<script setup>
import SlideMenu from "~/components/panel/SlideMenu.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

// TODO : category max is hard 100
// only pro tier can upload category logos : others can only pick (we need icon picker [jesus])
// icon picker : list of icons with urls and groups like drinks and salads etc

const errorField = ref("");
const responseMessage = ref("");

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getStaffList -------------------------------------------------
const searchQuery = ref("");
const noMoreRecords = ref(false);
const lastRecordID = ref("");
const categories = reactive({ list: [] });
const getStaffList_results = await useLazyAsyncData(
    () => getStaffList(route.params.brandID, null, categories.list, 50, lastRecordID.value, searchQuery.value),
    { watch: [lastRecordID] }
);
const loading = computed(() => getStaffList_results.pending.value);

if (getStaffList_results.error.value) handleErrors(getStaffList_results.error.value);
watch(getStaffList_results.error, (err) => handleErrors(err));

const handleStaffList_results = (data) => {
    if (!data) return;
    categories.list = data._records;
    noMoreRecords.value = data._noMoreRecords;
};
watch(getStaffList_results.data, (val) => handleStaffList_results(val), { immediate: process.server || nuxtApp.isHydrating });

// -------------------------------------------------
</script>
