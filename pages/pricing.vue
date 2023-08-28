<style scoped>
.bar {
    width: 105%;
    bottom: 1%;
    inset-inline-start: -15%;
    transform-origin: top left;
    rotate: -10deg;
    z-index: -1;
}
@media (min-width: 768px) {
    .bar {
        bottom: -15%;
    }
}
</style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <div class="relative flex flex-col items-center gap-4 p-4 mt-12 isolate">
            <div class="bar absolute h-24 rounded-2xl bg-gradient-to-r from-secondary to-primary opacity-75 shadow-mr25"></div>
            <h1 class="text-5xl lg:text-6xl font-extrabold">{{ $t("pricing.PRICING") }}.</h1>
            <p class="text-center text-xl md:text-2xl opacity-75">
                {{ $t("pricing.PricingSlogan") }}
            </p>
            <h3 class="self-start p-6 py-2.5 bg-bgSecondary bg-opacity-90 rounded-full shadow-mr25">
                <span class="gradient-text font-semibold text-base md:text-xl">
                    {{ $t("pricing.PricingSubText") }}
                </span>
            </h3>
        </div>
        <Plans class="relative" />
        <PlanCompare />
        <hr class="gradient-re opacity-50 border-0 my-6 h-0.5 w-11/12 lg:w-full max-w-screen-lg" />
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
