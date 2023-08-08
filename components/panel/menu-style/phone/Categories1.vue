<style scoped>
*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
* {
    scrollbar-width: none;
}
</style>

<template>
    <div class="sticky flex self-start p-2 pb-0 w-full bg-opacity-75 backdrop-blur-sm" :style="`background-color: ${baseColors.bgMainColor};`">
        <ul class="flex items-start gap-4 w-full pb-3 overflow-auto">
            <li
                class="flex items-center justify-center gap-3 border border-neutral-500 border-opacity-25 cursor-pointer shadow-nr10"
                :class="[options.orientation === 'col' ? 'flex-col p-3' : 'flex-row p-2']"
                :style="`background-color: ${selectedCategory == i ? options.primaryColor : options.bgMainColor}; border-radius: ${options.cornerRadius}px;`"
                v-for="i in 5"
                :key="i"
                @click="selectedCategory = i"
            >
                <span
                    class="flex items-center justify-center w-11 h-11 p-1 rounded-full"
                    :style="`background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
                    v-if="options.withIcon"
                >
                    <img class="w-full aspect-square object-contain opacity-20" :src="`/sample-categories/${i}.png`" />
                </span>
                <h3
                    class="w-10 h-1.5 rounded-full opacity-80"
                    :style="`background-color: ${selectedCategory == i ? options.bgMainColor : options.textColor};`"
                ></h3>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    baseColors: { type: Object },
    options: { type: Object },
});

const selectedCategory = ref(1);
</script>
