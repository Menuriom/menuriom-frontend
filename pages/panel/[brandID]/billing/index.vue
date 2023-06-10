<style scoped>
.money-box {
    max-width: 200px;
}

.plan-card-list {
    margin-top: -1rem;
    padding: 0 1rem;
    grid-template-rows: 0fr;
    transition: all 0.2s ease-out;
}
.plan-card:hover .plan-card-list {
    margin-top: -0.5rem;
    padding: 1rem;
    grid-template-rows: 1fr;
}
.plan-card:hover {
    z-index: 2;
}
</style>

<template>
    <div class="flex flex-col gap-4 md:gap-6 w-full">
        <nuxt-link to="#" class="relative flex flex-col w-full p-2 bg-black rounded-lg shadow-nr25 overflow-hidden" name="Banner">
            <span class="absolute end-1/2 -top-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute end-18 -bottom-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute start-1/4 -bottom-14 -rotate-45 -ms-10 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute start-1/4 -bottom-20 -rotate-12 gradient-re w-24 h-24 rounded-2xl"></span>
            <div class="relative flex flex-col items-center justify-between gap-2">
                <h5 class="hidden 2sm:flex gradient-text text-3xl font-black">Upgrade To Pro</h5>
            </div>
        </nuxt-link>

        <section class="flex flex-col gap-4 w-full" name="Billing Info">
            <header class="flex items-center gap-2">
                <img class="w-9" src="~/assets/images/panel-icons/money-bills-dark.png" alt="" />
                <h1 class="text-2xl/tight md:text-3xl/tight font-bold">{{ $t("panel.billing.Billing Info") }}</h1>
            </header>
            <div class="flex flex-wrap xl:flex-nowrap gap-4 w-full 2sm:p-4 2sm:bg-white rounded-lg 2sm:shadow-nr10">
                <div class="flex flex-col gap-4 w-full xl:max-w-xl shrink-0">
                    <div class="flex flex-col gap-4 p-4 w-full rounded-lg bg-pencil-tip text-white shadow-nr15" v-if="!loadingCurrentPlan">
                        <h3 class="flex items-center gap-4">
                            <b class="text-sm shrink-0">{{ $t("panel.billing.Current Plan Details") }}</b>
                            <span class="w-full h-0.5 bg-neutral-400 opacity-50"></span>
                        </h3>
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-2">
                                <img class="bg-dolphin p-2 rounded-md w-16" :src="currentPlan.plan.icon" />
                                <h2 class="gradient-text text-3xl sm:text-4xl/relaxed font-extrabold">
                                    {{ currentPlan.plan.translation?.[locale]?.name || currentPlan.plan.name }}
                                </h2>
                            </div>
                            <div class="flex items-center gap-1" v-if="currentPlan.daysRemaining">
                                <b>{{ currentPlan.daysRemaining }}</b>
                                <small>{{ $t("panel.billing.remaining") }}</small>
                            </div>
                        </div>
                        <p
                            class="text-xs text-neutral-200"
                            v-html="
                                $t('panel.billing.planLimitDesc', {
                                    branchLimit: `<b class='text-white'>${currentPlan.branchLimit}</b>`,
                                    staffLimit: `<b class='text-white'>${currentPlan.staffLimit}</b>`,
                                })
                            "
                        />
                        <div class="flex items-baseline gap-2" v-if="currentPlan.price > 0">
                            <div class="flex flex-wrap items-end gap-1">
                                <b class="text-2xl/none text-emerald-200">
                                    {{ Intl.NumberFormat(locale).format(currentPlan.price / 1000) }}<span class="text-sm font-normal">,000</span>
                                </b>
                                <b class="f-inter text-sm font-extralight">{{ $t("pricing.Toman") }}</b>
                            </div>
                            <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
                            <b>{{ currentPlan.period == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</b>
                        </div>
                        <div class="flex items-baseline gap-2" v-else>
                            <b class="text-2xl/none text-emerald-200"> {{ $t("pricing.Free") }} </b>
                            <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
                            <b>{{ $t("pricing.Always") }}</b>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 p-4 w-full rounded-lg bg-pencil-tip text-white shadow-nr15" v-else>
                        <h3 class="flex items-center gap-4">
                            <b class="text-sm shrink-0">{{ $t("panel.billing.Current Plan Details") }}</b>
                            <span class="w-full h-0.5 bg-neutral-400 opacity-50"></span>
                        </h3>
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-2">
                                <span class="skeleton rounded-md w-16 h-16"></span>
                                <h2 class="skeleton rounded-md w-40 h-8"></h2>
                            </div>
                            <span class="skeleton rounded-md w-24 h-4"></span>
                        </div>
                        <p class="skeleton rounded-md w-96 h-4" />
                        <div class="flex items-baseline gap-2">
                            <b class="skeleton w-20 h-6 rounded text-2xl/none text-emerald-200"></b>
                            <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
                            <b class="skeleton w-20 h-6 rounded"></b>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-4 w-full">
                        <button
                            class="btn flex items-center justify-center gap-3 p-3 border-2 border-dolphin text-sm rounded-lg grow"
                            @click="panelStore.openPopUp('change-plan-dialog')"
                            v-if="checkPermissions(['main-panel.billing.change-plan'], brand)"
                        >
                            <Icon class="w-5 h-5 bg-pencil-tip shrink-0" name="arrow-up-big-small.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.billing.Upgrade-Downgrade Plan") }}
                        </button>
                        <button
                            class="btn flex items-center justify-center gap-3 p-3 border-2 border-dolphin text-sm rounded-lg grow"
                            @click="panelStore.openPopUp('change-plan-dialog')"
                            v-if="checkPermissions(['main-panel.billing.change-plan'], brand)"
                        >
                            <Icon class="w-5 h-5 bg-pencil-tip shrink-0" name="calendar-clock.svg" folder="icons/light" size="20px" />
                            {{ $t("panel.billing.Change Payment Period") }}
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-2 p-4 w-full border-2 bg-white rounded-lg shadow-nr5 grow" v-if="bills.list.length">
                    <div class="flex flex-wrap items-center gap-4 w-full">
                        <h3 class="flex items-center gap-4 text-sm font-bold shrink-0">Your Last Bill</h3>
                        <span class="h-0.5 bg-zinc-400 opacity-30 grow"></span>
                        <div class="flex items-center gap-1 text-sm">
                            <span>Due Date:</span>
                            <b>31/02/1401</b>
                        </div>
                    </div>
                    <small>Bill Number <b class="text-sm">#4282521</b></small>
                    <p class="text-sm">For renewal of monthly standard plan from 01/02/1401 till 01/03/1401</p>
                    <div class="flex flex-wrap items-center justify-between gap-4 p-3 rounded-md bg-neutral-100 grow">
                        <div class="flex flex-col items-start">
                            <h4 class="text-sm">Plan</h4>
                            <b class="">Standard Plan</b>
                        </div>
                        <div class="flex items-baseline gap-1">
                            <span class="text-3xl/none text-lime-700">324,000,000</span>
                            <small class="text-sm">Toman</small>
                        </div>
                    </div>
                    <h3 class="flex items-center gap-4">
                        <b class="text-sm shrink-0">Payment Details</b>
                        <span class="w-full h-0.5 bg-zinc-400 opacity-30"></span>
                    </h3>
                    <div class="flex flex-wrap items-center justify-between gap-4 w-full">
                        <span class="p-2 text-sm rounded-md bg-red-800 bg-opacity-25 text-rose-800">Not Paid</span>
                        <div>
                            <button class="btn w-max p-3 px-6 text-sm bg-violet text-white rounded-lg">Renew Subscription</button>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 p-1 sm:p-4 w-full border-2 bg-white rounded-lg shadow-nr5 grow" v-else>
                    <div class="flex flex-wrap items-start justify-center gap-4 w-full">
                        <div class="flex flex-wrap items-center gap-4 p-2 md:p-0 grow">
                            <h3 class="flex items-center gap-4 text-sm font-bold shrink-0">{{ $t("panel.billing.Upgrade Your Plan Now") }}</h3>
                            <span class="h-0.5 bg-zinc-400 opacity-30 grow"></span>
                        </div>
                        <div class="relative flex items-center gap-2 p-1 py-2 rounded-md bg-neutral-100 shadow-inner">
                            <span
                                class="absolute w-32 h-7 shadow-md bg-white rounded-md transition-all"
                                :class="[priceType == 'monthly' ? 'start-1' : 'start-32 ms-3']"
                            ></span>
                            <span class="relative flex items-center justify-center w-32 text-sm cursor-pointer" @click="priceType = 'monthly'">
                                {{ $t("pricing.Monthly") }}
                            </span>
                            <div class="relative flex items-center justify-center gap-1 w-32 text-sm cursor-pointer" @click="priceType = 'annual'">
                                <span>{{ $t("pricing.Annual") }}</span>
                                <small class="f-inter px-2 rounded-full whitespace-nowrap text-[11px] bg-pencil-tip text-purple-200"> 10% Off </small>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-start gap-4 grow">
                        <div
                            class="plan-card relative flex flex-col gap-4 w-full md:w-80 p-4 rounded-xl bg-pencil-tip shadow-nr15 grow"
                            v-for="(plan, i) in purchasablePlans.plans.filter((plan) => plan.monthlyPrice != 0 && plan.yearlyPrice != 0)"
                            :key="i"
                        >
                            <div class="flex items-center gap-2">
                                <img class="w-10" :src="plan.icon" :alt="plan.name" />
                                <h3 class="text-2xl text-white font-bold">{{ plan.translation?.[locale]?.name || plan.name }}</h3>
                            </div>
                            <p class="text-sm text-white opacity-90 h-10">{{ plan.translation?.[locale]?.desc || plan.desc }}</p>
                            <div
                                class="flex flex-wrap items-center justify-between gap-4 p-3 bg-neutral-800 text-white rounded-lg"
                                v-if="plan.monthlyPrice > 0"
                            >
                                <div class="flex flex-wrap items-baseline gap-1">
                                    <b class="f-inter text-emerald-100 text-4xl">
                                        {{ Intl.NumberFormat(locale).format((priceType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice) / 1000)
                                        }}<span class="text-xs">,000</span>
                                    </b>
                                    <b class="f-inter text-baby-blue">{{ $t("pricing.Toman") }}</b>
                                    <small class="">/ {{ priceType == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</small>
                                </div>
                                <button
                                    class="btn gradient w-full md:w-max p-4 py-2 text-white rounded-md shrink-0"
                                    @click="panelStore.openPopUp('change-plan-dialog')"
                                    v-if="checkPermissions(['main-panel.billing.change-plan'], brand)"
                                >
                                    {{ $t("panel.billing.Purchase") }}
                                </button>
                            </div>
                            <div class="plan-card-list grid md:absolute start-0 top-full w-full bg-dolphin rounded-b-xl shadow-nr35">
                                <ul class="flex flex-col gap-4 w-full overflow-hidden">
                                    <li class="flex items-center gap-2">
                                        <Icon class="relative w-4 h-4 bg-baby-blue" name="plus.svg" folder="icons" size="16px" />
                                        <small class="opacity-90 text-sky-200 text-sm">{{ $t("pricing.Everything on previous plan") }}</small>
                                    </li>
                                    <li class="flex items-center gap-2" v-for="(feature, j) in plan.listings" :key="j">
                                        <Icon class="relative w-4 h-4 bg-baby-blue" name="check.svg" folder="icons" size="16px" />
                                        <small class="opacity-90 text-white text-sm">{{ plan.translation?.[locale]?.listings[j] || feature }}</small>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-4 w-full" name="Billing History">
            <header class="flex items-center gap-2">
                <img class="w-9" src="~/assets/images/panel-icons/money-bill-transfer-dark.png" alt="" />
                <h1 class="text-2xl/tight md:text-3xl/tight font-bold">{{ $t("panel.billing.Billing History") }}</h1>
            </header>
            <!-- TODO : add date range for billing history -->
            <hr class="w-full border-gray-300 opacity-50" />
            <ul class="flex flex-col gap-4" v-if="bills.list.length">
                <li
                    class="flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-nr10"
                    v-for="(bill, i) in bills.list"
                    :key="i"
                >
                    <div class="flex flex-col gap-2">
                        <small>Bill Number <b class="text-sm">#4282521</b></small>
                        <div class="flex flex-col gap-1">
                            <p class="text-sm w-full max-w-sm">For renewal of the monthly standard plan</p>
                            <p class="text-sm w-full max-w-sm">
                                From <span class="p-1.5 py-0.5 bg-neutral-100 rounded-md shadow-inner">01/02/1401</span> Till
                                <span class="p-1.5 py-0.5 bg-neutral-100 rounded-md shadow-inner">01/03/1401</span>
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-1 text-sm">
                            <span class="w-20">Issue Date:</span>
                            <b class="w-16">31/02/1401</b>
                        </div>
                        <div class="flex items-center gap-1 text-sm">
                            <span class="w-20">Due Date:</span>
                            <b class="w-16">31/12/1401</b>
                        </div>
                    </div>
                    <div class="flex items-center justify-center w-40">
                        <div class="flex items-center gap-2 p-2 rounded-lg border bg-neutral-800 shrink-0">
                            <img class="w-6" src="/pricing/standard-g.png" alt="basic" />
                            <span class="gradient-text text-sm font-bold">Standard Plan</span>
                        </div>
                    </div>
                    <div class="money-box flex items-baseline gap-1 w-full">
                        <span class="text-xl text-lime-700">324,000,000</span>
                        <small class="text-sm">Toman</small>
                    </div>
                    <span class="w-20 text-center p-2 py-1 text-sm rounded-md bg-red-800 bg-opacity-25 text-rose-800 shrink-0">Not Paid</span>
                    <button class="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-50 border shrink-0" @click="toggleMenu()">
                        <Icon class="w-5 h-5 bg-black rotate-90" name="dots.svg" folder="icons" size="4px" />
                    </button>
                </li>
            </ul>
            <div class="flex flex-col items-center gap-4 w-full my-10" v-if="!bills.list.length">
                <img class="w-40" src="~/assets/images/invoice.webp" alt="invoice" />
                <p class="text-sm opacity-50">{{ $t("panel.billing.You have no bills yet") }}</p>
            </div>
        </section>

        <Teleport to="body">
            <ChangePlanDialog :purchasablePlans="purchasablePlans.plans" :currentPlan="currentPlan" v-if="panelStore.popUpOpened === 'change-plan-dialog'" />
        </Teleport>
    </div>
</template>

<script setup>
const ChangePlanDialog = defineAsyncComponent(() => import("~/components/panel/dialogs/billing/ChangePlanDialog.vue"));
import Loading from "~/components/Loading.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const title = computed(() => `${t("panel.billing.Billing")} - ${t("panel.Your Menuriom Panel")}`);
useHead({ title: title });

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const errorField = ref("");
const responseMessage = ref("");

const handleErrors = (err) => {
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
const bills = reactive({ list: [] });
// -------------------------------------------------
</script>
