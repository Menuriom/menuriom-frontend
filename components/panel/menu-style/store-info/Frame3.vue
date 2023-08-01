<template>
    <div
        class="fixed flex items-end justify-center p-2.5 bg-black bg-opacity-60 backdrop-blur-md z-20 overflow-hidden"
        style="width: calc(360px - 1rem); height: calc(715px - 1rem); border-radius: 3.25rem"
    >
        <div
            class="relative flex flex-col items-center p-4 w-full h-[40rem] rounded-xl shadow-nr35 isolate"
            :style="`background-color: ${baseColors.bgMainColor};`"
        >
            <img class="absolute bottom-0 -z-10 w-96 max-w-none opacity-10 pointer-events-none" src="/patterns/pattern4.png" alt="" />

            <button
                class="absolute -top-4 flex items-center justify-center p-2 rounded-full shadow-nr15 transition-all hover:scale-125"
                :style="`background-color: ${baseColors.bgSecondaryColor};`"
            >
                <Icon class="w-5 h-5 rotate-45" :style="`background-color: ${baseColors.textColor};`" name="plus.svg" folder="icons/tabler" size="20px" />
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
