<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <NuxtPage page-key="user" />
    </div>
</template>

<script setup>
useHead({ title: `Menuriom Admin Panel` });
definePageMeta({ layout: "admin", middleware: ["admin-panel-gate"] });
</script>
