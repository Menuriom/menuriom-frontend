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
    <component :is="frames[restaurantDetailsPageOptions.frameComponent]" :baseColors="baseColors" :options="restaurantDetailsPageOptions">
        <component
            :is="bodies[restaurantDetailsPageOptions.bodyComponent]"
            :brand="brand"
            :baseColors="baseColors"
            :options="restaurantDetailsPageOptions"
        />
    </component>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
    baseColors: { type: Object },
    restaurantDetailsPageOptions: { type: Object },
});

const frames = {
    Frame1: defineAsyncComponent(() => import("./store-info/Frame1.vue")),
    Frame2: defineAsyncComponent(() => import("./store-info/Frame2.vue")),
    Frame3: defineAsyncComponent(() => import("./store-info/Frame3.vue")),
};
const bodies = {
    Body1: defineAsyncComponent(() => import("./store-info/Body1.vue")),
};
</script>
