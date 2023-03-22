<style scoped></style>

<template>
    <div class="relative flex flex-col items-start gap-4 p-8 w-96 rounded-xl border-2 border-zinc-100 bg-white shadow-nr10">
        <img class="w-full h-48 object-cover rounded-lg shadow-nr15" src="~/assets/images/pizza1.webp" alt="pizza" />

        <div class="absolute left-16 -top-16 gradient-re p-1.5 rounded-xl shadow-nr10">
            <div class="flex flex-col items-start gap-1 p-4 rounded-lg bg-white">
                <ul class="flex items-center gap-2 w-full">
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                </ul>
                <b>5/5</b>
                <span>We <b class="text-xl">LOVED</b> it</span>
                <div class="flex flex-col gap-1 w-full">
                    <span class="w-full h-1.5 bg-neutral-200 rounded-md"></span>
                    <span class="w-full h-1.5 bg-neutral-200 rounded-md"></span>
                    <span class="w-3/4 h-1.5 bg-neutral-200 rounded-md"></span>
                </div>
            </div>
        </div>
        <div class="absolute -left-6 top-12 gradient-re p-1.5 rounded-xl shadow-nr10">
            <div class="flex flex-col items-start gap-1 p-4 rounded-lg bg-white">
                <ul class="flex items-center gap-2 w-full">
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star-fill.png" alt="star" /></li>
                    <li><img class="w-6 h-6" src="~/assets/images/icons/star.png" alt="star" /></li>
                </ul>
                <b>4/5</b>
                <span>It was <b class="text-xl">DELICIOUS</b></span>
                <div class="flex flex-col gap-1 w-full">
                    <span class="w-full h-1.5 bg-neutral-200 rounded-md"></span>
                    <span class="w-full h-1.5 bg-neutral-200 rounded-md"></span>
                    <span class="w-3/4 h-1.5 bg-neutral-200 rounded-md"></span>
                </div>
            </div>
        </div>

        <div class="flex items-start justify-between gap-2 w-full">
            <div class="flex flex-col gap-3">
                <span class="w-20 h-4 bg-neutral-200 rounded-md shadow-nr5"></span>
                <span class="w-60 h-7 bg-neutral-200 rounded-md shadow-nr5"></span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <img class="w-8" src="~/assets/images/icons/heart1.png" alt="heart" />
                <b>42</b>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";
</script>
