<style scoped></style>

<template>
    <section class="flex flex-col gap-2 w-full max-w-md p-6 bg-bgAccent rounded-3xl">
        <header class="flex items-center gap-2 w-full">
            <h3 class="font-extrabold text-fgPrimary">{{ $t("panel.dashboard.QR Code Scans") }}</h3>
            <span class="w-0.5 h-0.5 bg-bgSecondary opacity-50 grow"></span>
            <nuxt-link class="btn text-secondary text-sm underline underline-offset-2" to="">{{ $t("panel.dashboard.Edit QR Code") }}</nuxt-link>
        </header>
        <div class="relative w-full flex items-center justify-center p-1 rounded-2xl shadow-mr25 group">
            <NuxtImg class="w-full object-contain blur-sm group-hover:blur transition-all" src="/img/chart-short.png" />
            <span class="absolute w-full max-w-xs p-2 px-4 rounded-xl bg-bgPrimary bg-opacity-50 text-sm text-center">
                {{ $t("panel.dashboard.Upgrade your plan to standard to view this chart") }}
            </span>
        </div>
        <div class="flex items-center gap-2 w-full">
            <div class="flex flex-col gap-2 grow">
                <div class="flex flex-col gap-3 p-3 rounded-2xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                    <div class="flex items-center justify-between gap-2 w-full">
                        <h3 class="text-sm">{{ $t("panel.dashboard.Signed up users") }}</h3>
                        <span class="text-emerald-300">+23%</span>
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
                <div class="flex flex-col gap-3 p-3 rounded-2xl bg-bgSecondary bg-opacity-75 shadow-mr35">
                    <div class="flex items-center justify-between gap-2 w-full">
                        <h3 class="text-sm">{{ $t("panel.dashboard.Signed up users") }}</h3>
                        <span class="text-rose-300">-23%</span>
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
            <img class="w-48 aspect-square rounded-2xl shadow-mr35 border-4 border-fgPrimary" src="/img/qr2.png" alt="" />
        </div>
    </section>
</template>

<script setup></script>
