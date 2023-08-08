<template>
    <div
        class="absolute flex items-end justify-center p-2.5 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="flex flex-col items-center gap-4 w-full max-h-[40rem] shadow-nr35"
            :style="`margin-top: ${options.imageMargin / 4}rem; background-color: ${options.bgMainColor}; border-radius: ${options.cornerRadius}px;`"
        >
            <span class="w-4/12 h-1.5 mt-4 -mb-4 rounded-full bg-neutral-300 bg-opacity-75 mix-blend-difference" v-if="options.imageMargin == '0'"></span>
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    options: { type: Object },
    // baseColors: { type: Object },
});
</script>
