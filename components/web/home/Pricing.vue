<style scoped></style>

<template>
    <section class="flex flex-col items-center gap-10 w-full p-2 sm:p-4 md:p-8">
        <div class="flex flex-col items-center gap-2">
            <img class="w-16 mb-4" src="~/assets/images/icons/pricing.png" alt="pricing" />
            <h2 class="f-inter text-2xl font-bold">PRICING.</h2>
            <h4 class="text-2xl opacity-60 font-extralight text-center">Start creating instantly. Start free.</h4>
        </div>
        <Plans />
        <Button class="text-sm border-4 py-2.5 px-4 border-black" type="secondary" linkTo="/pricing">Compare the plans</Button>
    </section>
</template>

<script setup>
import Button from "~/components/web/Button.vue";
import Plans from "~/components/web/pricing/Plans.vue";
</script>
