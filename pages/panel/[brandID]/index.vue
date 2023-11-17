<style scoped></style>

<template>
    <div>
        dashboard - {{ route.params.brandID }}

        <Teleport to="body">
            <BillAlertDialog :alertLevel="alertLevel" v-if="panelStore.popUpOpened === 'billing-alert-dialog'" />
        </Teleport>
    </div>
</template>

<script setup>
const BillAlertDialog = defineAsyncComponent(() => import("~/components/panel/dialogs/billing/BillAlertDialog.vue"));
import { usePanelStore } from "@/stores/panel";

const route = useRoute();
const panelStore = usePanelStore();

// getBills -------------------------------------------------
const alertLevel = ref("");
const checkBrandSubscription = await useFetch(`/api/v1/panel/billing/subscription-check`, { lazy: process.client, headers: { brand: route.params.brandID } });
if (checkBrandSubscription.error.value && process.server) console.error({ err: checkBrandSubscription.error.value });

if (checkBrandSubscription.data.value) alertLevel.value = checkBrandSubscription.data.value?.alert || "";
watch(checkBrandSubscription.data, (val) => (alertLevel.value = val.alert || ""));
// -------------------------------------------------

onMounted(() => {
    if (alertLevel.value) panelStore.openPopUp("billing-alert-dialog");
});
</script>
