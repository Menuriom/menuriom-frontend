<style scoped>
.icon-box {
    /* border: 1rem solid rgba(37, 37, 37, 70%); */
    border: 1rem solid rgba(50, 50, 50, 80%);
}

.dropdown-box {
    display: grid;
    grid-template-rows: 0fr;
    margin-top: -0.5rem;
    transition: all 0.2s ease-in-out;
}
.dropdown-box.open {
    grid-template-rows: 1fr;
    margin-top: 0;
}

.dropdown-box-inner {
    overflow: hidden;
}
</style>

<template>
    <div class="flex flex-col items-center justify-center gap-4">
        <div class="flex flex-col items-center gap-2 w-full max-w-2xl p-4 md:p-8 bg-bgAccent shadow-nr10 rounded-xl">
            <div class="icon-box flex items-center justify-center bg-emerald-600 w-20 h-20 rounded-full" v-if="route.query.statusCode == 200">
                <Icon class="w-7 h-7 bg-neutral-50" name="Check.svg" folder="icons/basil" size="32px" />
            </div>
            <div class="icon-box flex items-center justify-center bg-rose-400 w-20 h-20 rounded-full" v-else>
                <Icon class="w-7 h-7 bg-neutral-50" name="Cross.svg" folder="icons/basil" size="32px" />
            </div>

            <h2 class="text-2xl text-emerald-300 font-bold mt-2" v-if="route.query.statusCode == 200">{{ $t("panel.payment.Payment Successful") }}</h2>
            <h2 class="text-2xl text-rose-300 font-bold mt-2" v-else>{{ $t("panel.payment.Payment Failed") }}</h2>

            <p class="text-sm shadow-mr15 text-center bg-bgSecondary bg-opacity-50 rounded-xl p-2 px-4" v-if="route.query.statusCode == 200">
                {{ paymentInfo.bill.translation?.[locale]?.description || paymentInfo.bill.description }}
            </p>
            <div class="flex flex-col items-center gap-1" v-else>
                <p class="text-sm text-center" v-html="$t('panel.payment.errorWithCode', { code: `<b>${route.query.statusCode}</b>` })" />
                <p class="text-xs opacity-75 text-center">{{ $t("panel.payment.Please contact our support for more info") }}</p>
            </div>

            <nuxt-link class="text-sm text-primary underline underline-offset-4 mt-4" :to="localePath(`/panel/${brandID}/billing`)">
                {{ $t("panel.payment.Go back to billing page") }}
            </nuxt-link>
        </div>
        <div class="flex flex-col items-center sm:items-start gap-4 w-full max-w-2xl p-4 md:p-8 bg-bgAccent shadow-nr10 rounded-xl">
            <h2 class="flex items-center gap-4 text-xl w-full">
                <b class="shrink-0">{{ $t("panel.payment.Transaction Details") }}</b>
                <span class="w-full h-0.5 bg-neutral-200 grow"></span>
            </h2>
            <ul class="flex flex-col gap-3 w-full">
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full" v-if="paymentInfo.transaction.code">
                    <span class="text-sm">{{ $t("panel.payment.Transaction Code") }}</span>
                    <b>{{ paymentInfo.transaction.code }}</b>
                </li>
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm">{{ $t("panel.payment.Payment Status") }}</span>
                    <b class="flex items-center gap-2 text-blue-200" v-if="paymentInfo.transaction.status == 'pending'">
                        <div class="bg-blue-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-blue-50" name="Sand-watch.svg" folder="icons/basil" size="16px" />
                        </div>
                        {{ $t("panel.payment.pendingPayment") }}
                    </b>
                    <b class="flex items-center gap-2 text-emerald-200" v-if="paymentInfo.transaction.status == 'ok'">
                        <div class="bg-emerald-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-emerald-50" name="Check.svg" folder="icons/basil" size="20px" />
                        </div>
                        {{ $t("panel.payment.done") }}
                    </b>
                    <b class="flex items-center gap-2 text-rose-200" v-if="paymentInfo.transaction.status == 'canceled'">
                        <div class="bg-rose-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-rose-50" name="Cross.svg" folder="icons/basil" size="20px" />
                        </div>
                        {{ $t("panel.payment.canceled") }}
                    </b>
                    <b class="flex items-center gap-2 text-red-200" v-if="paymentInfo.transaction.status == 'error'">
                        <div class="bg-red-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-red-50" name="Info-circle.svg" folder="icons/basil" size="18px" />
                        </div>
                        {{ $t("panel.payment.error") }}
                    </b>
                </li>
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm">{{ $t("panel.payment.Payment Method") }}</span>
                    <b class="p-1 px-2 opacity-80 bg-bgPrimary shadow-inner rounded-xl">{{ paymentInfo.transaction.method }}</b>
                </li>
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm">{{ $t("panel.payment.Transaction Time") }}</span>
                    <b class="opacity-80">{{ new Date(paymentInfo.transaction.createdAt).toLocaleString(locale) }}</b>
                </li>
                <li class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full" v-if="paymentInfo.transaction.paidPrice">
                    <span class="text-sm">{{ $t("panel.payment.Paid Amount") }}</span>
                    <div class="flex items-center gap-1">
                        <span class="font-bold text-emerald-300 text-2xl">{{ Intl.NumberFormat(locale).format(paymentInfo.transaction.paidPrice) }}</span>
                        <span class="f-inter text-sm"> {{ $t("pricing.Toman") }} </span>
                    </div>
                </li>
            </ul>
            <div
                class="flex flex-col gap-4 w-full p-4 bg-bgSecondary bg-opacity-60 rounded-2xl shadow-nr15 cursor-pointer"
                @click="showBillInfo = !showBillInfo"
                v-if="paymentInfo.bill.billNumber"
            >
                <div class="flex items-center justify-between gap-4">
                    <h2 class="font-bold shrink-0">{{ $t("panel.payment.Bill Info") }}</h2>
                    <span class="w-full h-0.5 bg-neutral-600 grow"></span>
                    <Icon
                        class="w-4 h-4 bg-primary transition-all shrink-0"
                        :class="{ 'rotate-90': showBillInfo }"
                        name="arrow.svg"
                        folder="icons"
                        size="16px"
                    />
                </div>
                <div class="dropdown-box" :class="{ open: showBillInfo }">
                    <div class="dropdown-box-inner flex flex-col gap-2">
                        <span class="text-sm text-secondary">
                            {{ $t("panel.payment.Bill Number") }} : <span class="text-fgPrimary">{{ paymentInfo.bill.billNumber }}</span>
                        </span>
                        <small class="opacity-75 -mt-1">{{ paymentInfo.bill.translation?.[locale]?.description || paymentInfo.bill.description }}</small>
                        <div class="flex flex-wrap items-center justify-between gap-2">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="text-sm">{{ $t("panel.payment.Payable Price") }} :</span>
                                <span class="text-emerald-200 font-bold text-xl">
                                    {{ Intl.NumberFormat(locale).format(paymentInfo.bill.payablePrice) }}
                                    <span class="f-inter text-sm font-extralight text-white"> {{ $t("pricing.Toman") }} </span>
                                </span>
                            </div>
                            <small class="bg-rose-300 bg-opacity-10 text-rose-300 p-1 px-3 rounded-lg" v-if="paymentInfo.bill.status == 'notPaid'">
                                {{ $t("panel.payment.notPaid") }}
                            </small>
                            <small class="bg-blue-300 bg-opacity-10 text-blue-300 p-1 px-3 rounded-lg" v-if="paymentInfo.bill.status == 'pendingPayment'">
                                {{ $t("panel.payment.pendingPayment") }}
                            </small>
                            <small class="bg-emerald-300 bg-opacity-10 text-emerald-300 p-1 px-3 rounded-lg" v-if="paymentInfo.bill.status == 'paid'">
                                {{ $t("panel.payment.paid") }}
                            </small>
                            <small class="bg-red-300 bg-opacity-10 text-red-300 p-1 px-3 rounded-lg" v-if="paymentInfo.bill.status == 'canceled'">
                                {{ $t("panel.payment.canceled") }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nuxt-link class="flex items-center gap-4 w-full max-w-2xl p-4 bg-bgAccent shadow-nr10 rounded-xl" :to="localePath(`/panel/${brandID}/support`)">
            <Icon class="w-12 h-12 gradient" name="square-question.svg" folder="icons/light" size="40px" />
            <div class="flex flex-col gap-2 grow">
                <h4 class="font-bold">{{ $t("panel.payment.Trouble With Your Payment?") }}</h4>
                <p class="text-xs opacity-80">{{ $t("panel.payment.Let us know by contacting through support") }}</p>
            </div>
            <div class="p-2 rounded-lg bg-bgSecondary bg-opacity-50">
                <Icon class="w-3 h-3 bg-primary" name="arrow-angle.svg" folder="icons" size="12px" />
            </div>
        </nuxt-link>
    </div>
</template>

<script setup>
// TODO :
// if successful : request backend to get transaction and bill details with a link to head back to billing page
// if error : show error and if a transactiod id available then request back to get transaction and bill info

const { locale, t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const nuxtApp = useNuxtApp();

// const title = computed(() => `${t("panel.Payment Results")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: `${t("panel.Payment Results")} - ${t("panel.Your Menuriom Panel")}` });

const showBillInfo = ref(false);

const errorField = ref("");
const responseMessage = ref("");

const brandID = ref("");
const paymentInfo = reactive({
    bill: { billNumber: "", description: "", payablePrice: 0, status: "", translation: {} },
    transaction: { code: "", method: "", paidPrice: 0, status: "", createdAt: "" },
});

const handleErrors = (err) => {
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
};

// getTransactionDetails -------------------------------------------------
const getTransactionDetails_results = await useLazyAsyncData(() => getTransactionDetails(route.query.transactionID));
const loadingTransactionDetails = computed(() => getTransactionDetails_results.pending.value);

if (getTransactionDetails_results.error.value) handleErrors(getTransactionDetails_results.error.value);
watch(getTransactionDetails_results.error, (err) => handleErrors(err));

const handleTransactionDetails_results = (data) => {
    if (!data) return;
    brandID.value = data._brandID;
    paymentInfo.bill = data._bill;
    paymentInfo.transaction = data._transaction;
};
watch(getTransactionDetails_results.data, (val) => handleTransactionDetails_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------
</script>
