<style scoped></style>

<template>
    <div class="flex flex-col h-full">
        <NuxtPage />
    </div>
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "panel", middleware: ["panel-gate"] });
</script>
