<template>
    <ul class="flex flex-col items-center gap-4">
        <li
            class="relative flex items-center gap-3 w-full p-3 rounded-lg border border-neutral-500 border-opacity-10 shadow-nr15"
            :class="[options.zigzag && i % 2 == 0 ? 'flex-row-reverse' : 'flex-row', i == 2 ? 'opacity-70' : '']"
            :style="`margin-top: ${options.imageMargin / 8}rem; background-color: ${options.bgMainColor}; border-radius: ${options.cornerRadius}px;`"
            v-for="i in 6"
            :key="i"
        >
            <span
                class="relative w-28 aspect-square rounded-lg shrink-0"
                :style="`margin-top: -${options.imageMargin / 4}rem; background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
            >
                <img
                    class="w-full h-full opacity-10"
                    :style="`border-radius: ${options.cornerRadius}px;`"
                    :src="`/sample-foods/sample-food${(i % 5) + 1}.webp`"
                    alt=""
                />
                <div
                    id="sold-out"
                    class="absolute start-3 top-9 -rotate-45 p-2 px-3 rounded-md opacity-75"
                    :style="`background-color: ${options.textColor}; color: ${options.bgMainColor};`"
                    v-if="i == 2"
                >
                    Sold Out
                </div>
            </span>
            <div class="flex flex-col gap-2 w-full h-full grow">
                <div class="flex items-center gap-1 opacity-75">
                    <strong class="p-1.5 rounded text-xs border border-neutral-500 border-opacity-20" :style="`background-color: ${options.accentColor};`">
                        <h6 class="w-4 h-1 rounded" :style="`background-color: ${options.textColor};`"></h6>
                    </strong>
                    <strong class="p-1.5 rounded text-xs border border-neutral-500 border-opacity-20" :style="`background-color: ${options.accentColor};`">
                        <h6 class="w-8 h-1 rounded" :style="`background-color: ${options.textColor};`"></h6>
                    </strong>
                </div>
                <span class="w-8/12 h-2.5 rounded-sm" :style="`background-color: ${options.textColor};`"></span>
                <div class="flex flex-col gap-1.5">
                    <span class="w-full h-0.5 opacity-60 rounded" :style="`background-color: ${options.textColor};`"></span>
                    <span class="w-full h-0.5 opacity-60 rounded" :style="`background-color: ${options.textColor};`"></span>
                    <span class="w-9/12 h-0.5 opacity-60 rounded" :style="`background-color: ${options.textColor};`"></span>
                </div>
                <hr class="w-full opacity-20 mt-auto" :style="`border-color: ${options.textColor};`" />
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-1 text-base/none">
                        <b class="w-12 h-4 opacity-75 rounded" :style="`background-color: ${options.accentColor};`"></b>
                        <span class="w-2 h-4 rounded-sm" :style="`background-color: ${options.textColor};`"></span>
                    </div>
                    <button
                        class="flex items-center justify-center w-7 h-7 p-1 rounded-full shadow-nr15 transition-all hover:scale-125 shrink-0"
                        :style="`background-color: ${options.primaryColor};`"
                    >
                        <Icon class="w-5 h-5 shrink-0" :style="`background-color: ${options.textColor};`" name="plus.svg" folder="icons/tabler" size="18px" />
                    </button>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    // baseColors: { type: Object },
    options: { type: Object },
});
</script>
