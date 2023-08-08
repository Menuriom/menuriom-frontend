<template>
    <ul class="flex flex-wrap gap-4">
        <li
            class="relative flex flex-col gap-3 w-[145px] p-2 border border-neutral-500 border-opacity-10 shadow-nr15"
            :class="[i == 2 ? 'opacity-70' : '']"
            :style="`margin-top: ${options.imageMargin / 4}rem; background-color: ${options.bgMainColor}; border-radius: ${options.cornerRadius}px;`"
            v-for="i in 8"
            :key="i"
        >
            <span
                class="relative w-full aspect-square"
                :style="`margin-top: -${options.imageMargin / 4}rem; background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
            >
                <img
                    class="w-full h-full opacity-10"
                    :style="`border-radius: ${options.cornerRadius}px;`"
                    :src="`/sample-foods/sample-food${(i % 5) + 1}.webp`"
                    alt=""
                />
                <div class="absolute bottom-2 start-2 flex items-center gap-1 opacity-75">
                    <strong
                        class="p-1.5 rounded text-xs border border-neutral-500 border-opacity-20 shadow-nr10"
                        :style="`background-color: ${options.accentColor};`"
                    >
                        <h6 class="w-4 h-1 rounded" :style="`background-color: ${options.textColor};`"></h6>
                    </strong>
                    <strong
                        class="p-1.5 rounded text-xs border border-neutral-500 border-opacity-20 shadow-nr10"
                        :style="`background-color: ${options.accentColor};`"
                    >
                        <h6 class="w-8 h-1 rounded" :style="`background-color: ${options.textColor};`"></h6>
                    </strong>
                </div>
            </span>
            <span class="w-10/12 h-2 rounded-sm" :style="`background-color: ${options.textColor};`"></span>
            <div class="flex flex-col gap-1.5">
                <span class="w-full h-0.5 opacity-75" :style="`background-color: ${options.textColor};`"></span>
                <span class="w-8/12 h-0.5 opacity-75" :style="`background-color: ${options.textColor};`"></span>
            </div>
            <hr class="w-full opacity-20" :style="`border-color: ${options.textColor};`" />
            <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-1 text-base/none">
                    <b class="w-12 h-4 opacity-75 rounded" :style="`background-color: ${options.textColor};`"></b>
                    <span class="w-2 h-4 rounded-sm" :style="`background-color: ${options.primaryColor};`"></span>
                </div>
                <button
                    class="flex items-center justify-center w-7 h-7 p-1 rounded-full shadow-nr35 transition-all hover:scale-125 shrink-0"
                    :style="`background-color: ${options.primaryColor};`"
                >
                    <Icon class="w-5 h-5 shrink-0" :style="`background-color: ${options.bgMainColor};`" name="plus.svg" folder="icons/tabler" size="18px" />
                </button>
            </div>
            <div
                id="sold-out"
                class="absolute start-7 -top-1 -rotate-45 p-2 px-4 rounded-md text-sm opacity-75"
                :style="`top: calc(2.75rem - ${options.imageMargin / 4}rem); background-color: ${options.textColor}; color: ${options.bgMainColor};`"
                v-if="i == 2"
            >
                Sold Out
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
