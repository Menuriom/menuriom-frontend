<style scoped></style>

<template>
    <section class="flex flex-col gap-4 w-full max-w-xl lg:max-w-md p-4 md:p-6 bg-bgAccent rounded-3xl">
        <header class="flex items-center gap-2 w-full">
            <h3 class="font-extrabold text-fgPrimary">{{ $t("panel.dashboard.QR Code Scans") }}</h3>
            <span class="w-0.5 h-0.5 bg-bgSecondary opacity-50 grow"></span>
            <nuxt-link class="btn text-secondary text-sm underline underline-offset-2" :to="localePath(`/panel/${panelStore.selectedBrandId}/menu/qr-code`)">
                {{ $t("panel.dashboard.Edit QR Code") }}
            </nuxt-link>
        </header>

        <div class="flex flex-col items-start gap-2 w-full" v-if="checkLimitations([['analytics', true]], brand)">
            <ul class="flex items-center gap-1 shrink-0">
                <li
                    class="text-xxs py-1 px-2 rounded-lg bg-opacity-20 border border-bgSecondary cursor-pointer"
                    :class="{ 'px-2 bg-fgPrimary': period == 'monthly' }"
                    @click="changePeriod('monthly')"
                >
                    {{ $t("panel.dashboard.Monthly") }}
                </li>
                <li
                    class="text-xxs py-1 px-2 rounded-lg bg-opacity-20 border border-bgSecondary cursor-pointer"
                    :class="{ 'px-2 bg-fgPrimary': period == 'daily' }"
                    @click="changePeriod('daily')"
                >
                    {{ $t("panel.dashboard.Daily") }}
                </li>
            </ul>
            <div class="w-full h-44 p-2 rounded-2xl border border-bgSecondary shadow-mr25 grow">
                <!-- <Line :data="chartData" :options="chartOptions" /> -->
                <canvas class="w-full h-full" ref="chartCanvas"></canvas>
            </div>
        </div>
        <nuxt-link
            class="relative w-full flex items-center justify-center p-1 rounded-2xl border border-bgSecondary shadow-mr25 group grow"
            :to="localePath(`/panel/${panelStore.selectedBrandId}/billing`)"
            v-else
        >
            <NuxtImg class="w-full object-contain blur-sm group-hover:blur transition-all" src="/img/chart-short.png" />
            <span class="absolute w-full max-w-xs p-3 px-4 rounded-xl bg-bgPrimary bg-opacity-60 text-sm text-center shadow-mr25">
                {{ $t("panel.dashboard.Upgrade your plan to standard to view this chart") }}
            </span>
        </nuxt-link>

        <div class="flex flex-wrap gap-2 w-full grow">
            <div class="flex flex-col gap-4 grow p-3 rounded-2xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <div class="flex items-center justify-between gap-2 w-full">
                    <h3 class="text-sm">{{ $t("panel.dashboard.Unique Scans") }}</h3>
                    <small :class="[scanData.unqiueGrowth >= 0 ? 'text-emerald-300' : 'text-rose-300']" dir="ltr">
                        {{ scanData.unqiueGrowth >= 0 ? "+" : "" }}{{ scanData.unqiueGrowth || 0 }}%
                    </small>
                </div>
                <ul class="flex items-center gap-2 w-full">
                    <li class="flex flex-col items-center w-full p-2.5 rounded-2xl bg-bgPrimary shadow-mr25">
                        <b class="text-lg/none text-primary">{{ scanData.thisMonthUniqueCount }}</b>
                        <span class="text-xxs">{{ $t("panel.dashboard.This Month") }}</span>
                    </li>
                    <li class="flex flex-col items-center w-full p-2.5 rounded-2xl bg-bgPrimary shadow-mr25">
                        <b class="text-lg/none text-primary">{{ scanData.lastMonthUniqueCount }}</b>
                        <span class="text-xxs">{{ $t("panel.dashboard.Last Month") }}</span>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col gap-4 grow p-3 rounded-2xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <div class="flex items-center justify-between gap-2 w-full">
                    <h3 class="text-sm">{{ $t("panel.dashboard.Total Scans") }}</h3>
                    <small :class="[scanData.totalGrowth >= 0 ? 'text-emerald-300' : 'text-rose-300']" dir="ltr">
                        {{ scanData.totalGrowth >= 0 ? "+" : "" }}{{ scanData.totalGrowth || 0 }}%
                    </small>
                </div>
                <ul class="flex items-center gap-2">
                    <li class="flex flex-col items-center w-full p-2.5 rounded-2xl bg-bgPrimary shadow-mr25">
                        <b class="text-lg/none text-primary">{{ scanData.thisMonthCount }}</b>
                        <span class="text-xxs">{{ $t("panel.dashboard.This Month") }}</span>
                    </li>
                    <li class="flex flex-col items-center w-full p-2.5 rounded-2xl bg-bgPrimary shadow-mr25">
                        <b class="text-lg/none text-primary">{{ scanData.lastMonthCount }}</b>
                        <span class="text-xxs">{{ $t("panel.dashboard.Last Month") }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex items-center justify-between gap-2 p-2 rounded-xl bg-fgPrimary text-bgPrimary overflow-hidden">
            <span class="text-sm text-primary font-bold shrink-0">{{ $t("panel.dashboard.Menu Link") }}:</span>
            <a
                class="btn rounded-lg text-sm overflow-ellipsis overflow-hidden p-1 hover:px-4 hover:bg-secondary hover:bg-opacity-60 hover:shadow-nr15 hover:underline underline-offset-2"
                :href="link"
                target="_blank"
                dir="ltr"
            >
                {{ link }}
            </a>
        </div>
    </section>
</template>

<script setup>
import { Chart as ChartJS, registerables } from "chart.js";
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});
const link = `${runtimeConfig.public.MENU_BASE_URL}/${brand.value.username}`;

let chart;
const chartCanvas = ref(); // Dom Ref
ChartJS.register(...registerables);
ChartJS.defaults.color = "#fffc";
ChartJS.defaults.font.family = "'Poppins', 'Shabnam', sans-serif";
ChartJS.defaults.font.size = 11;

const datasetDefaults = {
    borderColor: "#fffa",
    lineTension: 0.3,
    fill: true,
    borderWidth: 0,
    pointBorderWidth: 1,
    pointStyle: "circle",
    pointRadius: 4,
    pointHoverRadius: 10,
};
const chartData = ref({
    labels: [],
    datasets: [
        { label: t("panel.dashboard.Unique Scans"), backgroundColor: "#9c85b2bb", data: [], ...datasetDefaults },
        { label: t("panel.dashboard.Total Scans"), backgroundColor: "#98c7d0bb", data: [], ...datasetDefaults },
    ],
});
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false },
};

const period = ref("monthly");
const changePeriod = (p) => {
    period.value = p;
    chartData.value.labels = scanData.value[`${p}Label`] || [];
    chartData.value.datasets[0].data = scanData.value[`${p}UniqueCounts`] || [];
    chartData.value.datasets[1].data = scanData.value[`${p}TotalCounts`] || [];
    chart.update();
};

// getCounts -------------------------------------------------
const scanData = ref({});
const getScanData = await useFetch(`/api/v1/panel/analytics/qr-scans`, { lazy: process.client, headers: { brand: route.params.brandID } });
if (getScanData.error.value && getScanData.error.value.statusCode >= 500 && process.server) {
    console.error({ err: getScanData.error.value });
}

const handleScanData = (data) => {
    if (!data) return;
    scanData.value = data || {};
    chartData.value.labels = data.monthlyLabel || [];
    chartData.value.datasets[0].data = data.monthlyUniqueCounts || [];
    chartData.value.datasets[1].data = data.monthlyTotalCounts || [];
};
handleScanData(getScanData.data.value);
watch(getScanData.data, (val) => handleScanData(val));
// -------------------------------------------------

onMounted(() => {
    const ctx = chartCanvas.value.getContext("2d");
    chart = new ChartJS(ctx, { type: "line", data: chartData.value, options: chartOptions });
});
</script>
