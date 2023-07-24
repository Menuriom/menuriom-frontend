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
    <component :is="Frame1" :marginTop="imageTopMargin">
        <Body2 :imageTopMargin="imageTopMargin" />
    </component>
</template>

<script setup>
import Frame1 from "./item-details/Frame1.vue";
import Frame2 from "./item-details/Frame2.vue";
import Body1 from "./item-details/Body1.vue";
import Body2 from "./item-details/Body2.vue";

const selectedType = ref(1);
const selectedTopings = ref(new Set());

const imageTopMargin = ref(0);
</script>
