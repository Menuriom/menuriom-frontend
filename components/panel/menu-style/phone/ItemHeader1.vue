<style scoped></style>

<template>
    <div class="flex flex-col gap-2 w-full px-2">
        <header class="flex items-center gap-2 w-full">
            <span
                class="flex items-center justify-center w-8 h-8 p-1 rounded-full shadow-nr35 shrink-0"
                :style="`background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
                v-if="options.withIcon"
            >
                <img class="w-10 h-10 object-contain opacity-25" :src="`/sample-categories/1.png`" />
            </span>
            <h3 class="w-14 h-1.5 rounded-full opacity-75 shrink-0" :style="`background-color: ${options.textColor};`"></h3>
            <hr class="opacity-20 w-1 grow" :style="`border-color: ${options.textColor};`" />
        </header>
        <h4
            class="flex flex-col gap-1 w-full p-2 rounded-md border border-neutral-500 border-opacity-20 text-xs shadow-nr15"
            :style="`background-color: ${options.bgMainColor}; border-radius: ${options.cornerRadius}px;`"
        >
            <span class="w-10/12 h-1 rounded" :style="`background-color: ${options.accentColor};`"></span>
            <span class="w-4/12 h-1 rounded" :style="`background-color: ${options.accentColor};`"></span>
        </h4>
    </div>
</template>

<script setup>
const props = defineProps({
    options: { type: Object },
});
</script>
