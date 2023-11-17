<style scoped></style>

<template>
    <Dialog name="billing-alert-dialog" boxClass="max-w-lg" :closeable="true">
        <div class="flex flex-col items-center justify-center gap-1" v-if="alertLevel == 'new-renewal-bill'">
            <LazyNuxtImg class="w-52 mb-6" src="/img/bill-alert2.png" width="208px" />
            <div class="flex items-center gap-4 w-full p-4 bg-primary bg-opacity-25 rounded-xl mb-2">
                <Icon class="w-7 h-7 bg-primary shrink-0" name="Info-circle.svg" folder="icons/basil" size="32px" />
                <div class="flex flex-col gap-1 grow">
                    <span class="text-xl text-primary font-bold">{{ $t("panel.billing.Your subscription plan is about to end") }}...</span>
                    <p class="text-sm text-fgPrimary opacity-80">{{ $t("panel.billing.Please renew your subscription by paying the renewal bill") }}</p>
                </div>
            </div>
            <div class="flex flex-col gap-1 w-full">
                <p class="opacity-75">{{ $t("panel.billing.If you dont renew your subscription, your account will be freeze") }}</p>
            </div>

            <nuxt-link
                class="btn flex items-center justify-center w-full mt-6 p-3 px-6 hover:px-8 rounded-xl bg-primary text-fgPrimary"
                :to="localePath(`/panel/${panelStore.selectedBrandId}/billing`)"
            >
                {{ $t("panel.billing.Head to billing page") }}
            </nuxt-link>
        </div>
        <div class="flex flex-col items-center justify-center gap-1 w-full" v-else-if="alertLevel == 'expire-bill'">
            <LazyNuxtImg class="w-52 mb-6" src="/img/bill-alert2.png" width="208px" />
            <div class="flex items-center gap-4 w-full p-4 bg-red-600 bg-opacity-10 rounded-xl mb-2">
                <Icon class="w-7 h-7 bg-rose-300 shrink-0" name="Info-circle.svg" folder="icons/basil" size="32px" />
                <div class="flex flex-col gap-1 grow">
                    <span class="text-xl text-rose-300 font-bold">{{ $t("panel.billing.Your subscription renewal bill is due") }}...</span>
                    <p class="text-sm text-rose-200 opacity-90">{{ $t("panel.billing.You cant create or edit your branch and menu items") }}</p>
                </div>
            </div>
            <p class="opacity-75">
                {{ $t("panel.billing.Please pay the renewal bill or downgrade your plan to a free tier to be able to manage your data again") }}
            </p>

            <nuxt-link
                class="btn flex items-center justify-center w-full mt-6 p-3 px-6 hover:px-8 rounded-xl bg-primary text-fgPrimary"
                :to="localePath(`/panel/${panelStore.selectedBrandId}/billing`)"
            >
                {{ $t("panel.billing.Head to billing page") }}
            </nuxt-link>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import { usePanelStore } from "@/stores/panel";

const props = defineProps({
    alertLevel: { type: String, default: "new-renewal-bill" }, // "new-renewal-bill" | "expire-bill"
});

const localePath = useLocalePath();
const panelStore = usePanelStore();
</script>
