<style scoped></style>

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
                <h1 class="text-4xl/tight font-bold">{{ $t("panel.billing.Billing Info") }}</h1>
            </header>
            <!-- <hr class="w-full border-gray-300 opacity-50" /> -->
            <div class="flex flex-wrap lg:flex-nowrap gap-4 w-full 2sm:p-4 2sm:bg-white rounded-lg 2sm:shadow-nr10">
                <div class="flex flex-col gap-4 w-full lg:max-w-lg xl:max-w-xl shrink-0">
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
                    <div class="flex flex-wrap items-center justify-between gap-4 p-3 rounded-md bg-neutral-100">
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
                            <button class="btn w-max p-3 px-6 bg-violet text-white rounded-lg">Renew Plan</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-4 w-full" name="Billing History">
            <header class="flex items-center gap-2">
                <img class="w-9" src="~/assets/images/panel-icons/money-bill-transfer-dark.png" alt="" />
                <h1 class="text-4xl/tight font-bold">{{ $t("panel.billing.Billing History") }}</h1>
            </header>
            <hr class="w-full border-gray-300 opacity-50" />
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
</script>
