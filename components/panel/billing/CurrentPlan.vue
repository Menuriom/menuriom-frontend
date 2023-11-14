<style scoped></style>

<template>
    <div class="flex items-center justify-center p-2 w-full rounded-3xl gradient shadow-nr15" v-if="!loadingCurrentPlan">
        <div class="flex flex-col gap-4 p-5 w-full rounded-2xl bg-bgSecondary bg-opacity-80 shadow-nr10">
            <h3 class="flex items-center gap-4">
                <b class="text-sm shrink-0">{{ $t("panel.billing.Current Plan Details") }}</b>
                <span class="w-full h-0.5 bg-fgPrimary opacity-30"></span>
            </h3>
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <img class="bg-fgPrimary bg-opacity-10 p-2 rounded-xl w-16" :src="currentPlan.plan.icon" />
                    <h2 class="gradient-text text-3xl sm:text-4xl/relaxed font-extrabold">
                        {{ currentPlan.plan.translation?.[locale]?.name || currentPlan.plan.name }}
                    </h2>
                </div>
                <div class="flex items-center gap-1 bg-bgAccent p-2 rounded-xl shadow-mr15" v-if="currentPlan.daysRemaining">
                    <b class="text-primary">{{ currentPlan.daysRemaining }}</b>
                    <small>{{ currentPlan.secondsPassed > 0 ? $t("panel.billing.remaining") : $t("panel.billing.passed") }}</small>
                </div>
            </div>
            <p
                class="w-max max-w-full text-xs border border-fgPrimary border-opacity-10 p-1 px-3 rounded-lg shadow-mr35"
                v-html="
                    $t('panel.billing.planLimitDesc', {
                        branchLimit: `<b class='text-secondary'>${currentPlan.branchLimit}</b>`,
                        staffLimit: `<b class='text-secondary'>${currentPlan.staffLimit}</b>`,
                    })
                "
            />
            <div class="flex items-baseline gap-2" v-if="currentPlan.price > 0">
                <div class="flex flex-wrap items-end gap-1">
                    <b class="text-2xl/none text-secondary">
                        {{ Intl.NumberFormat(locale).format(currentPlan.price) }}
                        <!-- <span class="text-sm font-normal">,000</span> -->
                    </b>
                    <b class="f-inter text-sm font-extralight">{{ $t("pricing.Toman") }}</b>
                </div>
                <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
                <b>{{ currentPlan.period == "monthly" ? $t("pricing.Monthly") : $t("pricing.Annual") }}</b>
            </div>
            <div class="flex items-baseline gap-2" v-else>
                <b class="text-2xl/none text-secondary font-black"> {{ $t("pricing.Free") }} </b>
                <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
                <b>{{ $t("pricing.Always") }}</b>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-4 p-4 w-full rounded-2xl bg-bgSecondary bg-opacity-50 shadow-nr15" v-else>
        <h3 class="flex items-center gap-4">
            <b class="text-sm shrink-0">{{ $t("panel.billing.Current Plan Details") }}</b>
            <span class="w-full h-0.5 bg-fgPrimary opacity-50"></span>
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
            <b class="skeleton w-20 h-6 rounded text-2xl/none text-secondary"></b>
            <span class="w-6 h-0.5 rounded-full bg-neutral-50"></span>
            <b class="skeleton w-20 h-6 rounded"></b>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    loadingCurrentPlan: { type: Boolean },
    currentPlan: { type: Object },
});

const { locale } = useI18n();
</script>
