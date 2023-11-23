<style scoped></style>

<template>
    <section class="flex flex-col gap-4 w-full p-6 bg-bgAccent rounded-3xl">
        <header class="flex items-center gap-2 w-full">
            <h3 class="font-extrabold text-fgPrimary">{{ $t("panel.dashboard.Orders Statistics") }}</h3>
            <span class="w-0.5 h-0.5 bg-bgSecondary opacity-50 grow"></span>
            <nuxt-link class="btn text-secondary text-sm underline underline-offset-2" to="">{{ $t("panel.dashboard.Orders Panel") }}</nuxt-link>
        </header>
        <div class="flex flex-wrap items-center gap-4 w-full">
            <div class="flex flex-wrap items-center justify-between gap-2 grow p-3 rounded-xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <h3 class="text-sm">{{ $t("panel.dashboard.This Month") }}</h3>
                <div class="flex items-center gap-2">
                    <small class="text-emerald-300">+23%</small>
                    <b class="text-lg/none text-primary">345</b>
                </div>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2 grow p-3 rounded-xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <h3 class="text-sm">{{ $t("panel.dashboard.Last Month") }}</h3>
                <b class="text-lg/none text-primary">345</b>
            </div>
            <div class="flex flex-wrap items-center justify-between gap-2 grow p-3 rounded-xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                <h3 class="text-sm">{{ $t("panel.dashboard.Total Orders") }}</h3>
                <b class="text-lg/none text-primary">345</b>
            </div>
        </div>
        <div class="relative w-full flex items-center justify-center p-1 rounded-2xl border border-bgSecondary shadow-mr25 group grow">
            <NuxtImg class="w-full object-contain blur-sm group-hover:blur transition-all" src="/img/chart-long.png" />
            <span class="absolute w-full max-w-xs p-3 px-4 rounded-xl bg-bgPrimary bg-opacity-60 text-sm text-center shadow-mr25">
                {{ $t("panel.dashboard.Upgrade your plan to standard to view this chart") }}
            </span>
        </div>
    </section>
</template>

<script setup></script>
