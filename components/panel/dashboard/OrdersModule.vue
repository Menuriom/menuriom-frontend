<style scoped></style>

<template>
    <section class="flex flex-col gap-4 w-full p-4 md:p-6 bg-bgAccent rounded-3xl" ref="section">
        <header class="flex items-center gap-2 w-full">
            <SelectDropDown
                class="w-52 cursor-pointer"
                customPadding="px-3 py-2 font-bold"
                :formHtmlObject="section"
                :options="chartTypes.list"
                v-slot="{ option }"
                v-model:selected-option="selectedChartType.option"
            >
                <span class="text-xs" :value="option.value">{{ option.name }}</span>
            </SelectDropDown>
            <span class="w-0.5 h-0.5 bg-bgSecondary opacity-50 grow"></span>
            <nuxt-link class="btn text-secondary text-sm underline underline-offset-2" to="">{{ $t("panel.dashboard.Orders Panel") }}</nuxt-link>
        </header>
        <div class="flex flex-wrap items-center gap-4 w-full">
            <div class="flex flex-wrap items-center justify-between gap-2 grow p-3 rounded-xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <h3 class="text-sm">{{ $t("panel.dashboard.This Month") }}</h3>
                <div class="flex items-center gap-2">
                    <small class="text-emerald-300">+0%</small>
                    <b class="text-lg/none text-primary">0</b>
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2 grow p-3 rounded-xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <h3 class="text-sm">{{ $t("panel.dashboard.Last Month") }}</h3>
                <b class="text-lg/none text-primary">0</b>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2 grow p-3 rounded-xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <h3 class="text-sm">{{ $t("panel.dashboard.Total Orders") }}</h3>
                <b class="text-lg/none text-primary">0</b>
            </div>
        </div>
        <span
            class="relative w-full flex items-center justify-center p-1 rounded-2xl border border-bgSecondary shadow-mr25 group grow"
            v-if="checkLimitations([['ordering-system', true]], brand)"
        >
            <NuxtImg class="w-full object-contain blur-sm group-hover:blur transition-all" src="/img/chart-long.png" />
            <span class="absolute w-full max-w-xs p-3 px-4 font-bold rounded-xl bg-bgPrimary bg-opacity-60 text-sm text-center shadow-mr25">
                {{ $t("panel.dashboard.We are working on this feature stay tuned") }}
            </span>
        </span>
        <nuxt-link
            class="relative w-full flex items-center justify-center p-1 rounded-2xl border border-bgSecondary shadow-mr25 group grow"
            :to="localePath(`/panel/${panelStore.selectedBrandId}/billing`)"
            v-else
        >
            <NuxtImg class="w-full object-contain blur-sm group-hover:blur transition-all" src="/img/chart-long.png" />
            <span class="absolute w-full max-w-xs p-3 px-4 font-bold rounded-xl bg-bgPrimary bg-opacity-60 text-sm text-center shadow-mr25">
                {{ $t("panel.dashboard.Upgrade your plan to pro to view this chart") }}
            </span>
        </nuxt-link>
    </section>
</template>

<script setup>
import SelectDropDown from "~/components/form/SelectDropDown.vue";
import { usePanelStore } from "@/stores/panel";
import { useUserStore } from "@/stores/user";

const { t } = useI18n();
const localePath = useLocalePath();
const panelStore = usePanelStore();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});

const section = ref(); // Dom Ref
const selectedChartType = reactive({ option: { name: t("panel.dashboard.Orders Statistics"), value: "orders" } });
const chartTypes = reactive({
    list: [
        { name: t("panel.dashboard.Orders Statistics"), value: "orders" },
        { name: t("panel.dashboard.Income Statistics"), value: "income" },
    ],
});
</script>
