<style scoped></style>

<template>
    <section class="flex flex-col gap-4 w-full max-w-[420px] p-6 bg-bgAccent rounded-3xl">
        <header class="flex items-center gap-2 w-full">
            <h3 class="font-extrabold text-fgPrimary">{{ $t("panel.dashboard.QR Code Scans") }}</h3>
            <span class="w-0.5 h-0.5 bg-bgSecondary opacity-50 grow"></span>
            <nuxt-link class="btn text-secondary text-sm underline underline-offset-2" to="">{{ $t("panel.dashboard.Edit QR Code") }}</nuxt-link>
        </header>
        <div class="relative w-full flex items-center justify-center p-1 rounded-2xl shadow-mr25 group grow">
            <NuxtImg class="w-full object-contain blur-sm group-hover:blur transition-all" src="/img/chart-short.png" />
            <span class="absolute w-full max-w-xs p-3 px-4 rounded-xl bg-bgPrimary bg-opacity-60 text-sm text-center shadow-mr25">
                {{ $t("panel.dashboard.Upgrade your plan to standard to view this chart") }}
            </span>
        </div>
        <div class="flex flex-wrap gap-2 grow">
            <div class="flex flex-col gap-4 grow p-3 rounded-2xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <div class="flex items-center justify-between gap-2 w-full">
                    <h3 class="text-sm">{{ $t("panel.dashboard.Unique Scans") }}</h3>
                    <small class="text-emerald-300">+23%</small>
                </div>
                <ul class="flex items-center gap-2 w-full">
                    <li class="flex flex-col items-center w-full">
                        <b class="text-lg/none text-primary">345</b>
                        <span class="text-xs">{{ $t("panel.dashboard.This Month") }}</span>
                    </li>
                    <li class="flex flex-col items-center w-full">
                        <b class="text-lg/none text-primary">345</b>
                        <span class="text-xs">{{ $t("panel.dashboard.Last Month") }}</span>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col gap-4 grow p-3 rounded-2xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <div class="flex items-center justify-between gap-2 w-full">
                    <h3 class="text-sm">{{ $t("panel.dashboard.Total Scans") }}</h3>
                    <small class="text-rose-300">-23%</small>
                </div>
                <ul class="flex items-center gap-2">
                    <li class="flex flex-col items-center w-full">
                        <b class="text-lg/none text-primary">3452</b>
                        <span class="text-xs">{{ $t("panel.dashboard.This Month") }}</span>
                    </li>
                    <li class="flex flex-col items-center w-full">
                        <b class="text-lg/none text-primary">3452</b>
                        <span class="text-xs">{{ $t("panel.dashboard.Last Month") }}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-fgPrimary text-bgPrimary">
            <span class="text-sm text-primary font-bold">{{ $t("panel.qrcode.Link to your menu") }}:</span>
            <a
                class="btn rounded-lg text-sm p-1 hover:px-4 hover:bg-secondary hover:bg-opacity-60 hover:shadow-nr15 hover:underline underline-offset-2"
                :href="link"
                target="_blank"
            >
                {{ link }}
            </a>
        </div>
        <!-- <img class="w-48 aspect-square rounded-2xl shadow-mr35 border-4 border-fgPrimary" src="/img/qr2.png" alt="" /> -->
    </section>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { usePanelStore } from "@/stores/panel";

const panelStore = usePanelStore();
const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();

const brand = computed(() => userStore.brands.list[panelStore.selectedBrandId] || {});
const link = `${runtimeConfig.public.MENU_BASE_URL}/${brand.value.username}`;
</script>
