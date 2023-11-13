<style scoped></style>

<template>
    <div class="flex flex-col gap-3 p-4 w-full bg-bgSecondary bg-opacity-50 rounded-2xl shadow-mr15 grow" ref="form">
        <div class="flex flex-wrap items-center gap-4 w-full">
            <h3 class="flex items-center gap-4 text-sm font-bold shrink-0">{{ $t("panel.billing.Your Last Bill") }}</h3>
            <span class="h-0.5 bg-fgPrimary opacity-30 grow"></span>
            <div class="flex items-center gap-1 text-sm" v-if="lastBill.dueDate">
                <span>{{ $t("panel.billing.Due Date") }}:</span>
                <b>{{ new Date(lastBill.dueDate).toLocaleString(locale) }}</b>
            </div>
        </div>
        <small class="text-secondary">
            {{ $t("panel.billing.Bill Number") }} <b class="text-sm text-fgPrimary" dir="ltr">#{{ lastBill.billNumber }}</b>
        </small>
        <div class="flex flex-wrap items-center gap-4">
            <p class="text-sm opacity-75">{{ lastBill.translation?.[locale]?.description || lastBill.description }}</p>
            <p class="text-sm p-1 px-2 rounded-lg bg-bgSecondary shadow-inner opacity-75" v-if="lastBill.forHowLong">
                {{ $t("panel.billing.For") }} {{ lastBill.forHowLong }}
            </p>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-bgPrimary shadow-inner grow">
            <div class="flex items-center gap-2">
                <h4 class="text-sm text-secondary">{{ $t("panel.billing.Plan") }}</h4>
                <b>{{ lastBill.plan.translation?.[locale]?.name || lastBill.plan.name }}</b>
            </div>
            <div class="flex items-baseline gap-1 font-bold">
                <span class="text-3xl/none text-emerald-400"> {{ Intl.NumberFormat(locale).format(lastBill.payablePrice) }}</span>
                <small class="text-sm">{{ $t("pricing.Toman") }}</small>
            </div>
        </div>
        <h3 class="flex items-center gap-4">
            <b class="text-sm shrink-0">{{ $t("panel.billing.Payment Details") }}</b>
            <span class="w-full h-0.5 bg-fgPrimary opacity-30"></span>
        </h3>
        <div class="flex flex-wrap items-center justify-between gap-4 w-full">
            <span
                class="p-3 py-2 text-sm rounded-xl bg-opacity-10"
                :class="{
                    'bg-red-200 text-rose-300': lastBill.status == 'notPaid',
                    'bg-blue-200 text-blue-300': lastBill.status == 'pendingPayment',
                    'bg-emerald-200 text-emerald-300': lastBill.status == 'paid',
                    'bg-red-200 text-red-300': lastBill.status == 'canceled',
                }"
            >
                {{ $t(`panel.payment.${lastBill.status}`) }}
            </span>
            <div
                class="flex flex-wrap items-center gap-2"
                v-if="(lastBill.status == 'notPaid' || lastBill.status == 'pendingPayment') && checkPermissions(['main-panel.billing.pay'], brand)"
            >
                <SelectDropDown
                    class="w-40 shrink-0"
                    customPadding="me-3 py-3"
                    :formHtmlObject="form"
                    :options="gateway.list"
                    v-slot="{ option }"
                    v-model:selected-option="selectedGateway.option"
                >
                    <div class="flex items-center gap-2 w-full">
                        <img class="w-6 object-contain" :src="option.icon" />
                        <span :value="option.value">{{ option.name }}</span>
                    </div>
                </SelectDropDown>
                <button class="btn w-max p-3 px-5 hover:px-8 text-sm bg-primary rounded-xl" @click="payLastBill()">
                    {{ $t("panel.billing.Pay This Bill") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const SelectDropDown = defineAsyncComponent(() => import("~/components/form/SelectDropDown.vue"));

const props = defineProps({
    lastBill: { type: Object },
    brand: { type: Object },
});

const { locale, t } = useI18n();

const form = ref(); // Dom Ref
const gateway = reactive({ list: [{ icon: "/icons/zarinpal.svg", name: "Zarinpal", value: "zarinpal" }] });
const selectedGateway = reactive({ option: { icon: "/icons/zarinpal.svg", name: "Zarinpal", value: "zarinpal" } });
const payLastBill = () => {
    // TODO
};
</script>
