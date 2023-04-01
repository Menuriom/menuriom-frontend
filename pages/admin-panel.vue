<style scoped></style>

<template>
    <NuxtPage key="admin" page-key="admin-panel" />
</template>

<script setup>
useHead({ title: `Menuriom Admin Panel` });
definePageMeta({ layout: "admin", middleware: ["admin-panel-gate"] });
</script>
