<template>
    <div class="flex flex-col items-center justify-center gap-2 w-full p-2">
        <div class="relative flex flex-col gap-2 w-full p-4 rounded-lg bg-stone-400 isolate overflow-hidden">
            <img class="absolute top-0 start-0 -z-10 opacity-20" src="~/assets/images/pattern2.png" alt="" />
            <h2 class="flex items-center gap-2">
                <span class="w-12 h-5 bg-pencil-tip rounded"></span>
                <span class="w-8 h-5 bg-white rounded"></span>
                <span class="w-8 h-5 bg-pencil-tip rounded"></span>
            </h2>
            <div class="flex flex-col gap-1.5">
                <span class="w-32 h-1 bg-pencil-tip opacity-75"></span>
                <span class="w-20 h-1 bg-pencil-tip opacity-75"></span>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 bg-stone-500 rounded-full"></span>
            <span class="w-2 h-2 bg-white opacity-50 rounded-full"></span>
            <span class="w-2 h-2 bg-white opacity-50 rounded-full"></span>
        </div>
    </div>
</template>

<script setup></script>
