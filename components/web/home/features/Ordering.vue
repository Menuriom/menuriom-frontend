<style scoped></style>

<template>
    <div class="flex flex-col items-start gap-4 p-4 sm:p-8 w-80 sm:w-96 rounded-3xl border-2 border-zinc-100 bg-white shadow-nr10" dir="ltr">
        <div class="flex flex-col items-start text-black">
            <b class="f-inter text-xl font-bold">Your Order</b>
            <span class="text-sm opacity-70">3 Items</span>
        </div>
        <ul class="flex flex-col gap-4 w-full">
            <li class="flex items-center gap-4 w-full p-2 bg-white rounded-md border-2 border-zinc-50 shadow-nr10">
                <img class="w-12 2sm:w-18 object-cover shadow-nr25" src="~/assets/images/drink1.webp" alt="drink" />
                <div class="flex flex-col gap-3">
                    <span class="w-20 h-3 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-28 2sm:w-36 h-7 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
                <div class="flex flex-col items-center justify-center gap-1 mis-auto">
                    <button class="flex items-center justify-center w-4 h-4 bg-neutral-800 rounded-md shadow-nr10 cursor-pointer" @click="item1++">
                        <Icon class="w-2.5 h-2.5 bg-white" name="plus.svg" folder="icons" size="10px" />
                    </button>
                    <span class="text-sm">{{ item1 }}</span>
                    <button
                        class="flex items-center justify-center w-4 h-4 bg-neutral-800 rounded-md shadow-nr10 cursor-pointer"
                        @click="item1 == 1 ? 1 : item1--"
                    >
                        <Icon class="w-2.5 h-2.5 bg-white" name="minus.svg" folder="icons" size="10px" />
                    </button>
                </div>
            </li>
            <li class="flex items-center gap-4 w-full p-2 bg-white rounded-md border-2 border-zinc-50 shadow-nr10">
                <img class="w-12 2sm:w-18 object-cover shadow-nr25" src="~/assets/images/fries.webp" alt="fries" />
                <div class="flex flex-col gap-3">
                    <span class="w-20 h-3 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-28 2sm:w-36 h-7 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
                <div class="flex flex-col items-center justify-center gap-1 mis-auto">
                    <button class="flex items-center justify-center w-4 h-4 bg-neutral-800 rounded-md shadow-nr10 cursor-pointer" @click="item2++">
                        <Icon class="w-2.5 h-2.5 bg-white" name="plus.svg" folder="icons" size="10px" />
                    </button>
                    <span class="text-sm">{{ item2 }}</span>
                    <button
                        class="flex items-center justify-center w-4 h-4 bg-neutral-800 rounded-md shadow-nr10 cursor-pointer"
                        @click="item2 == 1 ? 1 : item2--"
                    >
                        <Icon class="w-2.5 h-2.5 bg-white" name="minus.svg" folder="icons" size="10px" />
                    </button>
                </div>
            </li>
            <li class="flex items-center gap-4 w-full p-2 bg-white rounded-md border-2 border-zinc-50 shadow-nr10">
                <img class="w-12 2sm:w-18 object-cover shadow-nr25" src="~/assets/images/burger1.webp" alt="burger" />
                <div class="flex flex-col gap-3">
                    <span class="w-20 h-3 bg-neutral-200 rounded-md shadow-nr5"></span>
                    <span class="w-28 2sm:w-36 h-7 bg-neutral-200 rounded-md shadow-nr5"></span>
                </div>
                <div class="flex flex-col items-center justify-center gap-1 mis-auto">
                    <button class="flex items-center justify-center w-4 h-4 bg-neutral-800 rounded-md shadow-nr10 cursor-pointer" @click="item3++">
                        <Icon class="w-2.5 h-2.5 bg-white" name="plus.svg" folder="icons" size="10px" />
                    </button>
                    <span class="text-sm">{{ item3 }}</span>
                    <button
                        class="flex items-center justify-center w-4 h-4 bg-neutral-800 rounded-md shadow-nr10 cursor-pointer"
                        @click="item3 == 1 ? 1 : item3--"
                    >
                        <Icon class="w-2.5 h-2.5 bg-white" name="minus.svg" folder="icons" size="10px" />
                    </button>
                </div>
            </li>
        </ul>
        <button class="flex items-center justify-center p-4 mt-4 text-sm w-full rounded-md text-white bg-neutral-700 shadow-nr25 hover:shadow-nr10">
            Place The Order
        </button>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const item1 = ref(4);
const item2 = ref(1);
const item3 = ref(2);
</script>
