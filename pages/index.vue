<style scoped></style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <Hero2 class="z-2" />
        <Features class="sm:mt-12 lg:mt-52 2xl:mt-40" />
        <OtherFeatures class="mt-10 md:mt-24" />
        <Pricing class="mt-10 md:mt-24" />
        <hr class="gradient-re opacity-50 border-0 my-6 h-0.5 w-11/12 lg:w-full max-w-screen-lg" />
        <Faqs />
    </div>
</template>

<script setup>
const Hero2 = defineAsyncComponent(() => import("~/components/web/home/Hero2.vue"));
const Features = defineAsyncComponent(() => import("~/components/web/home/Features.vue"));
const OtherFeatures = defineAsyncComponent(() => import("~/components/web/home/OtherFeatures.vue"));
const Pricing = defineAsyncComponent(() => import("~/components/web/home/Pricing.vue"));
const Faqs = defineAsyncComponent(() => import("~/components/web/home/Faqs.vue"));

useHead({ title: `Create highly versatile online QR menus - Menuriom` });
definePageMeta({ layout: "default" });
</script>
