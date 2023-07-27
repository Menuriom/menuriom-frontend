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
    <div class="sticky top-20 flex self-start p-2 pb-0 w-full bg-opacity-75 backdrop-blur-sm" :style="`background-color: ${baseColorOptions.bgMainColor};`">
        <ul class="flex items-start gap-4 w-full pb-3 overflow-auto">
            <li
                class="flex items-center justify-center gap-3 border border-neutral-500 border-opacity-25 cursor-pointer shadow-nr10"
                :class="[flow === 'col' ? 'flex-col p-3' : 'flex-row p-2']"
                :style="`background-color: ${selectedCategory == i ? baseColorOptions.primaryColor : baseColorOptions.bgMainColor}; border-radius: ${radius}px;`"
                v-for="i in 5"
                :key="i"
                @click="selectedCategory = i"
            >
                <span class="flex items-center justify-center w-9 h-9 rounded-full" :style="`background-color: ${baseColorOptions.bgSecondaryColor};`" v-if="icon">
                    <img class="w-10 h-10 object-contain opacity-20" :src="`/sample-categories/${i}.png`" />
                </span>
                <h3
                    class="w-10 h-1.5 rounded-full opacity-80"
                    :style="`background-color: ${selectedCategory == i ? baseColorOptions.bgMainColor : baseColorOptions.textColor};`"
                ></h3>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    baseColorOptions: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
    icon: { type: Boolean },
    flow: { type: String },
    radius: { type: String },
});

const selectedCategory = ref(1);
</script>
