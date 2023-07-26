<template>
    <div class="sticky bottom-2 flex items-center gap-5 px-1 mt-4 h-12 bg-pencil-tip rounded-full shadow-nr35">
        <button class="flex items-center justify-center w-10 h-10 bg-dolphin rounded-full group">
            <Icon class="w-7 h-7 shrink-0 bg-white transition-all group-hover:scale-125 group-hover:rotate-6" name="bell-ringing.svg" folder="icons/tabler" size="28px" />
        </button>
        <button class="flex items-center justify-center bg-dolphin rounded-full group" :class="[border ? 'w-16 h-16 border-4 border-pencil-tip' : 'w-14 h-14']">
            <Icon
                class="w-7 h-7 shrink-0 bg-stone-400 transition-all group-hover:scale-125 group-hover:-rotate-6"
                name="building-store.svg"
                folder="icons/tabler"
                size="28px"
            />
        </button>
        <button class="relative flex items-center justify-center w-10 h-10 bg-dolphin rounded-full group">
            <Icon class="w-7 h-7 shrink-0 bg-white transition-all group-hover:scale-125 group-hover:rotate-6" name="receipt-2.svg" folder="icons/tabler" size="28px" />
            <span class="absolute top-0 -start-1 flex items-center justify-center w-4 h-4 bg-rose-500 text-white rounded-full text-xxs shadow-nr15">5</span>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    border: { type: Boolean },
});
</script>
