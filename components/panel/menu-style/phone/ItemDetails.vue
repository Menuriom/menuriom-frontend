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
    <component :is="frames[itemsDialogStyleOptions.frameComponent]" :baseColors="baseColors" :options="itemsDialogStyleOptions">
        <component :is="bodies[itemsDialogStyleOptions.bodyComponent]" :baseColors="baseColors" :options="itemsDialogStyleOptions" />
    </component>
</template>

<script setup>
const props = defineProps({
    baseColors: { type: Object },
    itemsDialogStyleOptions: { type: Object },
});

const frames = {
    Frame1: defineAsyncComponent(() => import("./item-details/Frame1.vue")),
    Frame2: defineAsyncComponent(() => import("./item-details/Frame2.vue")),
};
const bodies = {
    Body1: defineAsyncComponent(() => import("./item-details/Body1.vue")),
    Body2: defineAsyncComponent(() => import("./item-details/Body2.vue")),
};
</script>
