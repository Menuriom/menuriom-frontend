<style scoped></style>

<template>
    <div class="relative flex items-start gap-0 sm:gap-20 md:gap-20 max-w-sm">
        <div class="relative flex flex-col items-start gap-3 p-4 w-52 rounded-xl border-2 border-zinc-100 bg-white shadow-nr10">
            <img class="w-9 -mt-11" src="~/assets/images/custom-icons/dark/location-dot.png" alt="pin" />
            <b class="text-lg">Tajrish</b>
            <ul class="flex items-center justify-between gap-2 w-full">
                <li v-for="n in 4" :key="n" class="w-8 h-8 rounded-md bg-gray-200"></li>
            </ul>
            <div v-for="n in 2" :key="n" class="flex flex-col gap-1 p-2 w-full rounded-md border-2 border-zinc-50 bg-white shadow-nr10">
                <span class="w-12 h-1 bg-neutral-200 rounded-md shadow-nr5"></span>
                <span class="w-20 h-2 bg-neutral-200 rounded-md shadow-nr5"></span>
            </div>
            <img class="w-full h-22 object-cover rounded-md shadow-nr15" src="~/assets/images/burger2.webp" alt="burger" />
        </div>

        <div class="absolute start-18 top-36 flex flex-col items-start gap-3 p-4 w-52 rounded-xl border-2 border-zinc-100 bg-white shadow-nr10">
            <img class="w-9 -mt-11" src="~/assets/images/custom-icons/dark/location-dot.png" alt="pin" />
            <b class="text-lg">Bamland</b>
            <ul class="flex items-center justify-between gap-2 w-full">
                <li v-for="n in 4" :key="n" class="w-8 h-8 rounded-md bg-gray-200"></li>
            </ul>
            <div class="relative flex items-start w-full">
                <img class="w-full h-22 object-cover rounded-md shadow-nr15" src="~/assets/images/burger2.webp" alt="burger" />
                <div class="absolute top-2 start-2 flex items-center justify-center p-2 rounded-md bg-zinc-700 bg-opacity-75 backdrop-blur-sm">
                    <img class="h-6" src="~/assets/images/20off.svg" alt="off" />
                </div>
            </div>
            <div class="flex flex-col gap-1 p-2 w-full rounded-md border-2 border-zinc-50 bg-white shadow-nr10">
                <span class="w-12 h-1 bg-neutral-200 rounded-md shadow-nr5"></span>
                <span class="w-20 h-2 bg-neutral-200 rounded-md shadow-nr5"></span>
            </div>
        </div>

        <div class="absolute end-10 sm:end-0 top-2 flex flex-col items-start gap-3 p-4 w-52 rounded-xl border-2 border-zinc-100 bg-white shadow-nr10">
            <img class="w-9 -mt-11" src="~/assets/images/custom-icons/dark/location-dot.png" alt="pin" />
            <b class="text-lg">Sa'adat Abad</b>
            <ul class="flex items-center justify-between gap-2 w-full">
                <li v-for="n in 4" :key="n" class="w-8 h-8 rounded-md bg-gray-200"></li>
            </ul>
            <div class="flex items-center gap-1 p-1 w-full rounded-md border-2 border-zinc-50 bg-white shadow-nr10">
                <img class="w-8 h-8 object-cover rounded-md" src="~/assets/images/coffee1.webp" alt="coffee" />
                <div class="flex flex-col gap-1.5">
                    <span class="w-12 h-1 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-20 h-2 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
            </div>
            <img class="w-full h-22 object-cover rounded-md shadow-nr15" src="~/assets/images/pizza1.webp" alt="pizza" />
            <div class="flex items-center gap-1 p-1 w-full rounded-md border-2 border-zinc-50 bg-white shadow-nr10">
                <img class="w-8 h-8 object-cover rounded-md" src="~/assets/images/coffee-cream1.webp" alt="coffee-cream" />
                <div class="flex flex-col gap-1.5">
                    <span class="w-12 h-1 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-20 h-2 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
            </div>
        </div>

        <div class="relative flex flex-col items-start gap-3 p-4 -ms-12 sm:ms-0 mt-24 w-52 rounded-xl border-2 border-zinc-100 bg-white shadow-nr10 z-2">
            <img class="w-9 -mt-11" src="~/assets/images/custom-icons/dark/location-dot.png" alt="pin" />
            <b class="text-lg">Ponak</b>
            <ul class="flex items-center justify-between gap-2 w-full">
                <li v-for="n in 4" :key="n" class="w-8 h-8 rounded-md bg-gray-200"></li>
            </ul>
            <div class="flex items-center gap-1 p-1 w-full rounded-md border-2 border-zinc-50 bg-white shadow-nr10">
                <img class="w-8 h-8 object-cover rounded-md" src="~/assets/images/french-toast.webp" alt="french-toast" />
                <div class="flex flex-col gap-1.5">
                    <span class="w-12 h-1 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-20 h-2 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
            </div>
            <div class="flex items-center gap-1 p-1 w-full rounded-md border-2 border-zinc-50 bg-white shadow-nr10">
                <img class="w-8 h-8 object-cover rounded-md" src="~/assets/images/pizza1.webp" alt="pizza" />
                <div class="flex flex-col gap-1.5">
                    <span class="w-12 h-1 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-20 h-2 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
            </div>
            <div class="relative flex items-center justify-center">
                <img class="w-full h-22 object-cover rounded-md shadow-nr15" src="~/assets/images/burger2.webp" alt="burger" />
                <div class="absolute inset-0 flex justify-center rounded-md bg-zinc-800 bg-opacity-60">
                    <img class="absolute top-4 h-14 -rotate-12" src="~/assets/images/sold-out.svg" alt="sold-out" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";
</script>
