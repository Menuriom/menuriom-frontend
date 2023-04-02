<style scoped></style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <Hero class="z-2" />
        <Features class="mt-24" />
        <OtherFeatures class="mt-24" />
        <Pricing class="-mt-10" />
        <hr class="gradient-re border-0 -my-2 h-1 w-full max-w-screen-lg" />
        <Faqs class="" />
    </div>
</template>

<script setup>
import Pricing from "~/components/web/home/Pricing.vue";

useHead({ title: `Pricing and plan compression - Menuriom` });
definePageMeta({ layout: "default" });
</script>
