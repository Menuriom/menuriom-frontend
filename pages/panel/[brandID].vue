<style scoped></style>

<template>
    <div class="flex flex-col h-full">
        <NuxtPage />
    </div>
</template>

<script setup>
definePageMeta({ middleware: ["permission-gate"] });
</script>
