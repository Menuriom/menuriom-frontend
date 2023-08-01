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
        :is="frames[itemsDialogStyleOptions.frameOptions.component]"
        :baseColors="baseColors"
        textColor=""
        bgMainColor=""
        bgSecondaryColor=""
        primaryColor=""
        accentColor=""
        :marginTop="imageTopMargin"
    >
        <component
            :is="bodies[itemsDialogStyleOptions.bodyOptions.component]"
            :baseColors="baseColors"
            textColor=""
            bgMainColor=""
            bgSecondaryColor=""
            primaryColor=""
            accentColor=""
            :marginTop="imageTopMargin"
        />
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

const imageTopMargin = ref(0);
</script>
