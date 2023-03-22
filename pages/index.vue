<style scoped></style>

<template>
    <div class="relative flex flex-col gap-10 w-full">
        <Hero class="z-2" />
        <Features class="mt-24" />
    </div>
</template>

<script setup>
import Hero from "~/components/web/home/Hero.vue";
import Features from "~/components/web/home/Features.vue";

useHead({ title: `Menuriom - Create highly versatile online digital menus` });
definePageMeta({ layout: "default" });
</script>
