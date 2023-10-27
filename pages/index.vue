<style scoped></style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <Hero2 class="z-2" />
        <Features class="mt-0 2sm:mt-[30%] sm:mt-64 2xl:mt-40" />
        <OtherFeatures class="mt-24" />
        <Pricing class="mt-24" />
        <hr class="gradient-re opacity-50 border-0 my-6 h-0.5 w-11/12 lg:w-full max-w-screen-lg" />
        <Faqs />
    </div>
</template>

<script setup>
// TODO : vue bundles every component and loads them when any page loads... 
// use asyncComponents to make sure components load on pages they are needed and lower bundle size
// asyncComponents components need to have v-if on them and imported using defineAsynComponent function
import Hero from "~/components/web/home/Hero.vue";
import Hero2 from "~/components/web/home/Hero2.vue";
import Features from "~/components/web/home/Features.vue";
import OtherFeatures from "~/components/web/home/OtherFeatures.vue";
import Pricing from "~/components/web/home/Pricing.vue";
import Faqs from "~/components/web/home/Faqs.vue";

useHead({ title: `Create highly versatile online QR menus - Menuriom` });
definePageMeta({ layout: "default" });

// TODO : make main buttons and secondary buttons the same for all the website including the panel
</script>
