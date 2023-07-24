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
    <div class="sticky top-20 flex self-start p-2 w-full bg-pencil-tip bg-opacity-75 backdrop-blur-sm z-2">
        <ul class="flex items-start gap-4 w-full overflow-auto">
            <li
                class="flex flex-col items-center justify-center gap-4 p-3 px-4 rounded-lg border border-white border-opacity-10 bg-white cursor-pointer shadow-nr25"
            >
                <span class="w-10 h-10 rounded-full bg-neutral-700" v-if="icon"></span>
                <h3 class="w-10 h-1.5 rounded-full bg-pencil-tip opacity-60"></h3>
            </li>
            <li
                class="flex flex-col gap-4 p-3 px-4 rounded-lg border border-white border-opacity-5 bg-pencil-tip cursor-pointer shadow-nr25"
                v-for="i in 5"
                :key="i"
            >
                <span class="w-10 h-10 rounded-full bg-neutral-700" v-if="icon"></span>
                <h3 class="w-10 h-1.5 rounded-full bg-white opacity-60"></h3>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: { type: Boolean },
});
</script>
