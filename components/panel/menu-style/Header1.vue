<template>
    <div
        class="sticky top-7 flex items-center justify-between gap-2 w-full mb-2 p-2 shadow-nr15 isolate overflow-hidden z-2 shrink-0"
        :style="`background-color: ${baseColorOptions.primaryColor};`"
    >
        <img class="absolute -z-10" :style="`opacity: ${bgImageOpacity}%; rotate: ${bgImageRotation}deg;`" :src="bgImage" alt="" />
        <div class="flex items-center gap-1">
            <div
                class="flex items-center justify-center w-12 h-12 p-1.5 shadow-nr25 shrink-0 overflow-hidden"
                :style="`background-color: ${baseColorOptions.bgColor}; border-radius: ${logoRadius}px;`"
            >
                <img class="w-full h-full object-cover" :style="`border-radius: ${logoRadius - 6}px;`" :src="brand.logo" alt="" />
            </div>
            <div class="flex flex-col gap-0.5">
                <h2 class="font-bold text-base/none" :style="`color: ${baseColorOptions.textColor};`">{{ brand.name }}</h2>
                <small class="opacity-75 text-xxs" :style="`color: ${baseColorOptions.textColor};`">{{ brand.slogan }}</small>
            </div>
        </div>
        <div class="flex items-center gap-1">
            <div
                class="flex flex-col items-center gap-1 p-1 px-1.5 border border-neutral-200 border-opacity-10 rounded-md"
                :style="`background-color: ${baseColorOptions.bgColor};`"
            >
                <img class="w-4" src="/flags/en.png" alt="en" />
                <span class="w-4 h-0.5 mb-1 rounded" :style="`background-color: ${baseColorOptions.textColor};`"></span>
            </div>
            <div
                class="flex items-center gap-1 p-2 border border-neutral-200 border-opacity-10 rounded-md"
                :style="`background-color: ${baseColorOptions.bgColor};`"
            >
                <Icon class="w-4 h-4 shrink-0 bg-red-400" name="map-pin-filled.svg" folder="icons/tabler" size="16px" />
                <span class="w-16 h-1 rounded" :style="`background-color: ${baseColorOptions.textColor};`"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
    baseColorOptions: { type: Object },
    textColor: { type: String },
    bgColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
    bgImage: { type: String },
    bgImageOpacity: { type: Number }, // 10 - 100 : 10
    bgImageRotation: { type: Number }, // 0 - 90 : 10
    logoRadius: { type: String }, // 0 - 50 : 5
});
</script>
