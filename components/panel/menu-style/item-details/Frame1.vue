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
    <div
        class="fixed flex items-center justify-center p-6 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="flex flex-col items-center gap-4 p-4 w-full max-h-[40rem] bg-pencil-tip rounded-xl shadow-nr35"
            :style="`margin-top: ${marginTop / 4}rem`"
        >
            <button class="absolute top-8 flex items-center justify-center p-2 bg-white rounded-full shadow-nr35 transition-all hover:scale-125">
                <Icon class="w-5 h-5 bg-pencil-tip rotate-45" name="plus.svg" folder="icons/tabler" size="20px" />
            </button>
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    marginTop: { type: Number },
});
</script>
