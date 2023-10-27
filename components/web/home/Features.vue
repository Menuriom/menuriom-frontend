<style scoped></style>

<template>
    <section class="relative flex flex-col gap-24 lg:gap-16 items-center w-screen max-w-screen-2xl rounded-lg p-6" title="Features">
        <div class="relative flex flex-col gap-6 max-w-4xl z-2">
            <h2 class="f-inter text-4xl/tight sm:text-5xl/tight font-bold text-center">
                {{ $t("home.Create a highly versatile online menu and lower your restaurant costs") }}
            </h2>
            <p class="text-center sm:text-lg opacity-75">
                {{ $t("home.FeatureDescription") }}
            </p>
        </div>
        <hr class="hidden lg:inline-block w-full h-1 border-none my-2" />

        <div class="relative flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-8 z-2">
            <SpecialItems class="z-2 shrink-0" />
            <div class="flex items-center p-6 md:p-8 lg:-ms-44 bg-pencil-tip text-zinc-100 rounded-3xl -mt-10">
                <span class="hidden lg:inline-block w-44"></span>
                <div class="flex flex-col items-start gap-6 max-w-xl rounded-3xl">
                    <img class="h-10" src="~/assets/images/custom-icons/light/fire.png" alt="fire" />
                    <h3 class="f-inter text-4xl/snug font-bold">{{ $t("home.Highlight Specific Items In Your Menu") }}</h3>
                    <p class="text-lg opacity-75">
                        {{ $t("home.maybe you have a new item on your menu") }}
                        <br />
                        {{ $t("home.maybe an item is sold out for the day, or you just want to add an item as a special one") }}
                        <br />
                        {{ $t("home.you can highlight items with special tags and even put discounts on some of your products") }}
                    </p>
                    <hr class="hidden lg:flex w-full h-1 mt-2 bg-primary border-none" />
                </div>
            </div>
        </div>

        <div class="relative flex flex-col lg:flex-row justify-center items-center lg:items-start gap-24 lg:gap-10 xl:gap-20 mt-14 lg:mt-20 w-full">
            <div class="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
                <div class="flex flex-col items-start gap-6 max-w-xl p-6 md:p-8 lg:pb-40 lg:-mb-40 bg-pencil-tip text-zinc-100 rounded-3xl">
                    <hr class="hidden lg:flex w-full h-1 mb-2 bg-primary border-none" />
                    <img class="h-10" src="~/assets/images/custom-icons/light/store-alt.png" alt="store-alt" />
                    <h3 class="f-inter text-4xl/snug font-bold">{{ $t("home.Build Different Menu For Your Branches") }}</h3>
                    <p class="text-lg opacity-75">
                        {{ $t("home.branchFeatureDesc") }}
                    </p>
                </div>
                <Branches class="mt-10 lg:ms-10" />
            </div>
            <span class="hidden lg:flex w-1 h-96 my-auto border-none"></span>
            <div class="flex flex-col-reverse lg:flex-col items-center gap-8 lg:gap-4 lg:-mt-44 w-full lg:w-auto">
                <Ordering class="mb-4 z-2" />
                <div class="flex flex-col items-start gap-6 max-w-xl p-6 md:p-8 lg:pt-40 lg:-mt-40 bg-pencil-tip text-zinc-100 rounded-3xl">
                    <img class="h-10" src="~/assets/images/custom-icons/light/clipboard-list-check.png" alt="clipboard-list-check" />
                    <h3 class="f-inter text-4xl/snug font-bold">{{ $t("home.Get Orders From Your Customers With Your Menu") }}</h3>
                    <p class="text-lg opacity-75">
                        {{ $t("home.orderFeatureDesc") }}
                    </p>
                    <hr class="hidden lg:flex w-full h-1 mt-2 bg-primary border-none" />
                </div>
            </div>
        </div>

        <div class="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-20 lg:gap-8 w-full lg:mt-24 z-2">
            <div class="flex items-center p-6 md:p-16 lg:-me-24 bg-pencil-tip text-zinc-100 rounded-3xl -mt-10">
                <div class="flex flex-col items-start gap-6 max-w-xl rounded-3xl">
                    <hr class="hidden lg:flex w-full h-1 mb-2 bg-primary border-none" />
                    <img class="h-10" src="~/assets/images/custom-icons/light/comments-question-check.png" alt="comments-question-check" />
                    <h3 class="f-inter text-4xl/snug font-bold">Get Feedback On Your Services And Products</h3>
                    <p class="text-lg opacity-75">find out what your customers think about your products and put aside the guessing work</p>
                </div>
                <span class="hidden lg:inline-block lg:w-24"></span>
            </div>
            <Feedback class="lg:-mt-28" />
        </div>
    </section>
</template>

<script setup>
import SpecialItems from "~/components/web/home/features/SpecialItems.vue";
import Ordering from "~/components/web/home/features/Ordering.vue";
import Feedback from "~/components/web/home/features/Feedback.vue";
import Branches from "~/components/web/home/features/Branches.vue";
</script>
