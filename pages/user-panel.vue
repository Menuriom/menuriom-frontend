<style scoped></style>

<template>
    <NuxtPage key="user" page-key="user-panel" />
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "user", middleware: ["user-panel-gate"] });
</script>
