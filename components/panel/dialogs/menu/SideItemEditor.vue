<style scoped></style>

<template>
    <Dialog name="side-item-editor">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/list-tree-dark.png" alt="" />
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.menu.Side Item Groups") }}</h3>
            </div>
        </template>
        <div class="flex flex-col md:w-screen max-w-md">
            <ul class="flex flex-col gap-4 w-full">
                <li class="flex flex-col gap-2 hover:border-2 border-violet" @click="">
                    <Icon class="w-4 h-4 bg-purple-300" name="plus.svg" folder="icons" size="16px" />
                    <span>{{ $t("panel.menu.Create New Group") }}</span>
                </li>
            </ul>
            <hr class="" />
            <button></button>
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
</script>
