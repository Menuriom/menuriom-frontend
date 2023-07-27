<style scoped>
*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
* {
    scrollbar-width: none;
}

.scroll-text-right {
    /* animation: scroll-text 7s infinite linear alternate; */
    animation: scroll-text v-bind("seconds") infinite linear alternate;
}
.scroll-text-left {
    /* animation: scroll-text 7s infinite linear alternate-reverse; */
    animation: scroll-text v-bind("seconds") infinite linear alternate-reverse;
}
@keyframes scroll-text {
    0% {
        transform: translate(-50%);
    }
    100% {
        /* transform: translate(-400%); */
        transform: translate(v-bind("percent"));
    }
}
</style>

<template>
    <div class="flex flex-col items-center justify-center w-full" :style="`rotate:${rotation}deg`">
        <span class="w-screen h-2 bg-stone-400"></span>
        <div class="scroll-text-right flex items-start gap-2 whitespace-nowrap w-full px-2" dir="auto">
            <span class="flex items-center gap-2" v-for="i in 4" :key="i">
                {{ text }} <Icon class="w-5 h-5 bg-white shrink-0" name="north-star.svg" folder="icons/tabler" size="20px" />
            </span>
        </div>
        <div class="scroll-text-left flex items-start gap-2 whitespace-nowrap w-full px-2" dir="auto">
            <span class="flex items-center gap-2" v-for="i in 4" :key="i">
                {{ text }} <Icon class="w-5 h-5 bg-white shrink-0" name="north-star.svg" folder="icons/tabler" size="20px" />
            </span>
        </div>
        <span class="w-screen h-2 bg-stone-400"></span>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
    rotation: { type: Number },
});

const text = ref("Some Random Text Here To Test Scrolling - This Is Seprated By The Way");
const percent = computed(() => `-${text.value.length * 5}%`);
const seconds = computed(() => `${text.value.length / 5}s`);
</script>
