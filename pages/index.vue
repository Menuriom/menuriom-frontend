<style scoped></style>

<template>
    <div class="relative flex flex-col gap-10 w-full">
        <Blob class="absolute" />
        <Hero class="relative z-2" />
    </div>
</template>

<script setup>
import Hero from "~/components/web/home/Hero.vue";
import Blob from "~/components/web/Blob.vue";

useHead({ title: `Menuriom - Create highly versatile online digital menus` });
definePageMeta({ layout: "default" });
</script>
