<style scoped>
.scroll-text {
    animation: scroll-text 2s infinite linear alternate;
}
.scroll-text-re {
    animation: scroll-text 2s infinite linear alternate-reverse;
}
@keyframes scroll-text {
    0% {
        transform: translate(0);
    }
    100% {
        transform: translate(-10%);
    }
}
</style>

<template>
    <div class="flex flex-col items-center justify-center gap-4 w-full p-2 mt-5">
        <div
            class="relative flex items-center justify-between gap-4 w-full p-4 rounded-xl isolate shadow-nr15"
            :style="`background-color: ${baseColors.accentColor}; border-radius: ${options.cornerRadius}px;`"
        >
            <!-- <div
                class="absolute start-0 top-0 w-full h-full rounded-xl isolate -z-10 overflow-hidden"
                :style="`background-color: ${baseColors.accentColor};`"
                v-if="options.withPattern"
            >
                <img class="absolute opacity-20" :src="options.bgImage" alt="" />
            </div> -->
            <div class="absolute start-0 top-0 w-full h-full -z-10 overflow-hidden" :style="`background-color: ${options.primaryColor};`">
                <div
                    class="pattern-bg absolute -top-1/2 w-96 aspect-square"
                    :style="`background-image: url('${options.bgImage}'); background-size: ${options.bgImageSize}%; background-color: ${options.bgSecondaryColor}; opacity: ${options.bgImageOpacity}%; rotate: ${options.bgImageRotation}deg;`"
                    v-if="options.withPattern"
                ></div>
            </div>
            <div
                class="w-32 h-24 -mt-6 -mb-2 -rotate-[25deg] shadow-nr15 rounded-xl overflow-hidden"
                :style="`background-color: ${baseColors.bgMainColor}; border-radius: ${options.cornerRadius}px;`"
            >
                <img class="w-full h-full rounded-xl object-cover opacity-10 shadow-nr15" src="/sample-foods/sample-food2.webp" />
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="relative flex items-end gap-2 mb-1">
                    <span class="absolute -start-1 w-20 h-7 -mb-1 opacity-75" :style="`background-color: ${baseColors.bgMainColor};`"></span>
                    <span class="w-28 h-4 rounded z-2" :style="`background-color: ${baseColors.textColor};`"></span>
                </h2>
                <div class="flex flex-col gap-1.5">
                    <span class="w-32 h-1 opacity-75" :style="`background-color: ${baseColors.bgMainColor};`"></span>
                    <span class="w-32 h-1 opacity-75" :style="`background-color: ${baseColors.bgMainColor};`"></span>
                    <span class="w-20 h-1 opacity-75" :style="`background-color: ${baseColors.bgMainColor};`"></span>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-4 h-2 rounded-full" :style="`background-color: ${baseColors.accentColor};`"></span>
            <span class="w-2 h-2 opacity-20 rounded-full" :style="`background-color: ${baseColors.textColor};`"></span>
            <span class="w-2 h-2 opacity-20 rounded-full" :style="`background-color: ${baseColors.textColor};`"></span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    baseColors: { type: Object },
    options: { type: Object },
});
</script>
