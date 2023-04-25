<style scoped></style>

<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
import { usePanelStore } from "@/stores/panel";

const route = useRoute();
const panelStore = usePanelStore();
if (process.client) panelStore.setSelectedBrand(route.params.brandID);
</script>
