<style scoped></style>

<template>
    <section class="flex flex-col gap-4 w-full md:max-w-lg p-6 bg-bgAccent rounded-3xl">
        <header class="flex items-center gap-2 w-full">
            <h3 class="font-extrabold text-fgPrimary">{{ $t("panel.dashboard.Customers Feedback") }}</h3>
            <span class="w-0.5 h-0.5 bg-bgSecondary opacity-50 grow"></span>
        </header>
        <div class="flex flex-wrap items-center justify-between gap-2 py-2 p-3 rounded-xl bg-bgSecondary bg-opacity-75 shadow-mr35">
            <div class="flex items-center gap-1">
                <b class="text-primary">345</b>
                <span class="text-sm">{{ $t("panel.dashboard.New feedback in this month") }}</span>
                <small class="text-emerald-300 ms-2">+23%</small>
            </div>
            <nuxt-link class="btn text-secondary text-sm underline underline-offset-2" to="">{{ $t("panel.dashboard.View All") }}</nuxt-link>
        </div>
        <ul class="flex flex-col gap-4 w-full max-h-64 overflow-auto pe-2">
            <li class="flex items-start gap-2 group" v-for="i in 5">
                <div class="flex flex-col gap-2 shrink-0">
                    <img class="w-16 aspect-square object-cover rounded-xl shadow-mr25" :src="`/sample-foods/sample-food${i}.webp`" />
                    <nuxt-link
                        class="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-xs/none bg-primary text-white p-2 rounded-lg shadow-mr35"
                        to=""
                    >
                        {{ $t("panel.dashboard.Reply") }}
                    </nuxt-link>
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-primary font-bold">Food name</span>
                    <div class="flex flex-col gap-1 w-full p-2 rounded-se-2xl rounded-b-2xl bg-bgSecondary bg-opacity-80 shadow-mr25">
                        <div class="flex items-center justify-between gap-2 text-sm">
                            <span>user's name</span>
                            <small class="text-secondary opacity-90">date</small>
                        </div>
                        <p class="text-xs opacity-75">I'm really satisfied with the performance of this product. It has made my life much easier.</p>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script setup></script>
