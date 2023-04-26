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

if (process.client) {
    // TODO : check if user have access to the brandID if so then set the brand
    panelStore.setSelectedBrand(route.params.brandID);
}
</script>
