<template>
    <ul class="flex flex-wrap gap-2">
        <li class="flex flex-col gap-3 w-[150px] p-3 bg-pencil-tip rounded-lg shadow-nr35" v-for="i in 8" :key="i">
            <span class="w-full aspect-square rounded-lg bg-neutral-700"></span>
            <span class="w-10/12 h-2 bg-stone-500 rounded-sm"></span>
            <div class="flex flex-col gap-1.5">
                <span class="w-full h-0.5 bg-neutral-200 opacity-75"></span>
                <span class="w-8/12 h-0.5 bg-neutral-200 opacity-75"></span>
            </div>
            <hr class="w-full opacity-20" />
            <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-1 text-base/none">
                    <b class="w-12 h-4 bg-white opacity-75 rounded"></b>
                    <span class="w-2 h-4 bg-stone-400 rounded-sm"></span>
                </div>
                <button class="flex items-center justify-center w-7 h-7 p-1 rounded-full bg-white text-pencil-tip shadow-nr35 shrink-0">
                    <Icon class="w-5 h-5 shrink-0 bg-pencil-tip" name="plus.svg" folder="icons/tabler" size="18px" />
                </button>
            </div>
        </li>
    </ul>
</template>

<script setup></script>
