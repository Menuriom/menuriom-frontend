<template>
    <div class="relative flex items-start justify-between gap-4 w-full px-2 pt-4 mb-2 isolate shrink-0">
        <div class="absolute start-0 top-0 w-full h-20 isolate -z-10 overflow-hidden" :style="`background-color: ${baseColorOptions.bgSecondaryColor};`">
            <img class="absolute" :style="`opacity: ${bgImageOpacity}%; rotate: ${bgImageRotation}deg;`" :src="bgImage" alt="" />
        </div>
        <div class="flex items-start gap-2 w-full">
            <div
                class="flex items-center justify-center w-22 h-22 p-2 shadow-nr25 shrink-0"
                :style="`background-color: ${baseColorOptions.bgMainColor};  border-radius: ${logoRadius}px;`"
            >
                <img class="w-full h-full object-cover" :style="`border-radius: ${logoRadius - 6}px;`" :src="brand.logo" alt="" />
            </div>
            <div class="flex flex-col items-start gap-1.5 w-full">
                <div class="flex flex-col gap-0.5">
                    <h2 class="font-bold text-lg/none" :style="`color: ${baseColorOptions.textColor};`">{{ brand.name }}</h2>
                    <small class="opacity-75 text-xxs" :style="`color: ${baseColorOptions.textColor};`">{{ brand.slogan }}</small>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-2 w-full">
                    <div
                        class="flex items-center gap-1 p-2 mt-1 shadow-nr10 border border-neutral-200 border-opacity-10 rounded-md"
                        :style="`background-color: ${baseColorOptions.bgMainColor};`"
                    >
                        <Icon class="w-4 h-4 shrink-0 bg-red-400" name="map-pin-filled.svg" folder="icons/tabler" size="16px" />
                        <span class="w-16 h-1 rounded" :style="`background-color: ${baseColorOptions.textColor};`"></span>
                    </div>
                    <div
                        class="flex flex-col items-center gap-1 p-1 px-1.5 shadow-nr10 border border-neutral-200 border-opacity-10 rounded-md"
                        :style="`background-color: ${baseColorOptions.bgMainColor};`"
                    >
                        <img class="w-4" src="/flags/en.png" alt="en" />
                        <span class="w-4 h-0.5 mb-1 rounded" :style="`background-color: ${baseColorOptions.textColor};`"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
    baseColorOptions: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
    bgImage: { type: String },
    bgImageOpacity: { type: String }, // 10 - 100 : 10
    bgImageRotation: { type: String }, // 0 - 90 : 10
    logoRadius: { type: String }, // 0 - 50 : 5
});
</script>
