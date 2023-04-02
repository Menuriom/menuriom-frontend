<style scoped></style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <Hero class="z-2" />
        <Features class="mt-24" />
        <OtherFeatures class="mt-24" />
        <Pricing class="-mt-10" />
        <hr class="gradient-re border-0 -my-2 h-1 w-full max-w-screen-lg" />
        <Faqs />
    </div>
</template>

<script setup>
import Hero from "~/components/web/home/Hero.vue";
import Features from "~/components/web/home/Features.vue";
import OtherFeatures from "~/components/web/home/OtherFeatures.vue";
import Pricing from "~/components/web/home/Pricing.vue";
import Faqs from "~/components/web/home/Faqs.vue";

useHead({ title: `Create highly versatile online digital menus - Menuriom` });
definePageMeta({ layout: "default" });
</script>
