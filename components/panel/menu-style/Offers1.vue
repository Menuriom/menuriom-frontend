<style scoped>
.scroll-text {
    animation: scroll-text 2s infinite linear alternate;
}
.scroll-text-re {
    animation: scroll-text 2s infinite linear alternate-reverse;
}
@keyframes scroll-text {
    0% {
        transform: translate(0);
    }
    100% {
        transform: translate(-10%);
    }
}
</style>

<template>
    <div class="flex flex-col items-center justify-center gap-4 w-full p-2 mt-5">
        <div
            class="relative flex items-center justify-between gap-4 w-full p-4 rounded-xl isolate shadow-nr15"
            :style="`background-color: ${baseColorOptions.accentColor};`"
        >
            <div
                class="absolute start-0 top-0 w-full h-full rounded-xl isolate -z-10 overflow-hidden"
                :style="`background-color: ${baseColorOptions.accentColor};`"
            >
                <img class="absolute opacity-20" src="~/assets/images/pattern2.png" alt="" />
            </div>
            <!-- <img class="absolute top-0 start-0 -z-10 opacity-20" src="~/assets/images/pattern2.png" alt="" /> -->
            <div class="flex flex-col gap-2">
                <h2 class="flex items-center gap-2 mb-1">
                    <span class="w-12 h-4 rounded" :style="`background-color: ${baseColorOptions.textColor};`"></span>
                    <span class="w-8 h-4 rounded" :style="`background-color: ${baseColorOptions.bgMainColor};`"></span>
                    <span class="w-8 h-4 rounded" :style="`background-color: ${baseColorOptions.textColor};`"></span>
                </h2>
                <div class="flex flex-col gap-1.5">
                    <span class="w-32 h-1 opacity-75" :style="`background-color: ${baseColorOptions.bgMainColor};`"></span>
                    <span class="w-32 h-1 opacity-75" :style="`background-color: ${baseColorOptions.bgMainColor};`"></span>
                    <span class="w-20 h-1 opacity-75" :style="`background-color: ${baseColorOptions.bgMainColor};`"></span>
                </div>
            </div>
            <div class="w-32 h-20 -mt-5 -rotate-[30deg] shadow-nr15 rounded-xl overflow-hidden" :style="`background-color: ${baseColorOptions.bgMainColor};`">
                <span class="flex flex-wrap items-center rotate-12 opacity-10 font-extrabold whitespace-nowrap">
                    <i class="scroll-text -ms-10">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="scroll-text-re -ms-5">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="scroll-text -ms-16">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="scroll-text-re -ms-2">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="scroll-text -ms-6">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="scroll-text-re -ms-20">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                </span>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-4 h-2 rounded-full" :style="`background-color: ${baseColorOptions.accentColor};`"></span>
            <span class="w-2 h-2 opacity-20 rounded-full" :style="`background-color: ${baseColorOptions.textColor};`"></span>
            <span class="w-2 h-2 opacity-20 rounded-full" :style="`background-color: ${baseColorOptions.textColor};`"></span>
        </div>
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
});
</script>
