<template>
    <div
        class="absolute flex items-end justify-center p-2.5 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="flex flex-col items-center gap-4 w-full max-h-[40rem] rounded-xl shadow-nr35"
            :style="`margin-top: ${marginTop / 4}rem; background-color: ${baseColors.bgMainColor};`"
        >
            <span class="w-4/12 h-1.5 mt-4 -mb-4 rounded-full bg-neutral-300 bg-opacity-75 mix-blend-difference" v-if="!marginTop"></span>
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    marginTop: { type: Number },
    baseColors: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
});
</script>
