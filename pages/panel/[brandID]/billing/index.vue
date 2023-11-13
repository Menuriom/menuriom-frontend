<style scoped>
.money-box {
    max-width: 200px;
}

.plan-card-list {
    margin-top: -1rem;
    padding: 0.25rem;
    grid-template-rows: 0fr;
    transition: all 0.2s ease-out;
    opacity: 0;
}
.plan-card:hover .plan-card-list {
    padding: 1.25rem;
    grid-template-rows: 1fr;
    opacity: 1;
}
.plan-card:hover {
    z-index: 2;
}
</style>

<template>
    <div class="flex flex-col gap-6 w-full">
        <button
            class="btn relative flex flex-col items-center w-full p-3 bg-black bg-opacity-60 border-2 border-bgSecondary rounded-2xl shadow-nr25 overflow-hidden"
            name="Banner"
            @click="panelStore.openPopUp('change-plan-dialog')"
        >
            <span class="absolute end-1/2 -top-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute end-18 -bottom-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute start-1/4 -bottom-14 -rotate-45 -ms-10 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute start-1/4 -bottom-20 -rotate-12 gradient-re w-24 h-24 rounded-2xl"></span>
            <div class="relative flex flex-col items-center justify-between gap-2">
                <h5 class="hidden 2sm:flex gradient-text text-3xl font-black">{{ $t("panel.billing.Upgrade To Pro") }}</h5>
            </div>
        </button>

        <section class="flex flex-col gap-4 w-full" name="Billing Info">
            <header class="flex items-center gap-2">
                <Icon class="w-9 h-9 gradient" name="money-bills.svg" folder="icons/duo" size="36px" />
                <h1 class="text-2xl/tight md:text-3xl/tight font-bold">{{ $t("panel.billing.Billing Info") }}</h1>
            </header>
            <div class="flex flex-wrap xl:flex-nowrap gap-4 w-full rounded-2xl">
                <div class="flex flex-col gap-4 w-full xl:max-w-xl shrink-0">
                    <CurrentPlan :loadingCurrentPlan="loadingCurrentPlan" :currentPlan="currentPlan" />
                    <div class="flex flex-wrap items-center gap-4 w-full">
                        <button
                            class="btn flex items-center justify-center gap-3 p-3 hover:px-6 bg-fgPrimary text-bgPrimary rounded-xl grow"
                            @click="panelStore.openPopUp('change-plan-dialog')"
                            v-if="checkPermissions(['main-panel.billing.change-plan'], brand)"
                        >
                            <Icon class="w-5 h-5 gradient shrink-0" name="arrow-up-big-small.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.billing.Upgrade-Downgrade Plan") }}
                        </button>
                        <button
                            class="btn flex items-center justify-center gap-3 p-3 hover:px-6 bg-fgPrimary text-bgPrimary rounded-xl grow"
                            @click="panelStore.openPopUp('change-plan-dialog')"
                            v-if="checkPermissions(['main-panel.billing.change-plan'], brand)"
                        >
                            <Icon class="w-5 h-5 gradient shrink-0" name="calendar-clock.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.billing.Change Payment Period") }}
                        </button>
                    </div>
                </div>
                <LastBill :lastBill="lastBill" :brand="brand" v-if="bills.list.length > 0 && lastBill.billNumber" />
                <div class="flex flex-col gap-4 p-2 2sm:p-4 w-full bg-bgSecondary bg-opacity-50 rounded-2xl shadow-mr15 grow" v-else>
                    <div class="flex flex-wrap items-start justify-center gap-4 w-full">
                        <div class="flex flex-wrap items-center gap-4 p-2 md:p-0 grow">
                            <h3 class="flex items-center gap-4 text-sm font-bold shrink-0">{{ $t("panel.billing.Upgrade Your Plan Now") }}</h3>
                            <span class="h-0.5 bg-fgPrimary opacity-30 grow"></span>
                        </div>
                        <div class="relative flex items-center gap-2 p-1.5 py-3 rounded-xl bg-bgAccent shadow-nr15">
                            <span
                                class="absolute w-32 h-7 shadow-mr5 shadow-neutral-500 bg-fgPrimary bg-opacity-90 rounded-lg transition-all"
                                :class="[priceType == 'monthly' ? 'start-1.5' : 'start-32 ms-3']"
                            ></span>
                            <div class="relative flex items-center justify-center w-32 text-sm cursor-pointer" @click="priceType = 'monthly'">
                                <span :class="[priceType == 'monthly' ? 'text-bgPrimary' : 'text-fgPrimary']">{{ $t("pricing.Monthly") }}</span>
                            </div>
                            <div class="relative flex items-center justify-center gap-1 w-32 text-sm cursor-pointer" @click="priceType = 'annual'">
                                <span :class="[priceType == 'annual' ? 'text-bgPrimary' : 'text-fgPrimary']">{{ $t("pricing.Annual") }}</span>
                                <small class="f-inter px-2 rounded-full whitespace-nowrap text-[10px] bg-black text-purple-200"> 10% Off </small>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap @6xl:flex-nowrap items-start gap-4 grow">
                        <div
                            class="plan-card relative flex flex-col gap-6 w-full p-4 md:p-5 rounded-2xl bg-bgPrimary cursor-pointer grow"
                            v-for="(plan, i) in purchasablePlans.plans.filter((plan) => plan.monthlyPrice != 0 && plan.yearlyPrice != 0)"
                            :key="i"
                            @click="checkPermissions(['main-panel.billing.change-plan'], brand) ? panelStore.openPopUp('change-plan-dialog') : ''"
                        >
                            <div class="flex items-center gap-2">
                                <img class="w-12 bg-bgSecondary bg-opacity-50 p-2 rounded-xl" :src="plan.icon" :alt="plan.name" />
                                <h3 class="text-2xl font-bold">{{ plan.translation?.[locale]?.name || plan.name }}</h3>
                            </div>
                            <p class="text-sm opacity-75">{{ plan.translation?.[locale]?.desc || plan.desc }}</p>
                            <div class="flex flex-wrap items-center justify-between gap-4 rounded-lg" v-if="plan.monthlyPrice > 0">
                                <div class="flex flex-wrap items-baseline gap-1">
                                    <b class="f-inter gradient-text text-3xl font-extrabold">
                                        {{ Intl.NumberFormat(locale).format((priceType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice) / 1000)
                                        }}<small class="text-base">,{{ Intl.NumberFormat(locale).format(1000).substring(2) }}</small>
                                    </b>
                                    <b class="f-inter">{{ $t("pricing.Toman") }}</b>
                                    <small class="">/ {{ priceType == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</small>
                                </div>
                            </div>
                            <div class="plan-card-list grid md:absolute start-0 top-full w-full bg-bgPrimary rounded-b-2xl shadow-mr35">
                                <ul class="flex flex-col gap-5 w-full overflow-hidden">
                                    <span class="w-11/12 h-0.5 mx-auto bg-fgPrimary opacity-5"></span>
                                    <li class="flex items-center gap-2">
                                        <Icon class="relative w-4 h-4 bg-secondary" name="plus.svg" folder="icons" size="16px" />
                                        <small class="opacity-90 text-sky-200 text-xs">{{ $t("pricing.Everything on previous plan") }}</small>
                                    </li>
                                    <li class="flex items-center gap-2" v-for="(feature, j) in plan.listings" :key="j">
                                        <Icon class="relative w-4 h-4 bg-secondary" name="check.svg" folder="icons" size="16px" />
                                        <small class="opacity-80 text-fgPrimary text-xs">{{ plan.translation?.[locale]?.listings[j] || feature }}</small>
                                    </li>
                                    <button class="gradient w-full p-3 hover:px-6 text-bgPrimary rounded-xl font-extrabold shrink-0">
                                        {{ $t("panel.billing.Purchase") }}
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <hr class="w-full border-bgSecondary" />

        <section class="flex flex-col gap-6 w-full pb-2" name="Billing History">
            <header class="flex items-center gap-2">
                <Icon class="w-9 h-9 gradient" name="money-bill-transfer.svg" folder="icons/duo" size="36px" />
                <h1 class="text-2xl/tight md:text-3xl/tight font-bold">{{ $t("panel.billing.Billing History") }}</h1>
            </header>
            <!-- TODO : add date range for billing history -->
            <ul class="flex flex-col gap-4" v-if="bills.list.length">
                <li
                    class="flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 p-4 bg-bgAccent rounded-2xl shadow-nr10"
                    v-for="(bill, i) in bills.list"
                    :key="i"
                >
                    <div class="flex flex-col gap-2 w-72">
                        <small class="text-secondary">
                            {{ $t("panel.billing.Bill Number") }} <b class="text-sm text-fgPrimary" dir="ltr">#{{ bill.billNumber }}</b>
                        </small>
                        <div class="flex flex-col gap-1 opacity-75">
                            <p class="text-sm w-full max-w-sm">{{ bill.translation?.[locale]?.description || bill.description }}</p>
                            <p class="text-sm w-full max-w-sm" v-if="bill.forHowLong">
                                {{ $t("panel.billing.For") }} <span class="p-1.5 py-0 bg-bgSecondary rounded-md shadow-inner">{{ bill.forHowLong }}</span>
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-1 text-sm">
                            <span class="w-20 text-secondary">{{ $t("panel.billing.Issue Date") }}:</span>
                            <b class="w-44 opacity-80">{{ new Date(bill.createdAt).toLocaleString(locale) }}</b>
                        </div>
                        <div class="flex items-center gap-1 text-sm" v-if="bill.dueDate">
                            <span class="w-20 text-secondary">{{ $t("panel.billing.Due Date") }}:</span>
                            <b class="w-44 opacity-80">{{ new Date(bill.dueDate).toLocaleString(locale) }}</b>
                        </div>
                    </div>
                    <div class="flex items-center justify-center w-44 shrink-0">
                        <div class="flex items-center gap-2 p-3 rounded-xl border-2 border-bgSecondary shadow-mr15">
                            <img class="w-6" :src="bill.plan.icon" :alt="bill.plan.name" />
                            <span class="gradient-text font-black">
                                {{ bill.plan.translation?.[locale]?.name || bill.plan.name }}
                            </span>
                        </div>
                    </div>
                    <div class="money-box flex items-baseline gap-1 w-full font-bold">
                        <span class="text-xl text-emerald-400"> {{ Intl.NumberFormat(locale).format(bill.payablePrice) }}</span>
                        <small class="text-sm">{{ $t("pricing.Toman") }}</small>
                    </div>
                    <div class="flex items-center md:justify-center w-40 shrink-0">
                        <span
                            class="text-center p-3 py-2 text-sm rounded-xl bg-opacity-10"
                            :class="{
                                'bg-red-200 text-rose-200': bill.status == 'notPaid',
                                'bg-blue-200 text-blue-200': bill.status == 'pendingPayment',
                                'bg-emerald-200 text-emerald-200': bill.status == 'paid',
                                'bg-red-200 text-red-200': bill.status == 'canceled',
                            }"
                        >
                            {{ $t(`panel.payment.${bill.status}`) }}
                        </span>
                    </div>
                    <button
                        class="btn flex items-center justify-center w-8 hover:w-10 aspect-square rounded-full bg-neutral-50 shrink-0"
                        @click="openBillDetail(bill)"
                    >
                        <Icon class="w-5 h-5 bg-black rotate-90" name="dots.svg" folder="icons" size="4px" />
                    </button>
                </li>
            </ul>
            <Loading v-if="loadingBills" />
            <button
                class="btn w-max p-3 hover:px-6 border border-bgSecondary hover:bg-fgPrimary hover:text-bgPrimary rounded-xl text-xs"
                @click="loadMore()"
                v-if="!noMoreBills"
            >
                {{ $t("panel.Load More") }}
            </button>
            <small class="text-xs opacity-75" v-if="noMoreBills && bills.list.length > 0">{{ $t("panel.End of the list") }}</small>
            <small class="flex items-start gap-0.5 text-xs text-rose-500" v-if="!loadingBills && errorField === 'data' && responseMessage !== ''">
                <Icon class="icon w-4 h-4 bg-rose-500 shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
            </small>
            <div class="flex flex-col items-center gap-4 w-full my-10" v-if="!bills.list.length">
                <img class="w-40" src="~/assets/images/invoice.webp" alt="invoice" />
                <p class="text-sm opacity-50">{{ $t("panel.billing.You have no bills yet") }}</p>
            </div>
        </section>

        <Teleport to="body">
            <ChangePlanDialog
                :purchasablePlans="purchasablePlans.plans"
                :currentPlan="currentPlan"
                @update:currentPlan="getCurrentPlan_results.refresh()"
                v-if="panelStore.popUpOpened === 'change-plan-dialog'"
            />
            <BillDetails :bill="selectedBill" v-if="panelStore.popUpOpened === 'bill-details'" />
        </Teleport>
    </div>
</template>

<script setup>
const ChangePlanDialog = defineAsyncComponent(() => import("~/components/panel/dialogs/billing/ChangePlanDialog.vue"));
const BillDetails = defineAsyncComponent(() => import("~/components/panel/dialogs/billing/BillDetails.vue"));
const CurrentPlan = defineAsyncComponent(() => import("~/components/panel/billing/CurrentPlan.vue"));
const LastBill = defineAsyncComponent(() => import("~/components/panel/billing/LastBill.vue"));
import Loading from "~/components/Loading.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const panelStore = usePanelStore();
const userStore = useUserStore();

useHead({ title: `${t("panel.billing.Billing")} - ${t("panel.Your Menuriom Panel")}` });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const selectedBill = ref({});
const openBillDetail = (bill) => {
    selectedBill.value = bill;
    panelStore.openPopUp("bill-details");
};

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

// getCurrentPlan -------------------------------------------------
const currentPlan = reactive({
    plan: { icon: "", name: "", translation: {} },
    branchLimit: "",
    staffLimit: "",
    daysRemaining: "",
    secondsPassed: "",
    price: "",
    period: "",
    branchCount: 0,
    staffCount: 0,
});
const lastBill = ref({});
const getCurrentPlan_results = await useLazyAsyncData(() => getCurrentPlan(route.params.brandID));
const loadingCurrentPlan = computed(() => getCurrentPlan_results.pending.value);

if (getCurrentPlan_results.error.value) handleErrors(getCurrentPlan_results.error.value);
watch(getCurrentPlan_results.error, (err) => handleErrors(err));

const handleCurrentPlan_results = (data) => {
    if (!data) return;
    currentPlan.plan = data._currentPlan.plan;
    currentPlan.branchLimit = data._currentPlan.branchLimit;
    currentPlan.staffLimit = data._currentPlan.staffLimit;
    currentPlan.daysRemaining = data._currentPlan.daysRemaining;
    currentPlan.secondsPassed = data._currentPlan.secondsPassed;
    currentPlan.price = data._currentPlan.price;
    currentPlan.period = data._currentPlan.period;
    lastBill.value = data._lastBill;
};
watch(getCurrentPlan_results.data, (val) => handleCurrentPlan_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getPurchasablePlans -------------------------------------------------
const priceType = ref("monthly");
const purchasablePlans = reactive({ plans: [] });
const getPurchasablePlans_results = await useLazyAsyncData(() => getPurchasablePlans(route.params.brandID));
const loadingPurchasablePlans = computed(() => getPurchasablePlans_results.pending.value);

if (getPurchasablePlans_results.error.value) handleErrors(getPurchasablePlans_results.error.value);
watch(getPurchasablePlans_results.error, (err) => handleErrors(err));

const handlePurchasablePlans_results = (data) => {
    if (!data) return;
    purchasablePlans.plans = data._plans;
    // purchasablePlans.plans = data._plans.filter((plan) => plan.monthlyPrice != 0 && plan.yearlyPrice != 0);
};
watch(getPurchasablePlans_results.data, (val) => handlePurchasablePlans_results(val), { immediate: process.server || nuxtApp.isHydrating });
// -------------------------------------------------

// getBills -------------------------------------------------
const noMoreBills = ref(false);
const lastBillID = ref("");
const pp = ref({ value: 25, name: "25" });
const bills = reactive({ list: [] });
const totalRecords = ref(0);
const getBillsList_results = await useLazyAsyncData(() => getBillHistoryList(route.params.brandID, bills.list, pp.value.value, lastBillID.value), {
    watch: [lastBillID],
});
const loadingBills = computed(() => getBillsList_results.pending.value);

if (getBillsList_results.error.value) handleErrors(getBillsList_results.error.value);
watch(getBillsList_results.error, (err) => handleErrors(err));

const handleBillsList_results = (data) => {
    if (!data) return;
    bills.list = data._records;
    totalRecords.value = data._total;
    noMoreBills.value = data._noMoreBills;
};
watch(getBillsList_results.data, (val) => handleBillsList_results(val), { immediate: process.server || nuxtApp.isHydrating });

const loadMore = () => {
    if (noMoreBills.value) return;
    const lastRecord = bills.list.at(-1);
    if (lastBillID.value === lastRecord._id) noMoreBills.value = true;
    lastBillID.value = lastRecord._id;
};
// -------------------------------------------------
</script>
