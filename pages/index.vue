<style scoped></style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <Hero class="z-2" />
        <Features class="mt-24" />
        <OtherFeatures class="mt-24" />
        <Pricing class="-mt-10" />
        <hr class="gradient-re border-0 -my-2 h-1 w-11/12 lg:w-full max-w-screen-lg" />
        <Faqs />
    </div>
</template>

<script setup>
// TODO : vue bundles every component and loads them when any page loads... 
// use asyncComponents to make sure components load on pages they are needed and lower bundle size
// asyncComponents components need to have v-if on them and imported using defineAsynComponent function
import Hero from "~/components/web/home/Hero.vue";
import Features from "~/components/web/home/Features.vue";
import OtherFeatures from "~/components/web/home/OtherFeatures.vue";
import Pricing from "~/components/web/home/Pricing.vue";
import Faqs from "~/components/web/home/Faqs.vue";

useHead({ title: `Create highly versatile online QR menus - Menuriom` });
definePageMeta({ layout: "default" });

// TODO : make main buttons and secondary buttons the same for all the website including the panel
</script>
