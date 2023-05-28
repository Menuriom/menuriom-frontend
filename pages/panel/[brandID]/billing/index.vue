<style scoped>
.money-box {
    max-width: 200px;
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
                    <div class="flex flex-col gap-4 p-4 w-full rounded-lg bg-pencil-tip text-white shadow-nr15">
                        <h3 class="flex items-center gap-4">
                            <b class="text-sm shrink-0">Current Plan Details</b>
                            <span class="w-full h-0.5 bg-neutral-400 opacity-50"></span>
                        </h3>
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-2">
                                <img class="bg-dolphin p-2 rounded-md w-16" src="/pricing/basic-g.png" alt="basic" />
                                <h2 class="gradient-text text-4xl/none font-extrabold">Basic Plan</h2>
                            </div>
                            <div class="flex items-center gap-1">
                                <b>21</b>
                                <small>days remaining</small>
                            </div>
                        </div>
                        <p class="text-xs text-neutral-200">
                            up to <b class="text-white">20</b> branches, and <b class="text-white">15</b> staff members per branch
                        </p>
                        <div class="flex items-baseline gap-2">
                            <div class="flex flex-wrap items-end gap-1">
                                <b class="text-2xl/none text-emerald-200">30<span class="text-sm font-normal">,000</span></b>
                                <small class="text-sm font-thin">Toman</small>
                            </div>
                            <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
                            <b class="">Monthly</b>
                        </div>
                    </div>
                    <div class="flex flex-wrap items-center gap-4 w-full">
                        <button class="btn flex items-center justify-center gap-3 p-3 border-2 border-dolphin text-sm rounded-lg grow">
                            <Icon class="w-5 h-5 bg-pencil-tip shrink-0" name="arrow-up-big-small.svg" folder="icons/light" size="20px" />
                            Upgrade/Downgrade Plan
                        </button>
                        <button class="btn flex items-center justify-center gap-3 p-3 border-2 border-dolphin text-sm rounded-lg grow">
                            <Icon class="w-5 h-5 bg-pencil-tip shrink-0" name="calendar-clock.svg" folder="icons/light" size="20px" />
                            Change Payment Period
                        </button>
                    </div>
                </div>
                <div class="flex flex-col gap-2 p-4 w-full border-2 bg-white rounded-lg shadow-nr5 grow">
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
            </div>
        </section>

        <section class="flex flex-col gap-4 w-full" name="Billing History">
            <header class="flex items-center gap-2">
                <img class="w-9" src="~/assets/images/panel-icons/money-bill-transfer-dark.png" alt="" />
                <h1 class="text-2xl/tight md:text-3xl/tight font-bold">{{ $t("panel.billing.Billing History") }}</h1>
            </header>
            <!-- TODO : add date range for billing history -->
            <hr class="w-full border-gray-300 opacity-50" />
            <ul class="flex flex-col gap-4">
                <li class="flex flex-wrap xl:flex-nowrap items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-nr10" v-for="i in 10">
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
        </section>

        <!-- <Teleport to="body"> </Teleport> -->
    </div>
</template>

<script setup>
import Dialog from "~/components/panel/Dialog.vue";
import SlideMenu from "~/components/panel/SlideMenu.vue";
import Loading from "~/components/Loading.vue";
import axios from "axios";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { locale, t } = useI18n();
const route = useRoute();
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
const currentPlan = reactive({ plan: { icon: "", name: "" }, branchLimit: "", staffLimit: "", daysRemaining: "", price: "", period: "" });
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
    currentPlan.price = data._currentPlan.price;
    currentPlan.period = data._currentPlan.period;
};
watch(getCurrentPlan_results.data, (val) => handleCurrentPlan_results(val), { immediate: process.server || useNuxtApp().isHydrating });
// -------------------------------------------------
</script>
