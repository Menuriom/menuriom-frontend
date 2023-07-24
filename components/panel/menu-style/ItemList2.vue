<template>
    <ul class="flex flex-col items-center gap-2">
        <li
            class="relative flex flex-col gap-3 w-full p-4 bg-pencil-tip rounded-lg shadow-nr35"
            :style="`margin-top: ${imageMargin / 4}rem`"
            v-for="i in 6"
            :key="i"
        >
            <span class="relative w-full aspect-square rounded-lg bg-neutral-700" :style="`margin-top: -${imageMargin / 4}rem`">
                <img class="w-full h-full opacity-5" :src="`/sample-foods/sample-food${(i % 5) + 1}.webp`" alt="" />
                <div class="absolute bottom-2.5 start-2 flex items-center gap-2 opacity-50">
                    <strong class="p-2 rounded-md text-xs border-2 border-stone-400 bg-pencil-tip bg-opacity-75 text-white">
                        <h6 class="w-4 h-1.5 bg-white rounded"></h6>
                    </strong>
                    <strong class="p-2 rounded-md text-xs border-2 border-stone-400 bg-pencil-tip bg-opacity-75 text-white">
                        <h6 class="w-8 h-1.5 bg-white rounded"></h6>
                    </strong>
                </div>
            </span>
            <span class="w-8/12 h-2.5 bg-stone-500 rounded-sm"></span>
            <div class="flex flex-col gap-1.5">
                <span class="w-full h-0.5 bg-neutral-200 opacity-60"></span>
                <span class="w-9/12 h-0.5 bg-neutral-200 opacity-60"></span>
            </div>
            <hr class="w-full opacity-10" />
            <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-1 text-base/none">
                    <b class="w-12 h-4 bg-white opacity-75 rounded"></b>
                    <span class="w-2 h-4 bg-stone-400 rounded-sm"></span>
                </div>
                <button class="flex items-center justify-center w-7 h-7 p-1 rounded-full bg-white text-pencil-tip shadow-nr35 shrink-0">
                    <Icon class="w-5 h-5 shrink-0 bg-pencil-tip" name="plus.svg" folder="icons/tabler" size="18px" />
                </button>
            </div>
            <div
                id="sold-out"
                class="absolute start-14 -rotate-45 p-4 px-6 rounded-xl bg-pencil-tip bg-opacity-75 text-4xl backdrop-blur-sm"
                :style="`top: calc(6rem - ${imageMargin / 4}rem)`"
                v-if="i == 2"
            >
                Sold Out
            </div>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    imageMargin: { type: Number },
});
</script>
