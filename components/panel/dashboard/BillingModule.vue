<style scoped></style>

<template>
    <section class="relative flex flex-col gap-4 w-full max-w-sm p-6 rounded-3xl overflow-hidden isolate">
        <div class="absolute inset-0 -z-2 gradient opacity-75"></div>

        <header class="relative flex items-center gap-2 w-full">
            <h3 class="font-extrabold text-bgPrimary">{{ $t("panel.dashboard.Billing & Plans") }}</h3>
            <span class="w-0.5 h-0.5 bg-bgAccent opacity-25 grow"></span>
            <nuxt-link class="btn text-fgPrimary text-sm underline underline-offset-2" to="">{{ $t("panel.dashboard.View Last Bill") }}</nuxt-link>
        </header>

        <nuxt-link class="btn relative flex flex-col items-center w-full p-3 py-4 bg-black rounded-2xl shadow-mr25 overflow-hidden" to="#">
            <span class="absolute end-1/2 -top-20 rotate-12 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute end-6 -top-24 -rotate-[20deg] gradient-re w-28 h-28 rounded-2xl opacity-75"></span>
            <span class="absolute start-3/4 -bottom-20 -rotate-45 -ms-10 gradient-re w-24 h-24 rounded-2xl blur-sm opacity-75"></span>
            <span class="absolute -end-4 -bottom-20 -rotate-12 gradient-re w-28 h-28 rounded-2xl"></span>

            <div class="relative flex items-center gap-2 w-full" v-if="!userIsPro">
                <NuxtImg class="w-16 -rotate-6 -ms-6" src="/img/cafe.png" width="64px" />
                <div class="relative flex flex-col items-start bg-bgSecondary bg-opacity-40 p-2 rounded-lg">
                    <small class="flex text-sm opacity-75">{{ $t("panel.billing.Remove The Limitations") }}</small>
                    <h5 class="hidden 2sm:flex text-fgPrimary text-2xl/normal font-black -mt-1">{{ $t("panel.billing.Upgrade To Pro") }}</h5>
                </div>
            </div>

            <div class="relative flex items-center" v-else>
                <NuxtImg class="w-16 -rotate-6 -ms-10" src="/img/bill.png" width="64px" />
                <h5 class="hidden 2sm:flex text-fgPrimary bg-bgSecondary bg-opacity-40 p-2 rounded-lg text-xl/normal font-extrabold">
                    {{ $t("panel.dashboard.View Your Billing History") }}
                </h5>
            </div>
        </nuxt-link>

        <div class="relative flex flex-col gap-2 w-full p-4 rounded-2xl bg-bgAccent shadow-mr25">
            <div class="flex flex-wrap items-start justify-between gap-2 w-full">
                <h4 class="font-bold text-sm">{{ $t("panel.dashboard.Your Current Plan") }}</h4>
                <div class="flex items-center gap-1 bg-bgPrimary p-1 px-2 rounded-lg text-sm shadow-mr15">
                    <b class="text-primary">{{ currentPlan.daysRemaining }}</b>
                    <small>{{ currentPlan.secondsPassed > 0 ? $t("panel.billing.remaining") : $t("panel.billing.passed") }}</small>
                </div>
            </div>
            <div class="flex items-center gap-2 w-full">
                <img class="bg-fgPrimary bg-opacity-10 p-2 rounded-xl w-16 aspect-square" :src="currentPlan.plan?.icon" width="64px" height="64px" />
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex items-baseline gap-2">
                        <h2 class="gradient-text text-xl/normal sm:text-2xl/relaxed font-extrabold">
                            {{ currentPlan.plan?.translation?.[locale]?.name || currentPlan.plan?.name }}
                        </h2>
                        <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
                        <b>{{ currentPlan.period == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</b>
                    </div>
                    <p
                        class="text-xs opacity-75"
                        v-html="
                            $t('panel.billing.planLimitDesc', {
                                branchLimit: `<b class='text-secondary'>${currentPlan.branchLimit}</b>`,
                                staffLimit: `<b class='text-secondary'>${currentPlan.staffLimit}</b>`,
                            })
                        "
                    />
                </div>
            </div>
        </div>
        <nuxt-link class="relative flex items-center justify-center gap-2 w-full p-2.5 bg-fgPrimary text-bgPrimary rounded-xl shadow-mr35" to="">
            <Icon class="w-7 h-7 gradient" name="money-bills.svg" folder="icons/duo" size="28px" />
            <b> {{ $t("panel.dashboard.Renew Your Plan") }} </b>
        </nuxt-link>
    </section>
</template>

<script setup>
const { locale } = useI18n();

const userIsPro = ref(false);
const currentPlan = ref({});
</script>
