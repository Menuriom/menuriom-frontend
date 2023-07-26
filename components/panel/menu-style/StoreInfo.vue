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
    <component :is="Frame1">
        <Body1 :brand="brand" />
    </component>
</template>

<script setup>
import Frame1 from "./store-info/Frame1.vue";
import Frame2 from "./store-info/Frame2.vue";
import Frame3 from "./store-info/Frame3.vue";
import Body1 from "./store-info/Body1.vue";

const props = defineProps({
    brand: { type: Object },
});
</script>
