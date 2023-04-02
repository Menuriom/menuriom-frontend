<style scoped>
.wrapper {
    background-image: url("~/assets/images/pattern.webp");
    background-repeat: repeat;
    background-size: 226px;
}
</style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <section class="wrapper flex flex-col items-center gap-4 w-full max-w-screen-2xl p-8">
            <img class="w-14 mb-4" src="~/assets/images/icons/pricing.png" alt="pricing" />
            <h1 class="f-inter text-6xl font-extrabold">Pricing</h1>
            <p class="w-full max-w-xl text-center text-2xl md:text-3xl font-bold opacity-60">No matter the size of your business, we got you covered</p>
            <h3 class="w-max p-6 py-2.5 text-baby-blue bg-pencil-tip rounded-full -mb-12">Start creating instantly. Start free.</h3>
        </section>
        <Plans />
        <PlanCompare />
        <hr class="gradient-re border-0 -my-4 h-1 w-full max-w-screen-lg">
        <Faqs blobPosition="left" />
    </div>
</template>

<script setup>
import Plans from "~/components/web/pricing/Plans.vue";
import PlanCompare from "~/components/web/pricing/PlanCompare.vue";
import Faqs from "~/components/web/home/Faqs.vue";

useHead({ title: `Pricing and plan compression - Menuriom` });
definePageMeta({ layout: "default" });
</script>
