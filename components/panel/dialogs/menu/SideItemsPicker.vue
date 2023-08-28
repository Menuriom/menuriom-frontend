<style scoped></style>

<template>
    <Dialog name="side-item-picker">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <Icon class="w-8 h-8 gradient" name="list-tree.svg" folder="icons/duo" size="32px" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.menu.Side Item Groups") }}</h3>
            </div>
        </template>
        <div class="flex flex-col gap-4 md:w-screen max-w-md">
            <small class="opacity-75 -mt-1">
                {{ $t("panel.menu.Select side item groups that you want to add to this item of the menu") }}
            </small>
            <hr class="border-bgSecondary" />
            <div class="flex flex-col items-center p-2" v-if="sideItemGroups.list.length == 0">
                <span class="">{{ $t("panel.menu.You havent created any side groups yet") }}</span>
            </div>
            <ul class="flex flex-col gap-2 w-full">
                <li
                    class="flex flex-col items-center gap-2 p-4 bg-bgSecondary bg-opacity-50 rounded-2xl border-2 border-transparent hover:border-primary cursor-pointer"
                    @click="panelStore.openPopUp('side-item-creator')"
                    v-if="canCreateNewGroup"
                >
                    <Icon class="w-4 h-4 bg-primary" name="plus.svg" folder="icons" size="16px" />
                    <span class="text-xs">{{ $t("panel.menu.Create New Group") }}</span>
                </li>
                <li
                    class="flex flex-wrap items-center gap-4 bg-bgSecondary bg-opacity-50 rounded-2xl shadow-mr10"
                    v-for="(item, id) in sideItemGroups.list"
                    :key="id"
                >
                    <div class="flex items-center justify-center h-14 ps-4 cursor-pointer" @click="toggleItemGroupSelection(item, id)">
                        <span
                            class="flex items-center justify-center w-4 h-4 border-2 rounded transition-all shrink-0"
                            :class="[selectedItemGroups.has(id) ? 'border-secondary bg-secondary shadow-xl shadow-secondary' : 'border-zinc-500']"
                        >
                            <Icon class="w-4 h-4 bg-neutral-800" name="Check.svg" folder="icons/basil" size="20px" />
                        </span>
                    </div>
                    <div class="flex flex-col py-4 cursor-pointer grow" @click="toggleItemGroupSelection(item, id)">
                        <h4 class="font-bold">{{ item.translation?.[locale]?.name || item.name }}</h4>
                        <small class="text-xs opacity-80 text-secondary">{{ item.translation?.[locale]?.description || item.description }}</small>
                    </div>
                    <div class="flex flex-wrap items-center gap-1 pe-4">
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-300 hover:bg-opacity-20 border border-fgPrimary border-opacity-10 cursor-pointer shrink-0"
                            @click="$emit('openEdit', item)"
                            :title="$t('panel.Edit')"
                        >
                            <Icon class="w-5 h-5 bg-neutral-300" name="pen-to-square.svg" folder="icons/light" size="18px" />
                        </button>
                        <button
                            class="flex items-center gap-2 p-2 rounded-xl hover:bg-rose-300 hover:bg-opacity-20 border border-fgPrimary border-opacity-10 cursor-pointer shrink-0"
                            @click="$emit('openDelete', item)"
                            :title="$t('panel.Delete')"
                        >
                            <Icon class="w-5 h-5 bg-red-300" name="trash-can.svg" folder="icons/light" size="18px" />
                        </button>
                    </div>
                </li>
            </ul>
            <Loading v-if="loadingGroups" />
            <small class="flex items-start gap-0.5 text-xs text-rose-400" v-if="!loadingGroups && errorField === '' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-400 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <!-- <hr class="border-bgSecondary" /> -->
            <!-- <button
                class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-md bg-primary text-white shrink-0"
                @click="saveSelected()"
                v-if="selectedItemGroups.size > 0"
            >
                <Icon class="w-4 h-4 bg-white" name="bars-progress.svg" folder="icons/light" size="16px" />
                {{ $t("panel.menu.Add Selected Groups") }}
            </button> -->
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";

const { locale, t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const nuxtApp = useNuxtApp();
const panelStore = usePanelStore();

const props = defineProps({
    selectedSideItemList: Map,
});

const emit = defineEmits(["openEdit", "openDelete", "update:selectedSideItemList"]);

const errorField = ref("");
const responseMessage = ref("");

const selectedItemGroups = ref(props.selectedSideItemList);
const toggleItemGroupSelection = (item, id) => {
    selectedItemGroups.value.has(id) ? selectedItemGroups.value.delete(id) : selectedItemGroups.value.set(id, item);
};
// const saveSelected = () => {
//     emit("update:selectedSideItemList", selectedItemGroups.value);
//     panelStore.closePopUp();
// };

const handleErrors = (err) => {
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getCategoryList -------------------------------------------------
const sideItemGroups = reactive({ list: {} });
const canCreateNewGroup = ref(true);
const getGroupList_results = await useLazyAsyncData(() => getSideItemGroupList(route.params.brandID));
const loadingGroups = computed(() => getGroupList_results.pending.value);

if (getGroupList_results.error.value) handleErrors(getGroupList_results.error.value);
watch(getGroupList_results.error, (err) => handleErrors(err));

const handleGroupList_results = (data) => {
    if (!data) return;
    data._records.forEach((record) => (sideItemGroups.list[record._id] = record));
    canCreateNewGroup.value = data._canCreateNewGroup;
};
watch(getGroupList_results.data, (val) => handleGroupList_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
