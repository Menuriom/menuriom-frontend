<style scoped>
.icon-box {
    /* border: 1rem solid rgba(37, 37, 37, 70%); */
    border: 1rem solid rgba(255, 255, 255, 70%);
}
</style>

<template>
    <div class="flex flex-col items-center justify-center gap-4">
        <!-- TODO -->
        <div class="flex flex-col items-center gap-2 w-full max-w-2xl p-4 md:p-8 bg-white shadow-nr5 rounded-xl">
            <div class="icon-box flex items-center justify-center bg-emerald-400 w-20 h-20 rounded-full" v-if="route.query.statusCode == 200">
                <Icon class="w-7 h-7 bg-neutral-50" name="Check.svg" folder="icons/basil" size="32px" />
            </div>
            <div class="icon-box flex items-center justify-center bg-rose-400 w-20 h-20 rounded-full" v-else>
                <Icon class="w-7 h-7 bg-neutral-50" name="Cross.svg" folder="icons/basil" size="32px" />
            </div>

            <h2 class="text-2xl text-emerald-400 font-bold mt-2" v-if="route.query.statusCode == 200">Payment Successful</h2>
            <h2 class="text-2xl text-rose-400 font-bold mt-2" v-else>Payment Failed</h2>

            <p class="text-sm text-black opacity-80 text-center" v-if="route.query.statusCode == 200">Your plan successfuly changed to "Standard" plan</p>
            <div class="flex flex-col items-center gap-1" v-else>
                <p class="text-sm text-black text-center">Payment failed with error code of <b>422</b></p>
                <p class="text-xs text-black opacity-75 text-center">Please contact our support for more info</p>
            </div>

            <nuxt-link class="text-sm text-violet underline mt-4" to="">Go back to billing page</nuxt-link>
        </div>
        <div class="flex flex-col items-center sm:items-start gap-4 w-full max-w-2xl p-4 md:p-8 bg-white shadow-nr5 rounded-xl">
            <h2 class="flex items-center gap-4 text-xl w-full">
                <b class="shrink-0">Transaction Details</b>
                <span class="w-full h-0.5 bg-neutral-200 grow"></span>
            </h2>
            <ul class="flex flex-col gap-4 w-full">
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm">Transaction Code</span>
                    <b>{{ paymentInfo.transaction.code }}</b>
                </li>
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm">Payment Status</span>
                    <b class="flex items-center gap-1">
                        <div class="bg-blue-500 w-5 h-5 rounded-full" v-if="paymentInfo.transaction.status == 'pending'">
                            <Icon class="w-5 h-5 bg-blue-50" name="Sand-watch.svg" folder="icons/basil" size="20px" />
                        </div>
                        <div class="bg-emerald-500 w-5 h-5 rounded-full" v-if="paymentInfo.transaction.status == 'ok'">
                            <Icon class="w-5 h-5 bg-emerald-50" name="Check.svg" folder="icons/basil" size="24px" />
                        </div>
                        <div class="bg-rose-500 w-5 h-5 rounded-full" v-if="paymentInfo.transaction.status == 'canceled'">
                            <Icon class="w-5 h-5 bg-rose-50" name="Cross.svg" folder="icons/basil" size="24px" />
                        </div>
                        <div class="bg-red-500 w-5 h-5 rounded-full" v-if="paymentInfo.transaction.status == 'error'">
                            <Icon class="w-5 h-5 bg-red-50" name="Info-circle.svg" folder="icons/basil" size="22px" />
                        </div>
                        {{ paymentInfo.transaction.status }}
                    </b>
                </li>
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm">Payment Method</span>
                    <b>{{ paymentInfo.transaction.method }}</b>
                </li>
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm">Transaction Time</span>
                    <b>{{ new Date(paymentInfo.transaction.createdAt).toLocaleString(locale) }}</b>
                </li>
                <hr class="border-0 border-dashed border-b-2" />
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full" v-if="paymentInfo.transaction.paidPrice">
                    <span class="text-sm">Paid Amount</span>
                    <div class="flex items-center gap-1">
                        <span class="font-bold text-emerald-700 text-2xl">{{ Intl.NumberFormat(locale).format(paymentInfo.transaction.paidPrice) }}</span>
                        <span class="f-inter text-sm"> {{ $t("pricing.Toman") }} </span>
                    </div>
                </li>
            </ul>
            <div class="flex flex-col gap-2 w-full p-2 md:p-4 border rounded-lg shadow-nr5">
                <div class="flex items-center justify-between">
                    <!-- TODO -->
                    <h2 class="font-bold">Bill Info</h2>
                    <Icon class="w-4 h-4 bg-black" name="arrow.svg" folder="icons" size="16px" />
                </div>
            </div>
        </div>
        <a class="flex items-center gap-4 w-full max-w-2xl p-4 md:p-8 bg-white shadow-nr5 rounded-xl" href="#TODO">
            <Icon class="w-9 h-9 gradient" name="square-question.svg" folder="icons/light" size="32px" />
            <div class="flex flex-col grow">
                <h4 class="">Trouble With Your Payment?</h4>
                <p class="text-xs opacity-80">Let us know by contact through support</p>
            </div>
            <Icon class="w-3 h-3 bg-black" name="arrow-angle.svg" folder="icons" size="12px" />
        </a>
    </div>
</template>

<script setup>
// TODO :
// if successful : request backend to get transaction and bill details with a link to head back to billing page
// if error : show error and if a transactiod id available then request back to get transaction and bill info

const { locale, t } = useI18n();
const route = useRoute();

const title = computed(() => `${t("panel.Payment Results")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const paymentInfo = {
    bill: {
        billNumber: "#54353543",
        description: "For renewal of the monthly standard plan",
        payablePrice: 0,
        status: "",
    },
    transaction: {
        code: "A0000000000023132",
        method: "Zarinpal",
        paidPrice: 2222220,
        status: "ok",
        createdAt: new Date(Date.now()).toString(),
    },
};

console.log({
    statusCode: route.query.statusCode,
    message: route.query.message,
});
</script>
