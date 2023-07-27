<template>
    <header class="flex items-center gap-2 w-full -mb-2">
        <span class="w-6 h-6 rounded-full shadow-nr35 shrink-0" :style="`background-color: ${baseColorOptions.primaryColor};`"></span>
        <h3 class="w-14 h-1.5 rounded-full opacity-75 shrink-0" :style="`background-color: ${baseColorOptions.textColor};`"></h3>
        <hr class="opacity-20 w-1 grow" :style="`border-color: ${baseColorOptions.textColor};`" />
    </header>
</template>

<script setup>
const props = defineProps({
    baseColorOptions: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
});
</script>
