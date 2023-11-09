<style scoped></style>

<template>
    <section class="flex flex-col items-center gap-4 w-full p-4">
        <div class="flex flex-col items-center gap-2 w-full">
            <h2 class="f-inter text-2xl lg:text-5xl font-bold text-fgPrimary">{{ $t("pricing.PRICING") }}.</h2>
            <h4 class="f-poppins lg:text-2xl opacity-50 text-fgPrimary text-center">
                {{ $t("pricing.Start creating instantly") }}. {{ $t("pricing.Start free") }}.
            </h4>
        </div>
        <Plans2 :plans="plans" />
        <nuxt-link class="hover:bg-fgPrimary hover:text-bgSecondary transition-all text-sm p-4 border-2 border-bgSecondary rounded-2xl" to="/pricing">
            {{ $t("pricing.Compare the plans") }}
        </nuxt-link>
    </section>
</template>

<script setup>
import Plans2 from "~/components/web/pricing/Plans2.vue";

const handleError = (err) => {
    if (!err) return;
};
const handleData = (data) => {
    if (!data) return;
    plans.value = data.plans;
};

// getPlans =====================================
const plans = ref([]);
const plansResults = await useFetch("/api/v1/pricing/purchasable-plans", { lazy: process.client, key: "get-purchasable-plans" });
const plansLoading = computed(() => plansResults.pending.value);

handleError(plansResults.error.value);
watch(plansResults.error, (err) => handleError(err));

handleData(plansResults.data.value);
watch(plansResults.data, (data) => handleData(data));
//  =====================================
</script>
