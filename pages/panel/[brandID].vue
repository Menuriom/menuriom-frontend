<style scoped></style>

<template>
    <div class="flex flex-col h-full">
        <NuxtPage />
    </div>
</template>

<script setup>
import { usePanelStore } from "@/stores/panel";

const route = useRoute();
const panelStore = usePanelStore();

if (process.client) {
    // TODO : check if user have access to the brandID if so then set the brand
    // add middleware to do the checking just like auth guards
    panelStore.setSelectedBrand(route.params.brandID);
}
</script>
