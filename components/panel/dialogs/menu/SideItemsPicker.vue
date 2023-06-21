<style scoped></style>

<template>
    <Dialog name="side-item-picker">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/list-tree-light.png" alt="" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.menu.Side Item Groups") }}</h3>
            </div>
        </template>
        <div class="flex flex-col gap-4 md:w-screen max-w-md">
            <small class="opacity-75 -mt-1">
                {{ $t("panel.menu.Select side item groups that you want to add to this item of the menu") }}
            </small>
            <hr class="opacity-25" />
            <ul class="flex flex-col gap-4 w-full">
                <li
                    class="flex flex-col items-center gap-2 p-4 bg-neutral-800 rounded-lg border-2 border-transparent hover:border-violet"
                    @click="panelStore.openPopUp('side-item-creator')"
                >
                    <Icon class="w-4 h-4 bg-purple-300" name="plus.svg" folder="icons" size="16px" />
                    <span class="text-purple-300 text-xs">{{ $t("panel.menu.Create New Group") }}</span>
                </li>
            </ul>
            <div class="flex flex-col items-center p-4">
                <span class="opacity-75">{{ $t("panel.menu.You havent created any side groups yet") }}</span>
            </div>
            <Loading v-if="loadingGroups" />
            <hr class="opacity-25" />
            <button class="btn flex items-center justify-center gap-2 p-3 text-sm rounded-md bg-violet text-white flex-shrink-0" @click="save()">
                <Icon class="w-4 h-4 bg-white" name="bars-progress.svg" folder="icons/light" size="16px" />
                {{ $t("panel.menu.Add Selected Groups") }}
            </button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

// TODO : max side group is 100

const sideItemGroups = reactive({ list: [] });
const loadingGroups = false;
</script>
