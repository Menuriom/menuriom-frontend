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
    <component
        :is="frames[restaurantDetailsPageOptions.frameOptions.component]"
        :baseColorOptions="baseColorOptions"
        textColor=""
        bgMainColor=""
        bgSecondaryColor=""
        primaryColor=""
        accentColor=""
    >
        <component
            :is="bodies[restaurantDetailsPageOptions.bodyOptions.component]"
            :baseColorOptions="baseColorOptions"
            textColor=""
            bgMainColor=""
            bgSecondaryColor=""
            primaryColor=""
            accentColor=""
            :brand="brand"
        />
    </component>
</template>

<script setup>
const props = defineProps({
    brand: { type: Object },
    baseColorOptions: { type: Object },
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
