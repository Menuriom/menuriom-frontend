<template>
    <div class="sticky bottom-2 flex items-center gap-8 py-3 px-6 mt-2 rounded-lg shadow-nr35" :style="`background-color: ${baseColorOptions.bgMainColor};`">
        <button class="flex flex-col items-center justify-center gap-1 rounded-full transition-all hover:scale-125 hover:rotate-6">
            <Icon
                class="w-7 h-7 shrink-0"
                :style="`background-color: ${baseColorOptions.textColor};`"
                name="bell-ringing.svg"
                folder="icons/tabler"
                size="28px"
            />
            <small class="text-xxs opacity-75 -mb-1" :style="`color: ${baseColorOptions.textColor};`" v-if="text">Waiter</small>
        </button>
        <button class="flex flex-col items-center justify-center gap-1 rounded-full transition-all hover:scale-125 hover:-rotate-6">
            <Icon
                class="w-7 h-7 shrink-0"
                :style="`background-color: ${baseColorOptions.primaryColor};`"
                name="building-store.svg"
                folder="icons/tabler"
                size="28px"
            />
            <small class="text-xxs opacity-75 -mb-1" :style="`color: ${baseColorOptions.textColor};`" v-if="text">Store Info</small>
        </button>
        <button class="relative flex flex-col items-center justify-center gap-1 rounded-full transition-all hover:scale-125 hover:rotate-6">
            <Icon class="w-7 h-7 shrink-0" :style="`background-color: ${baseColorOptions.textColor};`" name="receipt-2.svg" folder="icons/tabler" size="28px" />
            <small class="text-xxs opacity-75 -mb-1" :style="`color: ${baseColorOptions.textColor};`" v-if="text">Orders</small>
            <span class="absolute top-0 -start-1 flex items-center justify-center w-4 h-4 bg-rose-500 text-white rounded-full text-xxs shadow-nr15">5</span>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    baseColorOptions: { type: Object },
    textColor: { type: String },
    bgMainColor: { type: String },
    bgSecondaryColor: { type: String },
    primaryColor: { type: String },
    accentColor: { type: String },
    text: { type: Boolean },
});
</script>
