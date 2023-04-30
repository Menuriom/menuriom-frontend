<style scoped></style>

<template>
    <div class="flex flex-col h-full">
        <NuxtPage />
        <!-- <NuxtPage key="brand" page-key="panel"></NuxtPage> -->
    </div>
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "panel", middleware: ["panel-gate"] });
</script>
