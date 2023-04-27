<style scoped></style>

<template>
    <Dialog name="find-your-team" :closeable="false">
        <div class="flex flex-col items-center gap-4 w-screen max-w-md">
            <div class="flex flex-col gap-1">
                <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.account-setup.Setting Up Your Account") }}</h3>
                <p class="text-xs opacity-75 text-center max-w-sm">
                    {{ $t("panel.account-setup.please answer a few questions so that we can set up your account to fit you best") }}
                </p>
            </div>
            <ul class="flex items-center gap-2">
                <li class="w-2.5 h-2.5 rounded-full bg-violet"></li>
                <li class="w-5 h-0.5 bg-zinc-500 opacity-50"></li>
                <li class="w-2.5 h-2.5 rounded-full bg-neutral-500"></li>
                <li class="w-5 h-0.5 bg-zinc-500 opacity-50"></li>
                <li class="w-2.5 h-2.5 rounded-full bg-neutral-500"></li>
            </ul>
            <hr class="w-full border-0 h-0.5 gradient" />
            <h4 class="text-lg">{{ $t("panel.account-setup.How are you planning to use Menuriom?") }}</h4>
            <hr class="w-full opacity-25" />
            <button class="w-max text-xs" :disabled="loading" type="button" @click="skip()">{{ $t("Not Now") }}</button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";

const panelStore = usePanelStore();

const loading = ref(false);

const skip = () => panelStore.closePopUp();

// TODO
</script>
