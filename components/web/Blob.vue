<style scoped>
.blob {
    background: linear-gradient(90deg, rgba(160, 113, 208, 0.5) 0%, rgba(124, 208, 227, 0.5) 100%);
    filter: blur(125px);
}
</style>

<template>
    <div class="blob" :style="`width: ${width}; height: ${height};`"></div>
</template>

<script setup>
defineProps({
    width: { type: String, default: "500px" },
    height: { type: String, default: "500px" },
});
</script>
