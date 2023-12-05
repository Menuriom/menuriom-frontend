<style scoped></style>

<template>
    <section class="relative flex flex-col gap-8 sm:gap-24 lg:gap-16 items-center w-screen max-w-screen-2xl rounded-lg p-6" title="Features">
        <div class="relative flex flex-col gap-6 max-w-4xl z-2">
            <img class="absolute -top-14 md:-top-20 opacity-40 mix-blend-multiply" src="~/assets/images/line-wave.svg" alt="" />
            <h2 class="f-inter text-3xl/tight sm:text-5xl/tight font-bold text-center">
                {{ $t("home.Create a highly versatile online menu and lower your restaurant costs") }}
            </h2>
            <p class="text-center text-sm/normal sm:text-lg opacity-75">
                {{ $t("home.FeatureDescription") }}
            </p>
        </div>
        <hr class="sm:hidden lg:inline-block w-full h-1 border-none my-2 lg:mt-10" />

        <div class="relative flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center sm:gap-8 z-2">
            <!-- <SpecialItems class="-mt-10 sm:-mt-0 z-2 scale-75 sm:scale-100 shrink-0" /> -->
            <NuxtImg
                class="w-full max-w-lg -mt-2 sm:-mt-28 z-2 scale-90 sm:scale-100 shrink-0"
                sizes="100% sm:500px"
                src="/feature-images/special-item.png"
                format="webp"
                loading="lazy"
            />
            <div class="flex items-center p-6 md:p-8 lg:-ms-44 bg-pencil-tip text-zinc-100 rounded-3xl -mt-10">
                <span class="hidden lg:inline-block w-44"></span>
                <div class="flex flex-col items-start gap-6 max-w-xl rounded-3xl">
                    <h3 class="f-inter text-2xl/snug sm:text-4xl/snug font-bold">
                        <img class="inline-block h-10 me-2" src="~/assets/images/custom-icons/light/fire.png" alt="fire" />
                        {{ $t("home.Highlight Specific Items In Your Menu") }}
                    </h3>
                    <p class="sm:text-lg opacity-75">
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

        <div class="relative flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 sm:gap-24 lg:gap-10 xl:gap-20 lg:mt-20 w-full">
            <div class="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
                <div class="flex flex-col items-start gap-6 max-w-xl p-6 md:p-8 lg:pb-40 lg:-mb-40 bg-pencil-tip text-zinc-100 rounded-3xl">
                    <hr class="hidden lg:flex w-full h-1 mb-2 bg-primary border-none" />
                    <h3 class="f-inter text-2xl/snug sm:text-4xl/snug font-bold">
                        <img class="inline-block h-10 me-2" src="~/assets/images/custom-icons/light/store-alt.png" alt="store-alt" />
                        {{ $t("home.Build Different Menu For Your Branches") }}
                    </h3>
                    <p class="sm:text-lg opacity-75">
                        {{ $t("home.branchFeatureDesc") }}
                    </p>
                </div>
                <!-- <Branches class="-mt-10 sm:mt-10 lg:ms-10 scale-75 sm:scale-100" /> -->
                <NuxtImg class="w-full max-w-lg ms-4" src="/feature-images/multi-branch.png" sizes="100% sm:550px" format="webp" loading="lazy" />
            </div>
            <span class="hidden lg:flex w-1 h-96 my-auto border-none"></span>
            <div class="flex flex-col-reverse lg:flex-col items-center sm:gap-8 lg:gap-4 lg:-mt-44 w-full lg:w-auto">
                <!-- <Ordering class="-mt-10 sm:-mt-0 sm:mb-4 z-2 scale-75 sm:scale-100" /> -->
                <NuxtImg
                    class="w-full max-w-lg -mt-10 sm:-mt-0 ms-4 z-2 scale-90 sm:scale-100"
                    sizes="100% sm:500px"
                    src="/feature-images/ordering.png"
                    format="webp"
                    loading="lazy"
                />
                <div class="flex flex-col items-start gap-6 max-w-xl p-6 md:p-8 lg:pt-40 lg:-mt-40 bg-pencil-tip text-zinc-100 rounded-3xl">
                    <h3 class="f-inter text-2xl/snug sm:text-4xl/snug font-bold">
                        <img class="inline-block h-10 me-2" src="~/assets/images/custom-icons/light/clipboard-list-check.png" alt="clipboard-list-check" />
                        {{ $t("home.Get Orders From Your Customers With Your Menu") }}
                    </h3>
                    <p class="sm:text-lg opacity-75">
                        {{ $t("home.orderFeatureDesc") }}
                    </p>
                    <hr class="hidden lg:flex w-full h-1 mt-2 bg-primary border-none" />
                </div>
            </div>
        </div>

        <div class="relative flex flex-col lg:flex-row items-center lg:items-start justify-center sm:gap-20 lg:gap-8 w-full lg:mt-24 z-2">
            <div class="flex items-center p-6 md:p-16 lg:-me-24 bg-pencil-tip text-zinc-100 rounded-3xl -mt-10">
                <div class="flex flex-col items-start gap-6 max-w-xl rounded-3xl">
                    <hr class="hidden lg:flex w-full h-1 mb-2 bg-primary border-none" />
                    <h3 class="f-inter text-2xl/snug sm:text-4xl/snug font-bold">
                        <img
                            class="inline-block h-10 me-2"
                            src="~/assets/images/custom-icons/light/comments-question-check.png"
                            alt="comments-question-check"
                        />
                        {{ $t("home.Get Feedback On Your Services And Products") }}
                    </h3>
                    <p class="sm:text-lg opacity-75">{{ $t("home.find out what your customers think about your products and put aside the guessing work") }}</p>
                </div>
                <span class="hidden lg:inline-block lg:w-24"></span>
            </div>
            <!-- <Feedback class="lg:-mt-28 scale-75 sm:scale-100" /> -->
            <NuxtImg class="lg:-mt-52" src="/feature-images/feedback.png" sizes="100% sm:630px" format="webp" loading="lazy" />
        </div>
    </section>
</template>

<script setup>
// import SpecialItems from "~/components/web/home/features/SpecialItems.vue";
// import Ordering from "~/components/web/home/features/Ordering.vue";
// import Feedback from "~/components/web/home/features/Feedback.vue";
// import Branches from "~/components/web/home/features/Branches.vue";
</script>
