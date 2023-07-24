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
    <div class="flex flex-col items-center gap-4 w-full mt-4">
        <div id="details" class="flex flex-col items-start gap-4 w-full">
            <div class="flex flex-col items-start gap-3 w-full">
                <h2 class="w-9/12 h-3 bg-stone-400 rounded"></h2>
                <div class="flex flex-col gap-2 w-full">
                    <span class="w-full h-1 bg-white opacity-50 rounded"></span>
                    <span class="w-full h-1 bg-white opacity-50 rounded"></span>
                    <span class="w-8/12 h-1 bg-white opacity-50 rounded"></span>
                </div>
            </div>
            <div class="flex items-center justify-between gap-4 w-full">
                <div class="flex items-center gap-2 opacity-50">
                    <strong class="p-2 rounded-md text-xs border border-stone-400 bg-pencil-tip bg-opacity-75 text-white">
                        <h6 class="w-4 h-1 bg-white rounded"></h6>
                    </strong>
                    <strong class="p-2 rounded-md text-xs border border-stone-400 bg-pencil-tip bg-opacity-75 text-white">
                        <h6 class="w-8 h-1 bg-white rounded"></h6>
                    </strong>
                </div>
                <div class="flex items-start gap-2">
                    <div class="flex items-center gap-1 p-2 py-1 bg-dolphin rounded-full shadow-nr35">
                        <Icon class="w-5 h-5 bg-rose-300" name="heart.svg" folder="icons/tabler" size="20px" />
                        <small class="text-xs">34</small>
                    </div>
                    <div class="flex items-center gap-1 px-2 py-1 bg-dolphin rounded-full shadow-nr35">
                        <Icon class="w-5 h-5 bg-white opacity-75" name="message.svg" folder="icons/tabler" size="20px" />
                    </div>
                </div>
            </div>
        </div>

        <div id="images" class="flex items-center gap-4 w-max">
            <div class="w-52 aspect-square rounded-xl bg-neutral-600 shadow-nr25 overflow-hidden">
                <img class="w-full h-full object-contain opacity-10" src="/sample-foods/sample-food1.webp" alt="" />
            </div>
            <div class="w-52 aspect-square rounded-xl bg-neutral-600 shadow-nr25 overflow-hidden">
                <img class="w-full h-full object-contain opacity-10" src="/sample-foods/sample-food2.webp" alt="" />
            </div>
            <div class="w-52 aspect-square rounded-xl bg-neutral-600 shadow-nr25 overflow-hidden">
                <img class="w-full h-full object-contain opacity-10" src="/sample-foods/sample-food3.webp" alt="" />
            </div>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-4 h-2 bg-stone-400 rounded-full"></span>
            <span class="w-2 h-2 bg-white opacity-20 rounded-full"></span>
            <span class="w-2 h-2 bg-white opacity-20 rounded-full"></span>
        </div>

        <ul id="types" class="flex items-start gap-4 w-full overflow-auto">
            <li
                class="flex flex-col gap-4 p-3 rounded-lg border border-white border-opacity-5 cursor-pointer shadow-nr25"
                :class="[selectedType == i ? 'bg-white' : 'bg-pencil-tip']"
                v-for="i in 4"
                :key="i"
                @click="selectedType = i"
            >
                <h3 class="w-8 h-1 rounded-full opacity-60" :class="[selectedType == i ? 'bg-pencil-tip' : 'bg-white']"></h3>
            </li>
        </ul>
        <ul id="toppings" class="flex flex-col items-start gap-4 w-full">
            <li
                class="flex items-center gap-2 w-full cursor-pointer"
                v-for="i in 3"
                :key="i"
                @click="selectedTopings.has(i) ? selectedTopings.delete(i) : selectedTopings.add(i)"
            >
                <span class="rounded opacity-60 border-2" :class="[selectedTopings.has(i) ? 'bg-pencil-tip' : 'bg-white']">
                    <Icon class="w-3 h-3 bg-pencil-tip" name="Check.svg" folder="icons/basil" size="16px" />
                </span>
                <h3 class="w-20 h-2.5 rounded-full bg-white opacity-25"></h3>
                <span class="w-8 h-2 ms-auto rounded-full bg-stone-400 opacity-75"></span>
            </li>
        </ul>
        <hr class="w-full opacity-10 mt-auto" />
        <div id="price" class="flex flex-wrap items-center justify-between gap-4 w-full">
            <div class="flex items-center gap-2">
                <span class="w-16 h-5 bg-white opacity-75 rounded"></span>
                <span class="w-3 h-5 bg-stone-400 rounded"></span>
            </div>
            <button class="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-pencil-tip shadow-nr35 shrink-0">
                <span class="w-16 h-2 bg-dolphin opacity-75 rounded"></span>
                <Icon class="w-5 h-5 shrink-0 bg-pencil-tip" name="plus.svg" folder="icons/tabler" size="20px" />
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    imageTopMargin: { type: Number },
});

const selectedType = ref(1);
const selectedTopings = ref(new Set());
</script>
