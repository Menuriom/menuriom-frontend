<style scoped>
.btn {
    transition: all 0.2s;
    box-shadow: 3px 3px 1px 1px rgba(255, 255, 255, 15%);
    cursor: pointer;
}
.btn:hover {
    transform: translate(2px, 2px);
    box-shadow: 0px 0px 1px 1px rgba(255, 255, 255, 15%);
}
.btn-primary {
    background-color: theme("colors.violet");
}
.btn-secondary {
    background-color: transparent;
}
</style>

<template>
    <a class="btn p-2 sm:p-4 px-4 sm:px-8 rounded-md" :class="[type == 'primary' ? 'btn-primary' : 'btn-secondary']" :href="linkTo" v-if="isLink && samepage">
        <slot />
    </a>
    <nuxt-link class="btn p-2 sm:p-4 px-4 sm:px-8 rounded-md" :class="[type == 'primary' ? 'btn-primary' : 'btn-secondary']" :to="linkTo" v-else-if="isLink && !samepage">
        <slot />
    </nuxt-link>
    <button class="btn p-2 sm:p-4 px-4 sm:px-8 rounded-md" :class="[type == 'primary' ? 'btn-primary' : 'btn-secondary']" v-else>
        <slot />
    </button>
</template>

<script setup>
const props = defineProps({
    type: { type: String, default: "primary" },
    isLink: { type: Boolean, default: true },
    samepage: { type: Boolean, default: false },
    linkTo: { required: false, type: String },
});
</script>
