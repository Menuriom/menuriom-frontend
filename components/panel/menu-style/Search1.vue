<template>
    <div class="sticky top-7 flex items-center gap-2 w-full z-3 p-2" :style="`background-color: ${baseColorOptions.bgColor};`">
        <button class="flex items-center justify-center p-2 border border-neutral-200 border-opacity-20 rounded-lg shadow-nr35" title="Show All Categories">
            <Icon class="w-5 h-5 shrink-0" :style="`background-color: ${baseColorOptions.textColor};`" name="layout-2.svg" folder="icons/tabler" size="20px" />
        </button>
        <div
            class="flex items-center gap-2 w-full p-2 rounded-lg border border-neutral-500 border-opacity-20 shadow-nr10"
            :style="`background-color: ${baseColorOptions.bgColor};`"
        >
            <Icon class="w-5 h-5 shrink-0" :style="`background-color: ${baseColorOptions.textColor};`" name="search.svg" folder="icons/tabler" size="20px" />
            <input
                class="w-full text-sm outline-0"
                :style="`background-color: ${baseColorOptions.bgColor}; color: ${baseColorOptions.textColor};`"
                placeholder=". . . . ."
            />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    baseColorOptions: { type: Object },
    textColor: { type: String },
    bgColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
});
</script>
