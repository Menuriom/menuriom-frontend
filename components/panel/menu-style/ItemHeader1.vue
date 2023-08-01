<template>
    <header class="flex items-center gap-2 w-full -mb-2">
        <span
            class="flex items-center justify-center w-6 h-6 rounded-full shadow-nr35 shrink-0"
            :style="`background-color: ${baseColors.bgSecondaryColor};`"
        >
            <img class="w-10 h-10 object-contain opacity-25" :src="`/sample-categories/3.png`" />
        </span>
        <h3 class="w-14 h-1.5 rounded-full opacity-75 shrink-0" :style="`background-color: ${baseColors.textColor};`"></h3>
        <hr class="opacity-20 w-1 grow" :style="`border-color: ${baseColors.textColor};`" />
    </header>
</template>

<script setup>
const props = defineProps({
    baseColors: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
});
</script>
