<style scoped></style>

<template>
    <div class="flex flex-col w-full max-w-screen-xl mx-auto @container">
        <NuxtPage />
    </div>
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "panel", middleware: ["panel-gate"] });
</script>
