<style scoped></style>

<template>
    <Dialog name="select-account-type" :closeable="false">
        <div class="flex flex-col items-center gap-6 md:w-screen max-w-md">
            <h3 class="text-2xl md:text-3xl font-bold text-center">{{ $t("panel.account-setup.Setting Up Your Account") }}</h3>
            <p class="text-xs opacity-75 text-center max-w-sm -mt-2">
                {{ $t("panel.account-setup.please answer a few questions so that we can set up your account to fit you best") }}
            </p>
            <ul class="flex items-center gap-2">
                <li class="w-2.5 h-2.5 rounded-full bg-primary"></li>
                <li class="w-5 h-0.5 bg-zinc-500 opacity-50"></li>
                <li class="w-2.5 h-2.5 rounded-full bg-neutral-500"></li>
            </ul>
            <!-- <hr class="w-full border-0 h-0.5 gradient" /> -->
            <hr class="w-3/4 border-neutral-500 border-opacity-40" />
            <h4 class="text-lg">{{ $t("panel.account-setup.How are you planning to use Menuriom?") }}</h4>
            <ul class="flex flex-col gap-3 w-full">
                <div class="cursor-pointer rounded-2xl hover:bg-primary p-1 transition-all">
                    <li class="flex gap-3 w-full p-3 rounded-2xl bg-fgPrimary text-bgAccent" @click="selectOption('store-owner')">
                        <div class="flex items-center justify-center w-16 h-16 p-1 rounded-xl bg-neutral-100 flex-shrink-0">
                            <img class="w-6" src="~/assets/images/panel-icons/store-dark.png" alt="" />
                        </div>
                        <div class="flex flex-col gap-1 flex-grow">
                            <h4 class="font-bold whitespace-nowrap text-ellipsis">{{ $t("panel.account-setup.For my store or restaurant") }}</h4>
                            <p class="text-xs">
                                {{ $t("panel.account-setup.This is for users who want to create and manage their restaurant menus and orders") }}
                            </p>
                        </div>
                    </li>
                </div>
                <div class="cursor-pointer rounded-2xl hover:bg-primary p-1 transition-all">
                    <li class="flex gap-3 w-full p-3 rounded-2xl bg-fgPrimary text-bgAccent" @click="selectOption('staff-member')">
                        <div class="flex items-center justify-center w-16 h-16 p-1 rounded-xl bg-neutral-100 flex-shrink-0">
                            <img class="w-6" src="~/assets/images/panel-icons/user-group-dark.png" alt="" />
                        </div>
                        <div class="flex flex-col gap-1 flex-grow">
                            <h4 class="font-bold whitespace-nowrap text-ellipsis">{{ $t("panel.account-setup.Im part of a staff or team") }}</h4>
                            <p class="text-xs">
                                {{ $t("panel.account-setup.This is for users who are part of a restaurant and want to join as a staff member") }}
                            </p>
                        </div>
                    </li>
                </div>
            </ul>
            <hr class="w-3/4 border-neutral-500 border-opacity-40" />
            <button class="w-max text-xs text-secondary hover:underline" type="button" @click="panelStore.closePopUp()">{{ $t("Not Now") }}</button>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";

const panelStore = usePanelStore();

const selectOption = (type) => {
    switch (type) {
        case "store-owner":
            panelStore.openPopUp("create-new-brand");
            break;
        case "staff-member":
            panelStore.openPopUp("find-your-team");
            break;
    }
};
</script>
