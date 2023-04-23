<style scoped></style>

<template>
    <NuxtPage key="user" page-key="brand-panel" />
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "brand-panel", middleware: ["brand-panel-gate"] });
</script>
