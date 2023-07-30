<style scoped></style>

<template>
    <div class="">
        <div class="flex flex-col flex-wrap cursor-pointer" @click="changeOpenState()">
            <slot name="title" />
        </div>
        <div class="grid flex-col gap-2 transition-all" :style="`grid-template-rows: ${openState}fr;`">
            <slot class="overflow-hidden" />
        </div>
    </div>
</template>

<script setup>
const openState = ref(0);
const changeOpenState = () => {
    console.log(1);
    openState.value = openState.value ? 0 : 1;
};
</script>
