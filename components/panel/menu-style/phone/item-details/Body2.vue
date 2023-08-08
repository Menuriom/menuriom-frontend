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
    <div class="flex flex-col items-center gap-4 w-full mt-4 p-4">
        <div id="details" class="flex flex-col items-start gap-4 w-full">
            <div class="flex flex-col items-start gap-3 w-full">
                <h2 class="w-9/12 h-3 rounded" :style="`background-color: ${options.textColor};`"></h2>
                <div class="flex flex-col gap-2 w-full">
                    <span class="w-full h-1 opacity-60 rounded" :style="`background-color: ${options.textColor};`"></span>
                    <span class="w-full h-1 opacity-60 rounded" :style="`background-color: ${options.textColor};`"></span>
                    <span class="w-8/12 h-1 opacity-60 rounded" :style="`background-color: ${options.textColor};`"></span>
                </div>
            </div>
            <div class="flex items-center justify-between gap-4 w-full">
                <div class="flex items-center gap-2 opacity-90">
                    <strong class="p-2 rounded-md text-xs border border-neutral-500 border-opacity-20" :style="`background-color: ${options.accentColor};`">
                        <h6 class="w-4 h-1 rounded" :style="`background-color: ${options.textColor};`"></h6>
                    </strong>
                    <strong class="p-2 rounded-md text-xs border border-neutral-500 border-opacity-20" :style="`background-color: ${options.accentColor};`">
                        <h6 class="w-8 h-1 rounded" :style="`background-color: ${options.textColor};`"></h6>
                    </strong>
                </div>
                <div class="flex items-start gap-2">
                    <div
                        class="flex items-center gap-1 p-2 py-1 shadow-nr15"
                        :style="`background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
                    >
                        <Icon class="w-5 h-5 bg-rose-400" name="heart.svg" folder="icons/tabler" size="20px" />
                        <small class="text-xs" :style="`color: ${options.textColor};`">34</small>
                    </div>
                    <div
                        class="flex items-center gap-1 px-2 py-1 shadow-nr15"
                        :style="`background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
                    >
                        <Icon class="w-5 h-5" :style="`background-color: ${options.textColor};`" name="message.svg" folder="icons/tabler" size="20px" />
                    </div>
                </div>
            </div>
        </div>

        <div id="images" class="flex items-center gap-4 w-max">
            <div
                class="w-52 aspect-square rounded-xl shadow-nr15 overflow-hidden"
                :style="`background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
            >
                <img
                    class="w-full h-full object-contain opacity-20"
                    :style="`border-radius: ${options.cornerRadius}px;`"
                    src="/sample-foods/sample-food1.webp"
                    alt=""
                />
            </div>
            <div
                class="w-52 aspect-square rounded-xl shadow-nr15 overflow-hidden"
                :style="`background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
            >
                <img
                    class="w-full h-full object-contain opacity-20"
                    :style="`border-radius: ${options.cornerRadius}px;`"
                    src="/sample-foods/sample-food2.webp"
                    alt=""
                />
            </div>
            <div
                class="w-52 aspect-square rounded-xl shadow-nr15 overflow-hidden"
                :style="`background-color: ${options.bgSecondaryColor}; border-radius: ${options.cornerRadius}px;`"
            >
                <img
                    class="w-full h-full object-contain opacity-20"
                    :style="`border-radius: ${options.cornerRadius}px;`"
                    src="/sample-foods/sample-food3.webp"
                    alt=""
                />
            </div>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-4 h-2 rounded-full" :style="`background-color: ${options.primaryColor};`"></span>
            <span class="w-2 h-2 opacity-20 rounded-full" :style="`background-color: ${options.textColor};`"></span>
            <span class="w-2 h-2 opacity-20 rounded-full" :style="`background-color: ${options.textColor};`"></span>
        </div>

        <ul id="types" class="flex items-start gap-4 w-full pb-4 -mb-4 overflow-auto">
            <li
                class="flex flex-col gap-4 p-3 border border-neutral-500 border-opacity-20 cursor-pointer shadow-nr15"
                :style="`background-color: ${selectedType == i ? options.primaryColor : options.bgMainColor}; border-radius: ${options.cornerRadius}px;`"
                v-for="i in 4"
                :key="i"
                @click="selectedType = i"
            >
                <h3 class="w-8 h-1 rounded-full opacity-75" :style="`background-color: ${selectedType == i ? options.bgMainColor : options.textColor};`"></h3>
            </li>
        </ul>
        <ul id="toppings" class="flex flex-col items-start gap-4 w-full">
            <li
                class="flex items-center gap-2 w-full cursor-pointer"
                v-for="i in 3"
                :key="i"
                @click="selectedTopings.has(i) ? selectedTopings.delete(i) : selectedTopings.add(i)"
            >
                <span
                    class="rounded opacity-80 border-2"
                    :style="`
                        background-color: ${selectedTopings.has(i) ? options.bgMainColor : options.primaryColor};
                        border-color: ${options.primaryColor};
                        `"
                >
                    <Icon class="w-3 h-3" :style="`background-color: ${options.bgMainColor};`" name="Check.svg" folder="icons/basil" size="16px" />
                </span>
                <h3 class="w-20 h-2 rounded-full opacity-75" :style="`background-color: ${options.textColor};`"></h3>
                <span class="w-8 h-2 ms-auto rounded-full opacity-75" :style="`background-color: ${options.textColor};`"></span>
            </li>
        </ul>
        <hr class="w-full border-neutral-500 opacity-25 mt-auto" />
        <div id="price" class="flex flex-wrap items-center justify-between gap-4 w-full">
            <div class="flex items-center gap-2">
                <span class="w-16 h-5 opacity-75 rounded" :style="`background-color: ${options.textColor};`"></span>
                <span class="w-3 h-5 rounded" :style="`background-color: ${options.accentColor};`"></span>
            </div>
            <button
                class="flex items-center justify-center gap-2 px-4 py-2 rounded-full shadow-nr35 shrink-0"
                :style="`background-color: ${options.primaryColor};`"
            >
                <span class="w-16 h-1.5 opacity-75 rounded" :style="`background-color: ${options.bgMainColor};`"></span>
                <Icon class="w-5 h-5 shrink-0" :style="`background-color: ${options.bgMainColor};`" name="plus.svg" folder="icons/tabler" size="20px" />
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    options: { type: Object },
    // baseColors: { type: Object },
});

const selectedType = ref(1);
const selectedTopings = ref(new Set());
</script>
