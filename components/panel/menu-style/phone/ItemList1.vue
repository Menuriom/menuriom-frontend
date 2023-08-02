<template>
    <ul class="flex flex-wrap gap-2">
        <li
            class="relative flex flex-col gap-3 w-[150px] p-3 rounded-lg border border-neutral-500 border-opacity-10 shadow-nr15"
            :class="[i == 2 ? 'opacity-70' : '']"
            :style="`margin-top: ${imageMargin / 4}rem; background-color: ${baseColors.bgMainColor};`"
            v-for="i in 8"
            :key="i"
        >
            <span
                class="relative w-full aspect-square rounded-lg"
                :style="`margin-top: -${imageMargin / 4}rem; background-color: ${baseColors.bgSecondaryColor};`"
            >
                <img class="w-full h-full opacity-10" :src="`/sample-foods/sample-food${(i % 5) + 1}.webp`" alt="" />
                <div class="absolute bottom-1.5 start-1 flex items-center gap-1 opacity-75">
                    <strong
                        class="p-1.5 rounded text-xs border border-neutral-500 border-opacity-20 shadow-nr10"
                        :style="`background-color: ${baseColors.accentColor};`"
                    >
                        <h6 class="w-4 h-1 rounded" :style="`background-color: ${baseColors.textColor};`"></h6>
                    </strong>
                    <strong
                        class="p-1.5 rounded text-xs border border-neutral-500 border-opacity-20 shadow-nr10"
                        :style="`background-color: ${baseColors.accentColor};`"
                    >
                        <h6 class="w-8 h-1 rounded" :style="`background-color: ${baseColors.textColor};`"></h6>
                    </strong>
                </div>
            </span>
            <span class="w-10/12 h-2 rounded-sm" :style="`background-color: ${baseColors.textColor};`"></span>
            <div class="flex flex-col gap-1.5">
                <span class="w-full h-0.5 opacity-75" :style="`background-color: ${baseColors.textColor};`"></span>
                <span class="w-8/12 h-0.5 opacity-75" :style="`background-color: ${baseColors.textColor};`"></span>
            </div>
            <hr class="w-full opacity-20" :style="`border-color: ${baseColors.textColor};`" />
            <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-1 text-base/none">
                    <b class="w-12 h-4 opacity-75 rounded" :style="`background-color: ${baseColors.textColor};`"></b>
                    <span class="w-2 h-4 rounded-sm" :style="`background-color: ${baseColors.primaryColor};`"></span>
                </div>
                <button
                    class="flex items-center justify-center w-7 h-7 p-1 rounded-full shadow-nr35 transition-all hover:scale-125 shrink-0"
                    :style="`background-color: ${baseColors.primaryColor};`"
                >
                    <Icon
                        class="w-5 h-5 shrink-0"
                        :style="`background-color: ${baseColors.bgMainColor};`"
                        name="plus.svg"
                        folder="icons/tabler"
                        size="18px"
                    />
                </button>
            </div>
            <div
                id="sold-out"
                class="absolute start-8 -rotate-45 p-2 px-4 rounded-md text-sm opacity-75"
                :style="`top: calc(2.75rem - ${imageMargin / 4}rem); background-color: ${baseColors.textColor}; color: ${baseColors.bgMainColor};`"
                v-if="i == 2"
            >
                Sold Out
            </div>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    baseColors: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
    imageMargin: { type: Number },
});
</script>
