<style scoped>
table td:first-child {
    border-radius: 0 1rem 1rem 0;
}
table td:last-child {
    border-radius: 1rem 0 0 1rem;
}
</style>

<template>
    <section class="flex flex-col items-start gap-4 w-full h-full rounded-lg">
        <h2 class="flex items-center gap-2 text-2xl font-bold">
            <Icon class="w-6 h-6 gradient" name="money-bill-transfer.svg" folder="icons/duo" size="24px" />
            {{ $t("panel.account.Transactions") }}
        </h2>
        <table class="w-full text-fgPrimary border-separate border-spacing-y-4 -my-4" v-if="records.list.length !== 0">
            <thead class="">
                <th class="text-start px-4">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Brand") }}</span>
                </th>
                <th class="text-start px-4">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Bill Number") }}</span>
                </th>
                <th class="text-start px-4">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Transaction Code") }}</span>
                </th>
                <th class="text-start px-4">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Payment Status") }}</span>
                </th>
                <th class="text-start px-4">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Payment Method") }}</span>
                </th>
                <th class="text-start px-4">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Transaction Time") }}</span>
                </th>
                <th class="text-start px-4">
                    <span class="text-sm opacity-75">{{ $t("panel.payment.Paid Amount") }}</span>
                </th>
            </thead>
            <tr class="rounded-2xl" v-for="(transaction, i) in records.list" :key="i">
                <td class="bg-bgAccent p-4">
                    <div class="flex items-center gap-2">
                        <img class="w-8 aspect-square object-cover rounded-full" :src="transaction.brand.logo" alt="" />
                        <span>{{ transaction.brand.translation[locale]?.name || transaction.brand.name }}</span>
                    </div>
                </td>
                <td class="bg-bgAccent p-4">
                    {{ transaction.bill.billNumber }}
                </td>
                <td class="bg-bgAccent p-4">
                    <b>{{ transaction.code }}</b>
                </td>
                <td class="bg-bgAccent p-4">
                    <b class="flex items-center gap-2 text-blue-300" v-if="transaction.status == 'pending'">
                        <div class="bg-blue-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-blue-50" name="Sand-watch.svg" folder="icons/basil" size="16px" />
                        </div>
                        {{ $t("panel.payment.pendingPayment") }}
                    </b>
                    <b class="flex items-center gap-2 text-emerald-300" v-if="transaction.status == 'ok'">
                        <div class="bg-emerald-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-emerald-50" name="Check.svg" folder="icons/basil" size="20px" />
                        </div>
                        {{ $t("panel.payment.done") }}
                    </b>
                    <b class="flex items-center gap-2 text-rose-300" v-if="transaction.status == 'canceled'">
                        <div class="bg-rose-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-rose-50" name="Cross.svg" folder="icons/basil" size="20px" />
                        </div>
                        {{ $t("panel.payment.canceled") }}
                    </b>
                    <b class="flex items-center gap-2 text-red-300" v-if="transaction.status == 'error'">
                        <div class="bg-red-700 w-4 h-4 rounded-full">
                            <Icon class="w-4 h-4 bg-red-50" name="Info-circle.svg" folder="icons/basil" size="18px" />
                        </div>
                        {{ $t("panel.payment.error") }}
                    </b>
                </td>
                <td class="bg-bgAccent p-4">
                    <span class="p-1 px-2 rounded-xl bg-pencil-tip">{{ transaction.method }}</span>
                </td>
                <td class="bg-bgAccent p-4">
                    <span>{{ new Date(transaction.createdAt).toLocaleString(locale) }}</span>
                </td>
                <td class="bg-bgAccent p-4">
                    <div class="flex items-center gap-1">
                        <span class="font-bold text-secondary text-xl">{{ Intl.NumberFormat(locale).format(transaction.paidPrice || 0) }}</span>
                        <span class="f-inter text-sm"> {{ $t("pricing.Toman") }} </span>
                    </div>
                </td>
            </tr>
        </table>
        <Loading class="w-full my-4" v-if="loading" />
        <button
            class="btn w-max p-3 hover:px-6 border border-bgSecondary hover:bg-fgPrimary hover:text-bgPrimary rounded-xl text-xs"
            @click="loadMore()"
            v-if="!noMoreRecords && records.list.length > 0"
        >
            {{ $t("panel.Load More") }}
        </button>
        <small class="text-xs opacity-75" v-if="noMoreRecords && records.list.length > 0">{{ $t("panel.End of the list") }}</small>
        <div
            class="flex flex-col items-center gap-2 w-full max-w-screen-xs p-6 mx-auto my-4 rounded-2xl bg-bgAccent shadow-mr25"
            v-if="records.list.length === 0"
        >
            <!-- <img class="h-20" src="~/assets/images/envelop.png" alt="" /> -->
            <p class="opacity-75">{{ $t("panel.payment.You have not done any transactions yet") }}</p>
        </div>
    </section>
</template>

<script setup>
import { useToast } from "vue-toastification";

const { localeProperties, locale, t } = useI18n();
const toast = useToast();

useHead({ title: `${t("panel.account.Transactions")}` });

const errorField = ref("");
const responseMessage = ref("");

const handleErrors = (err) => {
    if (!err) return;
    errorField.value = "data";
    if (typeof err.response !== "undefined" && err.response.data) {
        const errors = err.response.data.errors || err.response.data.message;
        if (typeof errors === "object") responseMessage.value = errors[0].errors[0];
    } else responseMessage.value = t("Something went wrong!");
    if (process.server) console.log({ err });
    // TODO : log errors in sentry type thing
    if (responseMessage.value && process.client) toast.error(responseMessage.value, { timeout: 3000, rtl: localeProperties.value.dir == "rtl" });
};

// getTransactionList -------------------------------------------------
const noMoreRecords = ref(false);
const lastRecordID = ref("");
const records = reactive({ list: [] });
const getTransactionList_results = await useLazyAsyncData(() => getUserTransactionList(records.list, 25, lastRecordID.value), { watch: [lastRecordID] });
const loading = computed(() => getTransactionList_results.pending.value);

if (getTransactionList_results.error.value) handleErrors(getTransactionList_results.error.value);
watch(getTransactionList_results.error, (err) => handleErrors(err));

const handleInviteList_results = (data) => {
    if (!data) return;
    records.list = data._transactions;
    noMoreRecords.value = data._noMoreRecords;
};
watch(getTransactionList_results.data, (val) => handleInviteList_results(val), { immediate: process.server || useNuxtApp().isHydrating });

const loadMore = () => {
    if (noMoreRecords.value) return;
    const lastRecord = records.list[records.list.length - 1];
    if (lastRecordID.value === lastRecord._id) noMoreRecords.value = true;
    lastRecordID.value = lastRecord._id;
};
// -------------------------------------------------
</script>
