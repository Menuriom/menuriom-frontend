<style scoped>
.wrapper {
    background-image: url("~/assets/images/pattern.webp");
    background-repeat: repeat;
    background-size: 226px;
}
</style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <section class="wrapper relative w-full max-w-screen-2xl p-8 bg-pencil-tip text-white rounded-xl shadow-nr25">
            <Blob class="absolute end-0 -bottom-44 opacity-60 md:opacity-70" />
            <div class="relative flex flex-col items-center gap-4">
                <img class="w-14 mb-4" src="~/assets/images/icons/pricing.png" alt="pricing" />
                <h1 class="f-inter text-6xl font-extrabold">{{ $t("pricing.Pricing") }}</h1>
                <p class="w-full max-w-xl text-center text-2xl opacity-75">
                    {{ $t("pricing.PricingSlogan") }}
                </p>
                <h3 class="w-max p-6 py-2.5 text-baby-blue bg-pencil-tip rounded-full -mb-12 shadow-nr25">
                    {{ $t("pricing.PricingSubText") }}
                </h3>
            </div>
        </section>
        <Plans class="relative" />
        <PlanCompare />
        <hr class="gradient-re border-0 -my-4 h-1 w-full max-w-screen-lg" />
        <Faqs blobPosition="left" />
    </div>
</template>

<script setup>
import Blob from "~/components/web/Blob.vue";
import Plans from "~/components/web/pricing/Plans.vue";
import PlanCompare from "~/components/web/pricing/PlanCompare.vue";
import Faqs from "~/components/web/home/Faqs.vue";

useHead({ title: `Pricing and plan compression - Menuriom` });
definePageMeta({ layout: "default" });
</script>
