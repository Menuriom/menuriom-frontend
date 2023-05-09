<style scoped></style>

<template>
    <Dialog name="brand-creation-success" @update:open="startConfetti($event)">
        <div class="relative flex flex-col items-center gap-4 md:w-screen max-w-md text-center">
            <div class="flex flex-col gap-1">
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.account-setup.Create Your Brand") }}</h3>
            </div>
            <hr class="w-full border-0 h-0.5 gradient" />
            <Confetti class="w-full h-full" :run="runConfetti" @update:run="runConfetti = $event" />
            <h4 class="text-2xl text-baby-blue text-center font-bold max-w-sm">{{ $t("panel.Congratulations") }}</h4>
            <img class="down-pop w-52 object-contain" src="~/assets/images/store-door.webp" />
            <p class="w-full max-w-xs">{{ $t("panel.account-setup.You have setup your brand and created your first branch") }}!</p>
            <p class="text-sm opacity-75">{{ $t("panel.account-setup.newBrandDirection") }}</p>
            <hr class="w-full opacity-25" />
            <button class="btn w-full p-3 rounded bg-violet" @click="panelStore.closePopUp()">{{ $t("panel.Ok") }}</button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";

const panelStore = usePanelStore();
const runConfetti = ref(false);

const startConfetti = (state) => {
    if (state){
        setTimeout(() => (runConfetti.value = true), 200);
        setTimeout(() => (runConfetti.value = false), 1000);
    }
};
</script>
