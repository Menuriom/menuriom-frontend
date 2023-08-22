<style scoped></style>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-col gap-2">
                <h3 class="flex items-center gap-2 text-lg font-bold">
                    <Icon class="w-5 h-5 gradient-re" name="list-tree2.svg" folder="icons/light" size="20px" />
                    {{ $t("panel.menu.Side Items") }}
                </h3>
                <small class="opacity-75">
                    {{ $t("panel.menu.You can add optional side items that can be available when ordering") }}
                </small>
            </div>
            <button
                class="btn flex items-center justify-center gap-2 p-2 px-3 hover:px-6 text-sm rounded-xl bg-fgPrimary text-bgPrimary"
                @click="panelStore.openPopUp('side-item-picker')"
                type="button"
            >
                <Icon class="w-4 h-4 bg-primary" name="bars-progress.svg" folder="icons/light" size="16px" />
                {{ $t("panel.menu.Select Side Items") }}
            </button>
        </div>
        <ul class="flex flex-col gap-2 w-full">
            <li class="flex items-center gap-2 w-full" v-for="(item, i) in selectedSideItemList.values()" :key="i">
                <div class="flex flex-wrap items-center gap-4 p-3 bg-bgSecondary bg-opacity-75 rounded-2xl grow">
                    <div class="flex flex-wrap items-center gap-2 cursor-pointer grow" @click="selectItemGroup(item)">
                        <h4 class="font-bold">{{ item.translation?.[locale]?.name || item.name }}</h4>
                        <span class="w-2 h-0.5 bg-bgPrimary"></span>
                        <small class="text-xs opacity-80 text-secondary">{{ item.translation?.[locale]?.description || item.description }}</small>
                    </div>
                    <button
                        class="flex items-center gap-2 p-2 rounded-xl hover:bg-blue-300 hover:bg-opacity-10 border border-fgPrimary border-opacity-10 cursor-pointer shrink-0"
                        @click="openEditDialog(item)"
                        :title="$t('panel.Edit')"
                    >
                        <Icon class="w-5 h-5 bg-neutral-300" name="pen-to-square.svg" folder="icons/light" size="18px" />
                    </button>
                </div>
                <button
                    class="flex items-center gap-2 p-3.5 border border-bgSecondary rounded-xl hover:bg-rose-400 cursor-pointer group shrink-0"
                    @click="selectedSideItemList.delete(item._id)"
                    :title="$t('panel.Delete')"
                >
                    <Icon class="w-5 h-5 bg-red-300 group-hover:bg-fgPrimary" name="Cross.svg" folder="icons/basil" size="28px" />
                    <small class="text-rose-300 group-hover:text-fgPrimary">{{ $t("panel.Delete") }}</small>
                </button>
            </li>
        </ul>

        <Teleport to="body">
            <SideItemsPicker
                v-model:selectedSideItemList="selectedSideItemList"
                @openDelete="openDeleteDialog($event)"
                @openEdit="openEditDialog($event)"
                v-if="panelStore.popUpOpened == 'side-item-picker'"
            />
            <SideItemCreator v-if="panelStore.popUpOpened == 'side-item-creator'" />
            <SideItemEditor :item="itemToEdit" v-if="panelStore.popUpOpened == 'side-item-editor'" />
            <SideItemDelete :item="itemToDelete" v-if="panelStore.popUpOpened == 'side-item-delete-confirmation'" />
        </Teleport>
    </div>
</template>

<script setup>
const SideItemsPicker = defineAsyncComponent(() => import("~/components/panel/dialogs/menu/SideItemsPicker.vue"));
const SideItemCreator = defineAsyncComponent(() => import("~/components/panel/dialogs/menu/SideItemCreator.vue"));
const SideItemEditor = defineAsyncComponent(() => import("~/components/panel/dialogs/menu/SideItemEditor.vue"));
const SideItemDelete = defineAsyncComponent(() => import("~/components/panel/dialogs/menu/SideItemDelete.vue"));
import { usePanelStore } from "@/stores/panel";

const { locale } = useI18n();
const panelStore = usePanelStore();

const props = defineProps({
    sideItemList: Map,
});

const emit = defineEmits(["update:sideItemList"]);

const selectedSideItemList = ref(props.sideItemList);

const itemToDelete = ref();
const openDeleteDialog = (item) => {
    itemToDelete.value = item;
    panelStore.openPopUp("side-item-delete-confirmation");
};

const itemToEdit = ref();
const openEditDialog = (item) => {
    itemToEdit.value = item;
    panelStore.openPopUp("side-item-editor");
};
</script>
