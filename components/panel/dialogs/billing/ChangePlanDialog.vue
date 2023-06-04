<style scoped></style>

<template>
    <Dialog name="change-plan-dialog" boxClass="max-w-xl">
        <template #title>
            <div class="flex items-center gap-2 w-full">
                <img class="w-8" src="~/assets/images/panel-icons/money-check-dollar-pen-light.png" alt="" />
                <h3 class="text-2xl font-bold text-center">{{ $t("panel.billing.Upgrade Or Downgrade Plan") }}</h3>
            </div>
        </template>
        <small class="-mt-1 text-xs opacity-75"> {{ $t("panel.billing.You can change your plan type or payment period") }} </small>
        <div class="flex flex-col items-center gap-4 md:w-screen max-w-lg mt-4" ref="form">
            <div class="relative flex items-center gap-2 w-full max-w-max p-1 py-2 rounded-md bg-neutral-300 text-black shadow-inner">
                <span
                    class="absolute w-32 h-7 shadow-md bg-white rounded-md transition-all"
                    :class="[paymentPeriod == 'monthly' ? 'start-1' : 'start-32 ms-3']"
                ></span>
                <span class="relative flex items-center justify-center w-32 text-sm cursor-pointer" @click="paymentPeriod = 'monthly'">
                    {{ $t("pricing.Monthly") }}
                </span>
                <div class="relative flex items-center justify-center gap-1 w-32 text-sm cursor-pointer" @click="paymentPeriod = 'yearly'">
                    <span>{{ $t("pricing.Annual") }}</span>
                    <small class="f-inter px-2 rounded-full whitespace-nowrap text-[11px] bg-pencil-tip text-purple-200"> 10% Off </small>
                </div>
            </div>

            <div class="flex flex-wrap items-center gap-2 w-full">
                <h3 class="flex items-center gap-4 text-sm font-bold shrink-0">{{ $t("panel.billing.Plans") }}</h3>
                <span class="h-0.5 bg-zinc-400 opacity-30 grow"></span>
            </div>
            <ul class="flex flex-col gap-2 w-full">
                <li
                    class="flex items-center justify-center w-full p-0.5 rounded-xl shadow-nr15 cursor-pointer"
                    :class="[plan._id === selectedPlan._id ? 'gradient' : 'bg-neutral-600']"
                    v-for="(plan, i) in purchasablePlans"
                    :key="i"
                    @click="changeSelectedPlan(plan._id)"
                >
                    <div class="flex items-center gap-4 p-4 bg-neutral-800 rounded-xl w-full">
                        <img class="bg-dolphin p-2 rounded-md w-14" :src="plan.icon" :alt="plan.name" />
                        <div class="flex flex-col justify-center gap-1">
                            <div class="flex flex-wrap items-center gap-2">
                                <h3
                                    class="text-xl max-w-max"
                                    :class="[plan._id === selectedPlan._id ? 'gradient-text font-extrabold' : 'text-white font-bold']"
                                >
                                    {{ plan.translation?.[locale]?.name || plan.name }}
                                </h3>
                                <small
                                    class="px-2 p-0.5 rounded-md border-2 border-emerald-100 border-opacity-50 text-emerald-100 text-xs"
                                    v-if="currentPlan.plan._id === plan._id"
                                >
                                    {{ $t("panel.billing.Current Active Plan") }}
                                </small>
                            </div>
                            <p class="text-xs text-white opacity-75">{{ plan.translation?.[locale]?.desc || plan.desc }}</p>
                        </div>
                        <span
                            class="flex items-center justify-center w-5 h-5 ms-auto border-2 border-baby-blue rounded-full shrink-0"
                            :class="[plan._id === selectedPlan._id ? 'bg-baby-blue border-baby-blue' : 'border-neutral-500']"
                        >
                            <Icon class="w-5 h-5 bg-neutral-800" name="Check.svg" folder="icons/basil" size="24px" v-if="plan._id === selectedPlan._id" />
                        </span>
                    </div>
                </li>
            </ul>

            <div class="flex flex-wrap items-center gap-2 w-full">
                <h3 class="flex items-center gap-4 text-sm font-bold shrink-0">{{ $t("panel.billing.Payment Details") }}</h3>
                <span class="h-0.5 bg-zinc-400 opacity-30 grow"></span>
            </div>
            <div class="flex flex-col gap-4 p-4 w-full bg-neutral-800 rounded-xl" v-if="!nothingChanged">
                <div class="flex flex-wrap items-center justify-between gap-2 w-full">
                    <h3>{{ $t("panel.billing.Selected Plan") }}:</h3>
                    <div class="flex flex-wrap items-center gap-2">
                        <b class="gradient-text text-2xl">{{ selectedPlan.translation?.[locale]?.name || selectedPlan.name }}</b>
                        <span class="p-1 px-3 rounded-md bg-dolphin text-sm">
                            {{ paymentPeriod === "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}
                        </span>
                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-2 w-full" v-if="calculatedPrice > 0">
                    <h3>{{ $t("panel.billing.Payable Price") }}:</h3>
                    <div class="flex flex-wrap items-center gap-2">
                        <b class="text-emerald-100 text-2xl">{{ Intl.NumberFormat(locale).format(calculatedPrice) }}</b>
                        <span class="text-sm"> {{ $t("pricing.Toman") }} </span>
                    </div>
                </div>
                <hr class="w-full opacity-30" />
                <small class="flex items-start text-xs text-rose-300" v-if="errorField === '' && responseMessage !== ''">
                    <Icon class="icon w-4 h-4 bg-rose-300 flex-shrink-0" name="Info-circle.svg" folder="icons/basil" size="16px" />{{ responseMessage }}
                </small>
                <div class="flex flex-wrap items-center gap-2">
                    <SelectDropDown
                        class="w-40 shrink-0"
                        customPadding="px-3 py-4"
                        :formHtmlObject="form"
                        :options="gateway.list"
                        v-slot="{ option }"
                        v-model:selected-option="selectedGateway.option"
                        v-if="calculatedPrice > 0"
                    >
                        <div class="flex items-center gap-2 w-full">
                            <img class="w-6 object-contain" :src="option.icon" />
                            <span :value="option.value">{{ option.name }}</span>
                        </div>
                    </SelectDropDown>
                    <button class="btn p-3 rounded bg-violet grow" :class="{ 'opacity-75': loading }" :disabled="loading" @click="editingAccess()">
                        <span v-if="!loading && calculatedPrice > 0"> {{ $t("panel.billing.Head To Payment Gateway") }} </span>
                        <span v-else-if="!loading && calculatedPrice === 0"> {{ $t("panel.billing.Change Plan") }} </span>
                        <Loading v-else />
                    </button>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center gap-2 p-4 w-full h-48 bg-neutral-800 rounded-xl" v-else>
                <span class="text-violet">{{ $t("panel.billing.No Action Needed") }}</span>
                <small class="opacity-75">{{ $t("panel.billing.You have selected your current active plan and payment period") }}</small>
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import SelectDropDown from "~/components/form/SelectDropDown.vue";
import Loading from "~/components/Loading.vue";

const props = defineProps({
    purchasablePlans: Array,
    currentPlan: Object,
});

const { locale } = useI18n();

const form = ref(); // Dom Ref
const loading = ref(false);
const errorField = ref("");
const responseMessage = ref("");

const paymentPeriod = ref(props.currentPlan.period);
const selectedPlan = ref(props.currentPlan.plan);

const gateway = reactive({ list: [{ icon: "/icons/zarinpal.svg", name: "Zarinpal", value: "zarinpal" }] });
const selectedGateway = reactive({ option: { icon: "/icons/zarinpal.svg", name: "Zarinpal", value: "zarinpal" } });

const changeSelectedPlan = (newId) => {
    for (let i = 0; i < props.purchasablePlans.length; i++) {
        if (props.purchasablePlans[i]._id === newId) selectedPlan.value = props.purchasablePlans[i];
    }
};

const nothingChanged = ref(true);
const calculatedPrice = ref(0);
const calculatePrice = () => {
    nothingChanged.value = false;

    // TODO
    // NOTIC 1 : plan/period change can only be done for any user every 3 days
    // NOTIC 2 : any bill other than auto generated renewal bill will be deleted if they stay more than 20 minutes in pending stage
    // NOTIC 3 : show user the remaining time left to pay a bill inother word show how long can factor stay in pending stage

    // if current plan is same as selected plan with same period we hide price and gray out the action buttons
    if (props.currentPlan.plan._id === selectedPlan.value._id && props.currentPlan.period === paymentPeriod.value) {
        nothingChanged.value = true;
        return;
    }

    // BASIC to others
    // if current plan is basic plan then we calc the price base on selected plan and period
    const selectedPlanPrice = paymentPeriod.value === "monthly" ? selectedPlan.value.monthlyPrice : selectedPlan.value.yearlyPrice;
    if (props.currentPlan.price == 0) {
        calculatedPrice.value = selectedPlanPrice;
        return;
    }

    // let pricePerDay = Math.floor(props.currentPlan.period === "monthly" ? props.currentPlan.price / 30 : props.currentPlan.price / 365);
    let pricePerDay = paymentPeriod.value === "monthly" ? selectedPlanPrice / 30 : selectedPlanPrice / 365;

    let currentPlanIndex = 0;
    let selectedPlanIndex = 0;
    for (let i = 0; i < props.purchasablePlans.length; i++) {
        if (props.purchasablePlans[i]._id === props.currentPlan.plan._id) currentPlanIndex = i;
        if (props.purchasablePlans[i]._id === selectedPlan.value._id) selectedPlanIndex = i;
    }
    if (currentPlanIndex > selectedPlanIndex) {
        // downgrade
        // if its a downgrade then user must be worry about losing their stuff and if there is any renewal bill generated that bill must regenerate with lower plan
        pricePerDay = 0;
    } else if (currentPlanIndex < selectedPlanIndex) {
        // upgrade
        // if its an upgrade then user must pay the diffrence of the remaining-days price upgrade
        if (paymentPeriod.value === "monthly") {
            pricePerDay = Math.floor((selectedPlan.value.monthlyPrice - props.purchasablePlans[currentPlanIndex].monthlyPrice) / 30);
        }
        if (paymentPeriod.value === "yearly") {
            pricePerDay = Math.floor((selectedPlan.value.yearlyPrice - props.purchasablePlans[currentPlanIndex].yearlyPrice) / 365);
        }
    } else {
        // no change to plan
    }

    const remainingDaysFromCurrentPlan = Math.floor(Number(props.currentPlan.secondsPassed) / (3600 * 24));
    let payingForHowManyDays = remainingDaysFromCurrentPlan;

    // monthly to annual
    if (props.currentPlan.period === "monthly" && paymentPeriod.value === "yearly") {
        // monthly to annual : user must pay the full year price to make it happen
        payingForHowManyDays = 365;
    }
    // annual to monthly
    if (props.currentPlan.period === "yearly" && paymentPeriod.value === "monthly") {
        // annual to monthly : if less than month remains then user must pay full month (on successful payment if there is a renewal bill then that bill is obsolete)
        if (payingForHowManyDays < 30) payingForHowManyDays = 30;
    }

    const totalPrice = pricePerDay * payingForHowManyDays;
    console.log({
        secondsPassed: props.currentPlan.secondsPassed,
        pricePerDay,
        payingForHowManyDays,
        calculatedPrice: calculatedPrice.value,
    });
    calculatedPrice.value = Math.floor(totalPrice);
};

watch([paymentPeriod, selectedPlan], ([newPaymentPeriod, newSelectedPlan]) => calculatePrice());

// basic monthly -> basic yearly = dont allow
// basic monthly -> standard monthly = pays full price of one month
// basic monthly -> standard yearly = pays full price of one year
// basic monthly -> pro monthly = pays full price of one month
// basic monthly -> pro yearly = pays full price of one year

// basic yearly -> basic monthly = dont allow
// basic yearly -> standard monthly = dont allow
// basic yearly -> standard yearly = dont allow
// basic yearly -> pro monthly = dont allow
// basic yearly -> pro yearly = dont allow

// standard monthly -> basic monthly = user worries about their stuff
// standard monthly -> basic yearly = user worries about their stuff && period will be monthly
// standard monthly -> standard yearly = user pays (365 - remaining days) * price per day calulated by yearly price (1)
// standard monthly -> pro monthly = user pays (proMonthlyPrice - standardMonthlyPrice) * remainingDays (2)
// standard monthly -> pro yearly = user pays (1) + (2)

// standard yearly -> basic monthly = user worries about their stuff
// standard yearly -> basic yearly = user worries about their stuff && period will be monthly
// standard yearly -> standard monthly = user must pay full price of one month
// standard yearly -> pro monthly = if remainingDays is more than 30 days, no payment needed else user must pay full month
// standard yearly -> pro yearly = user pays (proYearlyPrice - standardYearlyPrice) * remainingDays

// pro monthly -> basic monthly
// pro monthly -> basic yearly
// pro monthly -> standard monthly
// pro monthly -> standard yearly
// pro monthly -> pro yearly

// pro yearly -> basic monthly
// pro yearly -> basic yearly
// pro yearly -> standard monthly
// pro yearly -> standard yearly
// pro yearly -> pro monthly
</script>


