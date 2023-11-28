<style scoped></style>

<template>
    <section class="flex flex-wrap sm:flex-nowrap gap-4 w-full max-w-md">
        <ul class="flex flex-col items-center justify-center gap-2 w-full p-4 rounded-3xl bg-bgSecondary bg-opacity-75 shadow-mr35">
            <li class="flex items-center gap-2 w-full">
                <h3 class="text-sm">{{ $t("panel.dashboard.Branches") }}</h3>
                <span class="w-0.5 h-0.5 grow bg-bgPrimary bg-opacity-50"></span>
                <b class="text-lg text-primary" v-if="!getCounts.pending.value">{{ Intl.NumberFormat(locale).format(counts.branches || "0") }}</b>
                <Loading v-else />
            </li>
            <li class="flex items-center gap-2 w-full">
                <h3 class="text-sm">{{ $t("panel.dashboard.Menu Items") }}</h3>
                <span class="w-0.5 h-0.5 grow bg-bgPrimary bg-opacity-50"></span>
                <b class="text-lg text-primary" v-if="!getCounts.pending.value">{{ Intl.NumberFormat(locale).format(counts.menuItems || "0") }}</b>
                <Loading v-else />
            </li>
            <li class="flex items-center gap-2 w-full">
                <h3 class="text-sm">{{ $t("panel.dashboard.Staff Members") }}</h3>
                <span class="w-0.5 h-0.5 grow bg-bgPrimary bg-opacity-50"></span>
                <b class="text-lg text-primary" v-if="!getCounts.pending.value">{{ Intl.NumberFormat(locale).format(counts.staff || "0") }}</b>
                <Loading v-else />
            </li>
        </ul>
        <div class="flex flex-col gap-4 w-full p-4 rounded-3xl bg-bgSecondary bg-opacity-75 shadow-mr35">
            <div class="flex items-center justify-between gap-2 grow">
                <h3 class="text-sm font-bold">{{ $t("panel.dashboard.Signed up users") }}</h3>
                <small class="text-emerald-300">+0%</small>
            </div>
            <ul class="flex items-center gap-2">
                <li class="flex flex-col items-center w-full p-2 rounded-2xl bg-bgPrimary shadow-mr25">
                    <b class="text-lg text-primary">0</b>
                    <span class="text-xs">{{ $t("panel.dashboard.This Month") }}</span>
                </li>
                <li class="flex flex-col items-center w-full p-2 rounded-2xl bg-bgPrimary shadow-mr25">
                    <b class="text-lg text-primary">0</b>
                    <span class="text-xs">{{ $t("panel.dashboard.Last Month") }}</span>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
const { locale } = useI18n();
const route = useRoute();

// getCounts -------------------------------------------------
const counts = ref({});
const getCounts = await useFetch(`/api/v1/panel/analytics/basic-counts`, { lazy: process.client, headers: { brand: route.params.brandID } });
if (getCounts.error.value && getCounts.error.value.statusCode >= 500 && process.server) {
    console.error({ err: getCounts.error.value });
}

if (getCounts.data.value) counts.value = getCounts.data.value || {};
watch(getCounts.data, (val) => (counts.value = val || {}));
// -------------------------------------------------
</script>
