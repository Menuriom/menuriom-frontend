<template>
    <div
        class="fixed flex items-end justify-center p-2.5 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div class="relative flex flex-col items-center p-4 py-6 w-full max-h-[40rem] bg-pencil-tip rounded-xl shadow-nr35 isolate" :style="`margin-top: ${marginTop / 4}rem`">
            <img class="absolute -bottom-10 -z-10 w-96 max-w-none rotate-12 opacity-10 pointer-events-none" src="~/assets/images/pattern2.png" alt="" />
            <span class="w-4/12 h-1.5 rounded-full bg-neutral-300 mix-blend-difference" v-if="!marginTop"></span>
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    marginTop: { type: Number },
});
</script>
