<template>
    <div class="relative flex items-start justify-between gap-4 w-full px-2 pt-6 mb-2 isolate z-2 shrink-0">
        <div class="absolute start-0 top-0 w-full h-22 bg-dolphin isolate -z-10 overflow-hidden">
            <img class="absolute opacity-20" src="~/assets/images/pattern2.png" alt="" />
        </div>
        <div class="flex items-start gap-2 w-full">
            <img class="w-22 h-22 p-2 object-cover bg-pencil-tip rounded-lg shadow-nr25" :src="brand.logo" alt="" />
            <div class="flex flex-col items-start gap-2 w-full">
                <h2 class="w-20 h-3 mt-3 bg-white font-bold rounded"></h2>
                <small class="bg-white w-16 h-0.5 opacity-60 text-xxs rounded"></small>
                <div class="flex flex-wrap items-center justify-between gap-2 w-full">
                    <div class="flex items-center gap-1 p-2 mt-1 bg-pencil-tip shadow-nr15 border border-neutral-200 border-opacity-10 rounded-md">
                        <Icon class="w-4 h-4 shrink-0 bg-red-400" name="map-pin-filled.svg" folder="icons/tabler" size="16px" />
                        <span class="w-16 h-1 bg-white rounded"></span>
                    </div>
                    <div class="flex flex-col items-center gap-1 p-1 px-1.5 bg-pencil-tip shadow-nr15 border border-neutral-200 border-opacity-10 rounded-md">
                        <img class="w-4" src="/flags/en.png" alt="en" />
                        <span class="w-4 h-0.5 mb-1 bg-white"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: Object,
});
</script>
