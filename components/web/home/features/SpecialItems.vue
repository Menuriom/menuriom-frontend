<style scoped></style>

<template>
    <div class="flex flex-col gap-4 2sm:gap-8 p-4 sm:p-8 w-full sm:w-96 rounded-xl border-2 border-zinc-100 bg-white shadow-nr10">
        <ul class="flex items-center justify-between gap-2 2sm:gap-6">
            <li
                class="flex items-center justify-center p-1.5 rounded-md shadow-nr10 cursor-pointer"
                :class="[selectedCategory == 1 ? 'gradient-re bg-neutral-700' : 'bg-zinc-200 grayscale']"
                @click="changeCategory(1)"
            >
                <div class="flex items-center justify-center p-2 rounded-sm" :class="[selectedCategory == 1 ? 'bg-neutral-700' : 'bg-zinc-200']">
                    <img src="~/assets/images/icons/burger.png" alt="burger" />
                </div>
            </li>
            <li
                class="flex items-center justify-center p-1.5 rounded-md shadow-nr10 cursor-pointer"
                :class="[selectedCategory == 2 ? 'gradient-re bg-neutral-700' : 'bg-zinc-200 grayscale']"
                @click="changeCategory(2)"
            >
                <div class="flex items-center justify-center p-2 rounded-sm" :class="[selectedCategory == 2 ? 'bg-neutral-700' : 'bg-zinc-200']">
                    <img src="~/assets/images/icons/burrito.png" alt="burrito" />
                </div>
            </li>
            <li
                class="flex items-center justify-center p-1.5 rounded-md shadow-nr10 cursor-pointer"
                :class="[selectedCategory == 3 ? 'gradient-re bg-neutral-700' : 'bg-zinc-200 grayscale']"
                @click="changeCategory(3)"
            >
                <div class="flex items-center justify-center p-2 rounded-sm" :class="[selectedCategory == 3 ? 'bg-neutral-700' : 'bg-zinc-200']">
                    <img src="~/assets/images/icons/salad.png" alt="salad" />
                </div>
            </li>
            <li
                class="flex items-center justify-center p-1.5 rounded-md shadow-nr10 cursor-pointer"
                :class="[selectedCategory == 4 ? 'gradient-re bg-neutral-700' : 'bg-zinc-200 grayscale']"
                @click="changeCategory(4)"
            >
                <div class="flex items-center justify-center p-2 rounded-sm" :class="[selectedCategory == 4 ? 'bg-neutral-700' : 'bg-zinc-200']">
                    <img src="~/assets/images/icons/ice-cream.png" alt="ice-cream" />
                </div>
            </li>
        </ul>

        <div class="relative flex flex-col gap-4">
            <img class="w-full h-48 object-cover rounded-lg shadow-nr15" src="~/assets/images/french-toast.webp" alt="french-toast" />
            <span class="absolute start-4 bottom-14 w-16 h-3 bg-neutral-600 bg-opacity-75 backdrop-blur-md rounded-md shadow-nr35"></span>
            <span class="absolute start-4 bottom-4 w-40 h-7 bg-neutral-600 bg-opacity-75 backdrop-blur-md rounded-md shadow-nr35"></span>
            <div class="absolute start-0 sm:-start-8 top-4 gradient-re rounded-lg p-1">
                <div class="flex items-end gap-1 px-4 bg-neutral-600 bg-opacity-90 backdrop-blur-md rounded-md shadow-nr35">
                    <img class="w-10 sm:w-14 -ms-10 sm:-ms-12" src="~/assets/images/icons/fire.png" alt="fire" />
                    <img class="h-6 sm:h-8 mb-1.5 sm:mb-2.5" src="~/assets/images/today-special.svg" alt="special" />
                </div>
            </div>
        </div>
        <ul class="flex flex-col gap-4 w-full -mb-16">
            <li class="flex items-center gap-4 w-full p-2 bg-white rounded-md border-2 border-zinc-50 shadow-nr10">
                <img class="w-18 h-18 object-cover shadow-nr25" src="~/assets/images/coffee1.webp" alt="coffe" />
                <div class="flex flex-col gap-3">
                    <span class="w-20 h-3 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-28 2sm:w-40 h-7 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
            </li>
            <li class="gradient-re relative w-full p-1 rounded-lg shadow-nr10">
                <div class="flex items-center gap-4 w-full p-2 bg-white rounded-md">
                    <img class="w-18 h-18 object-cover shadow-nr25" src="~/assets/images/coffee-cream1.webp" alt="cream" />
                    <div class="flex flex-col gap-3">
                        <span class="w-20 h-3 bg-neutral-200 rounded-md shadow-nr5"></span>
                        <span class="w-28 2sm:w-40 h-7 bg-neutral-200 rounded-md shadow-nr5"></span>
                    </div>
                </div>
                <img class="absolute -top-2 -right-8 w-16 h-16 rotate-45 drop-shadow-lg" src="~/assets/images/icons/new-tag.png" alt="new-tag" />
            </li>
        </ul>
    </div>
</template>

<script setup>
const selectedCategory = ref(4);

const changeCategory = (i) => {
    selectedCategory.value = i;
};
</script>
