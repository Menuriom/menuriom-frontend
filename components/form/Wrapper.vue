<style scoped></style>

<template>
    <div class="">
        <div class="flex flex-col flex-wrap cursor-pointer" @click="changeOpenState()">
            <slot name="title" />
        </div>
        <div class="grid gap-2 transition-all" :style="`grid-template-rows: ${openState}fr;`">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    defaultState: { type: Number, default: 0 },
});

const openState = ref(props.defaultState || 0);
const changeOpenState = () => {
    openState.value = openState.value ? 0 : 1;
};
</script>
