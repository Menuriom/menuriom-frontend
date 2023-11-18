<style scoped></style>

<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-col gap-3 rounded-3xl">
            <div class="sticky flex items-center gap-2 w-full p-2 bg-bgSecondary rounded-2xl shadow-nr10 z-2">
                <div class="skeleton w-7 h-7 rounded" />
                <h3 class="skeleton w-24 h-4 rounded-md shrink-0" />
            </div>

            <ul class="flex flex-col gap-4 w-full rounded-2xl overflow-hidden">
                <li
                    class="relative flex flex-col md:flex-row items-center md:items-stretch flex-wrap @6xl:flex-nowrap gap-4 p-4 ps-9 rounded-2xl bg-bgAccent shadow-mr35 overflow-hidden"
                    v-for="n in 6"
                    :key="n"
                >
                    <div class="flex flex-wrap 2sm:flex-nowrap items-center gap-4 w-full max-w-lg shrink-0">
                        <div class="skeleton w-28 aspect-square rounded-xl" />
                        <div class="flex flex-col gap-3 w-full overflow-hidden">
                            <div class="flex flex-col gap-1 bg-bgSecondary bg-opacity-50 p-2.5 rounded-xl shadow-mr15">
                                <h4 class="skeleton w-5/12 h-4" />
                                <p class="skeleton w-10/12 h-2" />
                            </div>
                            <span class="skeleton w-5/12 h-10 rounded-md" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-4 w-full max-w-screen-2xs p-3 rounded-2xl border border-bgSecondary border-opacity-50">
                        <h4 class="skeleton w-6/12 h-4 rounded-md" />
                        <p class="skeleton w-10/12 h-2" />
                        <p class="skeleton w-10/12 h-2" />
                    </div>
                    <div class="flex flex-col gap-4 w-full max-w-screen-2xs p-3 rounded-2xl border border-bgSecondary border-opacity-50">
                        <h4 class="skeleton w-6/12 h-4 rounded-md" />
                        <p class="skeleton w-10/12 h-2" />
                        <p class="skeleton w-10/12 h-2" />
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup></script>
