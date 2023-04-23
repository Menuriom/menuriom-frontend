<style scoped></style>

<template>
    <div>
        <NuxtPage key="brand" page-key="brand-panel" ></NuxtPage>
    </div>
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "brand-panel", middleware: ["brand-panel-gate"] });
</script>
