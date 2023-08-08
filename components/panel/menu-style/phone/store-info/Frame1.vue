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
        class="absolute flex items-center justify-center p-6 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="pattern-bg absolute bottom-1/2 -z-10 w-[30rem] max-w-none aspect-square pointer-events-none"
            :style="`background-image: url('${options.bgImage}'); background-size: ${options.bgImageSize}%; background-color: ${options.bgMainColor}; opacity: ${options.bgImageOpacity}%; rotate: ${options.bgImageRotation}deg;`"
            v-if="options.withPattern"
        ></div>
        <div
            class="relative flex flex-col items-center px-4 py-6 w-full max-h-[40rem] shadow-nr35 isolate"
            :style="`background-color: ${options.bgMainColor}; border-radius: ${options.cornerRadius > 24 ? 24 : options.cornerRadius}px;`"
        >
            <div class="absolute bottom-0 w-full h-full overflow-hidden">
                <div
                    class="pattern-bg absolute bottom-0 -z-10 w-[30rem] max-w-none aspect-square pointer-events-none"
                    :style="`
                    background-image: url('${options.bgImage}');
                    background-size: ${options.bgImageSize}%;
                    background-color: ${options.bgMainColor}; opacity: ${options.bgImageOpacity / 8}%; rotate: ${options.bgImageRotation}deg;`"
                    v-if="options.withPattern"
                ></div>
            </div>

            <button
                class="absolute -top-4 flex items-center justify-center p-2 rounded-full shadow-nr35 transition-all hover:scale-125"
                :style="`background-color: ${options.textColor};`"
            >
                <Icon class="w-5 h-5 rotate-45" :style="`background-color: ${options.bgMainColor};`" name="plus.svg" folder="icons/tabler" size="20px" />
            </button>

            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    options: { type: Object },
    // baseColors: { type: Object },
});
</script>
