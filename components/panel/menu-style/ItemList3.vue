<template>
    <ul class="flex flex-col items-center gap-2">
        <li
            class="relative flex items-center gap-3 w-full p-3 bg-pencil-tip rounded-lg shadow-nr35"
            :class="[zigzag && i % 2 == 0 ? 'flex-row-reverse' : 'flex-row']"
            :style="`margin-top: ${imageMargin / 8}rem`"
            v-for="i in 6"
            :key="i"
        >
            <span class="w-28 aspect-square rounded-lg bg-neutral-700 shrink-0" :style="`margin-top: -${imageMargin / 4}rem`">
                <img class="w-full h-full opacity-5" :src="`/sample-foods/sample-food${(i % 5) + 1}.webp`" alt="" />
            </span>
            <div class="flex flex-col gap-2 w-full h-full grow">
                <div class="flex items-center gap-1 opacity-50">
                    <strong class="p-1.5 rounded text-xs border border-stone-400 bg-pencil-tip bg-opacity-75 text-white">
                        <h6 class="w-4 h-1 bg-white rounded"></h6>
                    </strong>
                    <strong class="p-1.5 rounded text-xs border border-stone-400 bg-pencil-tip bg-opacity-75 text-white">
                        <h6 class="w-8 h-1 bg-white rounded"></h6>
                    </strong>
                </div>
                <span class="w-8/12 h-2.5 bg-stone-500 rounded-sm"></span>
                <div class="flex flex-col gap-1.5">
                    <span class="w-full h-0.5 bg-neutral-200 opacity-60"></span>
                    <span class="w-full h-0.5 bg-neutral-200 opacity-60"></span>
                    <span class="w-9/12 h-0.5 bg-neutral-200 opacity-60"></span>
                </div>
                <hr class="w-full opacity-10 mt-auto" />
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-1 text-base/none">
                        <b class="w-12 h-4 bg-white opacity-75 rounded"></b>
                        <span class="w-2 h-4 bg-stone-400 rounded-sm"></span>
                    </div>
                    <button class="flex items-center justify-center w-7 h-7 p-1 rounded-full bg-white text-pencil-tip shadow-nr35 shrink-0">
                        <Icon class="w-5 h-5 shrink-0 bg-pencil-tip" name="plus.svg" folder="icons/tabler" size="18px" />
                    </button>
                </div>
            </div>
            <div
                id="sold-out"
                class="absolute start-4 top-12 -rotate-45 p-2 px-4 rounded-md bg-pencil-tip bg-opacity-75 backdrop-blur-sm"
                v-if="i == 2"
            >
                Sold Out
            </div>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    zigzag: { type: Boolean },
    imageMargin: { type: Number },
});
</script>
