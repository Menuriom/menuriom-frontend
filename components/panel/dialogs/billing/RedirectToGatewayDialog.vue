<style scoped></style>

<template>
    <Dialog name="payment-redircet" boxClass="max-w-xl" :closeable="counter <= -5">
        <div class="flex flex-col items-center justify-center gap-1 w-full">
            <LazyNuxtImg class="w-52 mb-6" src="/img/payment.png" width="208px" />
            <span class="text-xl mb-2">{{ $t("panel.billing.We are redirecting you to the payment gateway") }}...</span>
            <p class="text-sm opacity-75">{{ $t("panel.billing.Please make sure that your VPN is off") }}</p>
            <p class="text-sm opacity-75">{{ $t("panel.billing.After the payment is done, wait until the gateway redirects you back to us") }}</p>

            <b class="flex items-center justify-center w-12 h-12 mt-4 text-2xl rounded-full bg-primary text-bgAccent">
                <span v-if="counter > 0"> {{ counter }} </span>
                <Loading v-else />
            </b>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";

const counter = ref(5);
onMounted(() => {
    setInterval(() => counter.value--, 1000);
});
</script>
