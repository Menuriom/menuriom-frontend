<style scoped></style>

<template>
    <div class="relative flex flex-col items-start gap-4 p-4 sm:p-8 w-80 sm:w-96 rounded-3xl border-2 border-zinc-100 bg-white text-black shadow-nr10" dir="ltr">
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
        <div class="absolute -left-6 top-6 sm:top-12 gradient-re p-1.5 rounded-xl shadow-nr10">
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
                <span class="w-48 2sm:w-60 h-7 bg-neutral-200 rounded-md shadow-nr5"></span>
            </div>
            <div class="flex flex-col items-center gap-2">
                <img class="w-8" src="~/assets/images/icons/heart1.png" alt="heart" />
                <b>42</b>
            </div>
        </div>

        <hr class="w-full" />
        <div class="flex items-center justify-between gap-2 w-full">
            <div class="flex flex-col gap-2">
                <span class="w-24 2sm:w-32 h-6 bg-gray-200 rounded-md shadow-nr5"></span>
                <span class="w-12 h-3 bg-gray-200 rounded-md shadow-nr5"></span>
            </div>
            <button class="flex items-center justify-center gap-2 p-3 px-4 mt-4 text-sm w-max rounded-md text-white bg-neutral-700 shadow-nr25 hover:shadow-nr10">
                <Icon class="w-3 h-3 bg-white" name="plus.svg" folder="icons" size="12px" />
                <small>Add To Order</small>
            </button>
        </div>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";
</script>
