<template>
    <div class="sticky top-7 flex items-center justify-between gap-2 w-full mb-2 p-2 bg-dolphin shadow-nr15 isolate overflow-hidden z-2 shrink-0">
        <img class="absolute -z-10 opacity-20 rotate-45" src="~/assets/images/pattern2.png" alt="" />
        <div class="flex items-center gap-2">
            <img class="w-12 h-12 p-2 object-cover bg-pencil-tip rounded-lg" :src="brand.logo" alt="" />
            <div class="flex flex-col gap-2">
                <h2 class="w-20 h-3 bg-white font-bold rounded"></h2>
                <div class="flex flex-col gap-1">
                    <small class="bg-white opacity-50 w-14 h-0.5 rounded"></small>
                    <small class="bg-white opacity-50 w-10 h-0.5 rounded"></small>
                </div>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <div class="flex flex-col items-center gap-1 p-1 px-1.5 border border-neutral-200 border-opacity-10 bg-pencil-tip rounded-md">
                <img class="w-4" src="/flags/en.png" alt="en" />
                <span class="w-4 h-0.5 mb-1 bg-white"></span>
            </div>
            <div class="flex items-center gap-1 p-2 bg-pencil-tip border border-neutral-200 border-opacity-10 rounded-md">
                <Icon class="w-4 h-4 shrink-0 bg-red-400" name="map-pin-filled.svg" folder="icons/tabler" size="16px" />
                <span class="w-16 h-1 bg-white rounded"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: Object,
});
</script>
