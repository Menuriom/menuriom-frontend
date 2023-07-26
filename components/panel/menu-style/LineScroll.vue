<style scoped>
*::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
* {
    scrollbar-width: none;
}

.scroll-text-right {
    animation: scroll-text 7s infinite linear alternate;
}
.scroll-text-left {
    animation: scroll-text 7s infinite linear alternate-reverse;
}
@keyframes scroll-text {
    0% {
        transform: translate(0);
    }
    100% {
        transform: translate(-100%);
    }
}
</style>

<template>
    <div class="flex flex-col items-center justify-center w-full" :style="`rotate:${rotation}deg`">
        <span class="w-screen h-2 bg-stone-400"></span>
        <div class="scroll-text-right flex items-start whitespace-nowrap w-full px-2" dir="auto">
            <span v-for="i in 4" :key="i">Some Random Text Here To Test Scrolling - This Is Seprated By The Way</span>
        </div>
        <div class="scroll-text-left flex items-start whitespace-nowrap w-full px-2" dir="auto">
            <span v-for="i in 4" :key="i">Some Random Text Here To Test Scrolling - This Is Seprated By The Way</span>
        </div>
        <span class="w-screen h-2 bg-stone-400"></span>
    </div>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
    rotation: { type: Number },
});
</script>
