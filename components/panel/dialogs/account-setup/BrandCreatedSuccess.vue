<style scoped></style>

<template>
    <Dialog name="brand-creation-success" :closeable="false" @update:open="startConfetti($event)">
        <div class="relative flex flex-col items-center gap-4 md:w-screen max-w-md text-center">
            <!-- <div class="flex flex-col gap-1">
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.account-setup.Create Your Brand") }}</h3>
            </div> -->
            <div class="flex flex-col items-center gap-4 bg-bgSecondary bg-opacity-25 shadow-mr25 rounded-2xl w-full p-6">
                <Confetti class="w-full h-full" :run="runConfetti" @update:run="runConfetti = $event" />
                <img class="down-pop w-52 object-contain" src="~/assets/images/store-door.webp" />
                <!-- <h4 class="text-4xl text-secondary text-center font-bold max-w-sm">{{ $t("panel.Congratulations") }}</h4> -->
                <p class="w-full max-w-full text-xl font-bold gradient-text">
                    {{ $t("panel.account-setup.You have setup your brand and created your first branch") }}!
                </p>
            </div>
            <p class="text-sm opacity-75">{{ $t("panel.account-setup.newBrandDirection") }}</p>
            <button class="btn p-4 px-8 hover:px-12 rounded-xl bg-primary" @click="panelStore.closePopUp()">{{ $t("panel.Ok") }}</button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";

const panelStore = usePanelStore();
const runConfetti = ref(false);

const startConfetti = (state) => {
    if (state) {
        setTimeout(() => (runConfetti.value = true), 200);
        setTimeout(() => (runConfetti.value = false), 1000);
    }
};
</script>
