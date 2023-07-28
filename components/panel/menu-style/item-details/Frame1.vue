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
            class="flex flex-col items-center gap-4 p-0 w-full max-h-[40rem] rounded-xl shadow-nr35"
            :style="`margin-top: ${marginTop / 4}rem; background-color: ${baseColorOptions.bgMainColor};`"
        >
            <button
                class="absolute top-8 flex items-center justify-center p-2 rounded-full shadow-nr35 transition-all hover:scale-125"
                :style="`background-color: ${baseColorOptions.textColor};`"
            >
                <Icon
                    class="w-5 h-5 rotate-45"
                    :style="`background-color: ${baseColorOptions.bgMainColor};`"
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
    marginTop: { type: Number },
    baseColorOptions: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
});
</script>
