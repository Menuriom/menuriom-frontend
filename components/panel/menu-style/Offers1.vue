<template>
    <div class="flex flex-col items-center justify-center gap-4 w-full p-2 mt-5">
        <div class="relative flex items-center justify-between gap-4 w-full p-4 rounded-lg bg-stone-400 isolate">
            <div class="absolute start-0 top-0 w-full h-22 bg-stone-400 rounded-lg isolate -z-10 overflow-hidden">
                <img class="absolute opacity-20" src="~/assets/images/pattern2.png" alt="" />
            </div>
            <!-- <img class="absolute top-0 start-0 -z-10 opacity-20" src="~/assets/images/pattern2.png" alt="" /> -->
            <div class="flex flex-col gap-2">
                <h2 class="flex items-center gap-2 mb-1">
                    <span class="w-12 h-4 bg-pencil-tip rounded"></span>
                    <span class="w-8 h-4 bg-white rounded"></span>
                    <span class="w-8 h-4 bg-pencil-tip rounded"></span>
                </h2>
                <div class="flex flex-col gap-1.5">
                    <span class="w-32 h-1 bg-pencil-tip opacity-75"></span>
                    <span class="w-32 h-1 bg-pencil-tip opacity-75"></span>
                    <span class="w-20 h-1 bg-pencil-tip opacity-75"></span>
                </div>
            </div>
            <div class="w-32 h-20 -mt-5 bg-dolphin -rotate-[30deg] shadow-nr35 rounded-xl overflow-hidden">
                <span class="flex flex-wrap items-center rotate-12 opacity-5 font-extrabold whitespace-nowrap">
                    <i class="-ms-10">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="-ms-5">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="-ms-16">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="-ms-2">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="-ms-6">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                    <i class="-ms-20">OFFER SELL DISCOUNT OFFER SELL DISCOUNT</i>
                </span>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-4 h-2 bg-stone-400 rounded-full"></span>
            <span class="w-2 h-2 bg-white opacity-20 rounded-full"></span>
            <span class="w-2 h-2 bg-white opacity-20 rounded-full"></span>
        </div>
    </div>
</template>

<script setup></script>
