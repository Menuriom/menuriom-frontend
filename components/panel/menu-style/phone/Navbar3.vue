<template>
    <div
        class="sticky bottom-0 flex items-center justify-evenly gap-5 w-full py-3 px-4 mt-2 rounded-lg"
        :style="`background-color: ${options.bgMainColor}; border-radius: ${options.radius}px;`"
    >
        <button class="flex flex-col items-center justify-center gap-1 rounded-full transition-all hover:scale-125 hover:rotate-6">
            <Icon class="w-7 h-7 shrink-0" :style="`background-color: ${options.textColor};`" name="bell-ringing.svg" folder="icons/tabler" size="28px" />
            <small class="text-xxs opacity-75 -mb-1" :style="`color: ${options.textColor};`" v-if="options.withText">Waiter</small>
        </button>
        <button class="flex flex-col items-center justify-center gap-1 rounded-full transition-all hover:scale-125 hover:-rotate-6">
            <Icon class="w-7 h-7 shrink-0" :style="`background-color: ${options.primaryColor};`" name="building-store.svg" folder="icons/tabler" size="28px" />
            <small class="text-xxs opacity-75 -mb-1" :style="`color: ${options.textColor};`" v-if="options.withText">Store Info</small>
        </button>
        <button class="relative flex flex-col items-center justify-center gap-1 rounded-full transition-all hover:scale-125 hover:rotate-6">
            <Icon class="w-7 h-7 shrink-0" :style="`background-color: ${options.textColor};`" name="receipt-2.svg" folder="icons/tabler" size="28px" />
            <small class="text-xxs opacity-75 -mb-1" :style="`color: ${options.textColor};`" v-if="options.withText">Orders</small>
            <span class="absolute top-0 -start-1 flex items-center justify-center w-4 h-4 bg-rose-500 text-white rounded-full text-xxs shadow-nr15">5</span>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    options: { type: Object },
});
</script>
