<style scoped></style>

<template>
    <section class="flex flex-col items-center gap-4 w-full p-4">
        <div class="flex flex-col items-center gap-2 w-full">
            <h2 class="f-inter text-2xl lg:text-5xl font-bold text-fgPrimary">{{ $t("pricing.PRICING") }}.</h2>
            <h4 class="f-poppins lg:text-2xl opacity-50 text-fgPrimary text-center">
                {{ $t("pricing.Start creating instantly") }}. {{ $t("pricing.Start free") }}.
            </h4>
        </div>
        <Plans />
        <nuxt-link class="hover:bg-fgPrimary hover:text-bgSecondary transition-all text-sm p-4 border-2 border-bgSecondary rounded-2xl" to="/pricing">
            {{ $t("pricing.Compare the plans") }}
        </nuxt-link>
    </section>
</template>

<script setup>
import Plans from "~/components/web/pricing/Plans.vue";
</script>
