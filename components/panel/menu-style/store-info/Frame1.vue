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
        <img class="absolute bottom-1/2 -z-10 w-full opacity-30 pointer-events-none" src="~/assets/images/pattern2.png" alt="" />
        <div
            class="relative flex flex-col items-center px-4 py-6 w-full max-h-[40rem] rounded-2xl shadow-nr35 isolate"
            :style="`background-color: ${baseColors.bgMainColor};`"
        >
            <img class="absolute bottom-0 -z-10 w-full opacity-5 pointer-events-none" src="~/assets/images/pattern2.png" alt="" />

            <button
                class="absolute -top-4 flex items-center justify-center p-2 rounded-full shadow-nr35 transition-all hover:scale-125"
                :style="`background-color: ${baseColors.textColor};`"
            >
                <Icon
                    class="w-5 h-5 rotate-45"
                    :style="`background-color: ${baseColors.bgMainColor};`"
                    name="plus.svg"
                    folder="icons/tabler"
                    size="20px"
                />
            </button>

            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    baseColors: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
});
</script>
