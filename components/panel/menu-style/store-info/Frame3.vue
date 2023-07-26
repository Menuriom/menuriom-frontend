<template>
    <div
        class="fixed flex items-end justify-center p-2.5 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div class="relative flex flex-col items-center p-4 w-full h-[40rem] bg-pencil-tip rounded-xl shadow-nr35 isolate">
            <img class="absolute bottom-0 -z-10 w-96 max-w-none rotate-12 opacity-10 pointer-events-none" src="~/assets/images/pattern2.png" alt="" />

            <button class="absolute -top-4 flex items-center justify-center p-2 bg-dolphin rounded-full shadow-nr15 transition-all hover:scale-125">
                <Icon class="w-5 h-5 bg-white rotate-45" name="plus.svg" folder="icons/tabler" size="20px" />
            </button>

            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({});
</script>
