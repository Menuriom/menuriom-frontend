<template>
    <div
        class="absolute flex items-end justify-center p-2.5 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="relative flex flex-col items-center p-4 py-6 w-full max-h-[40rem] shadow-nr35 isolate"
            :style="`margin-top: ${options.marginTop / 4}rem; background-color: ${options.bgMainColor}; border-radius: ${
                options.cornerRadius > 24 ? 24 : options.cornerRadius
            }px;`"
        >
            <div
                class="pattern-bg absolute bottom-0 -z-10 w-[30rem] max-w-none aspect-square pointer-events-none"
                :style="`background-image: url('${options.bgImage}'); background-size: ${options.bgImageSize}%; background-color: ${options.bgMainColor}; opacity: ${options.bgImageOpacity}%; rotate: ${options.bgImageRotation}deg;`"
                v-if="options.withPattern"
            ></div>
            <span class="w-4/12 h-1.5 rounded-full bg-neutral-300 bg-opacity-75 mix-blend-difference" v-if="!options.marginTop"></span>
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    baseColors: { type: Object },
    options: { type: Object },
});
</script>
