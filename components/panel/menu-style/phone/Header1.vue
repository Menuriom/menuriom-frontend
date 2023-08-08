<style scoped>
.pattern-bg {
    background-repeat: repeat;
    background-size: 80px;
}
</style>

<template>
    <div
        class="sticky top-7 flex items-center justify-between gap-2 w-full mb-2 p-2 shadow-nr15 isolate overflow-hidden shrink-0"
        :style="`background-color: ${options.bgSecondaryColor};`"
    >
        <div
            class="pattern-bg absolute -top-1/2 w-96 aspect-square -z-10"
            :style="`background-image: url('${options.bgImage}'); background-size: ${options.bgImageSize}%; background-color: ${options.bgSecondaryColor}; opacity: ${options.bgImageOpacity}%; rotate: ${options.bgImageRotation}deg;`"
            v-if="options.withPattern"
        ></div>
        <div class="flex items-center gap-1">
            <div
                class="flex items-center justify-center w-12 h-12 p-1.5 shadow-nr25 shrink-0 overflow-hidden"
                :style="`background-color: ${options.bgMainColor}; border-radius: ${options.logoRadius}px;`"
            >
                <img class="w-full h-full object-cover" :style="`border-radius: ${options.logoRadius - 6}px;`" :src="brand.logo" alt="" />
            </div>
            <div class="flex flex-col gap-0.5">
                <h2 class="font-bold text-base/none" :style="`color: ${options.textColor};`">{{ brand.name }}</h2>
                <small class="opacity-75 text-xxs" :style="`color: ${options.textColor};`">{{ brand.slogan }}</small>
            </div>
        </div>
        <div class="flex items-center gap-1">
            <div
                class="flex flex-col items-center gap-1 p-1 px-1.5 border border-neutral-200 border-opacity-10 rounded-md"
                :style="`background-color: ${options.bgMainColor};`"
            >
                <img class="w-4" src="/flags/en.png" alt="en" />
                <span class="w-4 h-0.5 mb-1 rounded" :style="`background-color: ${options.textColor};`"></span>
            </div>
            <div
                class="flex items-center gap-1 p-2 border border-neutral-200 border-opacity-10 rounded-md"
                :style="`background-color: ${options.bgMainColor};`"
            >
                <Icon class="w-4 h-4 shrink-0 bg-red-400" name="map-pin-filled.svg" folder="icons/tabler" size="16px" />
                <span class="w-16 h-1 rounded" :style="`background-color: ${options.textColor};`"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
    options: { type: Object },
    
    // baseColors: { type: Object },
    // bgImage: { type: String },
    // bgImageOpacity: { type: String }, // 10 - 100 : 10
    // bgImageRotation: { type: String }, // 0 - 90 : 10
    // logoRadius: { type: String }, // 0 - 50 : 5
});
</script>
