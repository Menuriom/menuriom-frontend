<style scoped></style>

<template>
    <div class="flex flex-col gap-4 w-full">
        <NuxtPage page-key="user" />
    </div>
</template>

<script setup>
useHead({ title: `Your Menuriom Panel` });
definePageMeta({ layout: "user", middleware: ["user-panel-gate"] });
</script>
