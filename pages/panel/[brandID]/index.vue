<style scoped></style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <header class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <Icon class="w-9 h-9 gradient" name="rectangles-mixed.svg" folder="icons/duo" size="36px" />
                <h1 class="text-2xl md:text-4xl/tight font-bold">{{ $t("panel.side-menu.Dashboard") }}</h1>
            </div>
        </header>
        <hr class="w-full border-bgSecondary" />
        <div class="flex flex-col gap-4 w-full">
            <div class="flex flex-wrap @5xl:flex-nowrap justify-center gap-4 w-full">
                <OrdersModule class="grow" />
                <QrScansModule />
            </div>
            <div class="flex flex-wrap @6xl:flex-nowrap justify-center gap-4 w-full">
                <div class="flex flex-col items-center justify-center gap-4 w-full">
                    <CounterModule class="" />
                    <BestItemsModule class="" />
                </div>
                <FeedbacksModule class="grow" />
                <BillingModule />
            </div>
        </div>

        <Teleport to="body">
            <BillAlertDialog :alertLevel="alertLevel" v-if="panelStore.popUpOpened === 'billing-alert-dialog'" />
        </Teleport>
    </div>
</template>

<script setup>
const BillAlertDialog = defineAsyncComponent(() => import("~/components/panel/dialogs/billing/BillAlertDialog.vue"));
import OrdersModule from "~/components/panel/dashboard/OrdersModule.vue";
import FeedbacksModule from "~/components/panel/dashboard/FeedbacksModule.vue";
import BillingModule from "~/components/panel/dashboard/BillingModule.vue";
import CounterModule from "~/components/panel/dashboard/CounterModule.vue";
import BestItemsModule from "~/components/panel/dashboard/BestItemsModule.vue";
import QrScansModule from "~/components/panel/dashboard/QrScansModule.vue";
import { usePanelStore } from "@/stores/panel";

const route = useRoute();
const panelStore = usePanelStore();

// getBills -------------------------------------------------
const alertLevel = ref("");
const checkBrandSubscription = await useFetch(`/api/v1/panel/billing/subscription-check`, { lazy: process.client, headers: { brand: route.params.brandID } });
if (checkBrandSubscription.error.value && checkBrandSubscription.error.value.statusCode >= 500 && process.server) {
    console.error({ err: checkBrandSubscription.error.value });
}

if (checkBrandSubscription.data.value) alertLevel.value = checkBrandSubscription.data.value?.alert || "";
watch(checkBrandSubscription.data, (val) => (alertLevel.value = val.alert || ""));
// -------------------------------------------------

onMounted(() => {
    if (alertLevel.value) {
        panelStore.openPopUp("billing-alert-dialog");
        panelStore.newRenewalBill = true;
    }
});
</script>
