<style scoped>
.transactions-list {
    max-height: 24rem;
}
</style>

<template>
    <Dialog name="bill-details" boxClass="max-w-xl">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/money-bill-transfer.png" alt="" />
                <h3 class="text-2xl font-bold text-center">{{ $t("panel.billing.Bill Details") }}</h3>
            </div>
        </template>
        <div class="flex flex-col gap-2 md:w-screen max-w-lg p-2 md:p-4 border bg-white text-dolphin rounded-lg shadow-nr25" v-if="bill.billNumber">
            <div class="flex items-center justify-between gap-4">
                <h2 class="font-bold shrink-0">{{ $t("panel.payment.Bill Info") }}</h2>
                <span class="w-full h-0.5 bg-neutral-200 grow"></span>
            </div>
            <div class="flex flex-col gap-2">
                <span class="opacity-90 text-sm">{{ $t("panel.payment.Bill Number") }} : {{ bill.billNumber }}</span>
                <small class="opacity-75 -mt-1">{{ bill.translation?.[locale]?.description || bill.description }}</small>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex flex-wrap items-center gap-2">
                        <span class="text-sm opacity-75">{{ $t("panel.payment.Payable Price") }} :</span>
                        <span class="text-lime-700">
                            {{ Intl.NumberFormat(locale).format(bill.payablePrice) }}
                            <span class="f-inter text-sm font-extralight text-black">{{ $t("pricing.Toman") }}</span>
                        </span>
                    </div>
                    <small class="bg-rose-300 bg-opacity-25 text-rose-800 p-1 px-3 rounded-lg" v-if="bill.status == 'notPaid'">
                        {{ $t("panel.payment.notPaid") }}
                    </small>
                    <small class="bg-blue-300 bg-opacity-25 text-blue-800 p-1 px-3 rounded-lg" v-if="bill.status == 'pendingPayment'">
                        {{ $t("panel.payment.pendingPayment") }}
                    </small>
                    <small class="bg-emerald-300 bg-opacity-25 text-emerald-800 p-1 px-3 rounded-lg" v-if="bill.status == 'paid'">
                        {{ $t("panel.payment.paid") }}
                    </small>
                    <small class="bg-red-300 bg-opacity-25 text-red-800 p-1 px-3 rounded-lg" v-if="bill.status == 'canceled'">
                        {{ $t("panel.payment.canceled") }}
                    </small>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between gap-4">
            <h2 class="font-bold shrink-0">{{ $t("panel.billing.Transactions") }}</h2>
            <span class="w-full h-0.5 bg-neutral-500 grow"></span>
        </div>
        <ul class="transactions-list flex flex-col gap-4 pb-2 overflow-auto" v-if="transactions.list.length">
            <li
                class="flex flex-col items-center justify-between gap-2 p-4 bg-dolphin text-white rounded-lg shadow-nr25"
                v-for="(transaction, i) in transactions.list"
                :key="i"
            >
                <div class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Transaction Code") }}</span>
                    <b>{{ transaction.code }}</b>
                </div>
                <div class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Payment Status") }}</span>
                    <b class="flex items-center gap-1 text-blue-400" v-if="transaction.status == 'pending'">
                        <div class="bg-blue-500 w-5 h-5 rounded-full">
                            <Icon class="w-5 h-5 bg-blue-50" name="Sand-watch.svg" folder="icons/basil" size="20px" />
                        </div>
                        {{ $t("panel.payment.pendingPayment") }}
                    </b>
                    <b class="flex items-center gap-1 text-emerald-400" v-if="transaction.status == 'ok'">
                        <div class="bg-emerald-500 w-5 h-5 rounded-full">
                            <Icon class="w-5 h-5 bg-emerald-50" name="Check.svg" folder="icons/basil" size="24px" />
                        </div>
                        {{ $t("panel.payment.done") }}
                    </b>
                    <b class="flex items-center gap-1 text-rose-400" v-if="transaction.status == 'canceled'">
                        <div class="bg-rose-500 w-5 h-5 rounded-full">
                            <Icon class="w-5 h-5 bg-rose-50" name="Cross.svg" folder="icons/basil" size="24px" />
                        </div>
                        {{ $t("panel.payment.canceled") }}
                    </b>
                    <b class="flex items-center gap-1 text-red-400" v-if="transaction.status == 'error'">
                        <div class="bg-red-500 w-5 h-5 rounded-full">
                            <Icon class="w-5 h-5 bg-red-50" name="Info-circle.svg" folder="icons/basil" size="22px" />
                        </div>
                        {{ $t("panel.payment.error") }}
                    </b>
                </div>
                <div class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Payment Method") }}</span>
                    <span class="p-1 px-2 rounded-md bg-pencil-tip">{{ transaction.method }}</span>
                </div>
                <div class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Transaction Time") }}</span>
                    <span>{{ new Date(transaction.createdAt).toLocaleString(locale) }}</span>
                </div>
                <div class="flex flex-col sm:flex-row items-center justify-between gap-1 w-full" v-if="transaction.paidPrice">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Paid Amount") }}</span>
                    <div class="flex items-center gap-1">
                        <span class="font-bold text-emerald-100 text-xl">{{ Intl.NumberFormat(locale).format(transaction.paidPrice) }}</span>
                        <span class="f-inter text-sm"> {{ $t("pricing.Toman") }} </span>
                    </div>
                </div>
            </li>
            <Loading v-if="loadingTransactions" />
            <button class="btn w-max p-2.5 py-1.5 ms-2 border-2 border-white rounded-md text-white text-xs" @click="loadMore()" v-if="!noMoreTransactions">
                {{ $t("panel.Load More") }}
            </button>
            <small class="text-xs opacity-75" v-if="noMoreTransactions && transactions.list.length > 0">{{ $t("panel.End of the list") }}</small>
        </ul>
        <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loadingTransactions && errorField === 'data' && responseMessage !== ''">
            <Icon class="icon w-4 h-4 bg-rose-500 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
        </small>
        <div class="flex flex-col items-center gap-4 w-full my-10" v-if="!loadingTransactions && !transactions.list.length">
            <p class="text-sm opacity-50">{{ $t("panel.billing.There is no transactions for this bill") }}</p>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import { usePanelStore } from "@/stores/panel";

const props = defineProps({
    bill: Object,
});

const { localeProperties, locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const toast = useToast();
const panelStore = usePanelStore();

const form = ref(); // Dom Ref
const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

// getTransactions -------------------------------------------------
const noMoreTransactions = ref(false);
const lastTransactionID = ref("");
const pp = ref({ value: 25, name: "25" });
const transactions = reactive({ list: [] });
const getTransactionsList_results = await useLazyAsyncData(
    () => getBillTransactionsList(route.params.brandID, props.bill._id, transactions.list, pp.value.value, lastTransactionID.value),
    { watch: [lastTransactionID] }
);
const loadingTransactions = computed(() => getTransactionsList_results.pending.value);

if (getTransactionsList_results.error.value) handleErrors(getTransactionsList_results.error.value);
watch(getTransactionsList_results.error, (err) => handleErrors(err));

const handleTransactionsList_results = (data) => {
    if (!data) return;
    transactions.list = data._records;
    noMoreTransactions.value = data._noMoreRecords;
};
watch(getTransactionsList_results.data, (val) => handleTransactionsList_results(val), { immediate: process.server || nuxtApp.isHydrating });

const loadMore = () => {
    if (noMoreTransactions.value) return;
    const lastRecord = transactions.list.at(-1);
    if (lastTransactionID.value === lastRecord._id) noMoreTransactions.value = true;
    lastTransactionID.value = lastRecord._id;
};
// -------------------------------------------------
</script>
