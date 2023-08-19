<style scoped></style>

<template>
    <section class="relative flex flex-col gap-24 lg:gap-16 items-center w-screen max-w-screen-2xl rounded-lg p-6" title="Features">
        <div class="relative flex flex-col gap-6 max-w-3xl z-2">
            <h2 class="f-inter text-4xl sm:text-5xl font-bold text-center">Create a highly versetile online menu and enjoy from its benefits</h2>
            <p class="text-center sm:text-lg">
                By using an online menu system you can organize your products better
                <br />
                and change any item details quickly and easily, have a different menu for different languages, and tailor your menu however you see fit
            </p>
        </div>
        <hr class="lg:hidden w-full h-1 mb-2 bg-primary border-none -my-16" />

        <div class="relative flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-24 xl:gap-40 w-full lg:mt-10 z-2">
            <SpecialItems class="shrink-0" />
            <div class="flex flex-col items-start gap-6 max-w-xl p-6 bg-pencil-tip text-zinc-100 rounded-xl">
                <img class="h-10" src="~/assets/images/custom-icons/light/fire.png" alt="fire" />
                <h3 class="f-inter text-4xl font-bold">Highlight Specific Items In Your Menu</h3>
                <p class="text-lg opacity-75">
                    maybe you have a new item on your menu
                    <br />
                    maybe an item is sold out for the day, or you just want to add an item as a special one
                    <br />
                    you can highlight items with special tags and even put discounts on some of your products
                </p>
                <hr class="hidden lg:flex w-full h-1 mt-2 bg-primary border-none" />
            </div>
        </div>

        <div class="relative flex flex-col lg:flex-row justify-center items-center lg:items-start gap-24 lg:gap-10 xl:gap-16 mt-14 lg:mt-20 w-full">
            <div class="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto">
                <div class="flex flex-col items-start gap-6 max-w-xl p-6 bg-pencil-tip text-zinc-100 rounded-xl">
                    <hr class="hidden lg:flex w-full h-1 mb-2 bg-primary border-none" />
                    <img class="h-10" src="~/assets/images/custom-icons/light/store-alt.png" alt="store-alt" />
                    <h3 class="f-inter text-4xl font-bold">Build Different Menu For Your Branches</h3>
                    <p class="text-lg opacity-75">
                        create your menu specific to your branch, whether it's smaller or larger or you don't serve specific items in some of your branches, you
                        can easily tailor your menus based on your specific needs
                    </p>
                </div>
                <Branches class="mt-10" />
            </div>
            <span class="hidden lg:flex w-1 h-96 my-auto bg-primary border-none"></span>
            <div class="flex flex-col-reverse lg:flex-col items-center gap-8 lg:gap-4 lg:-mt-44 w-full lg:w-auto">
                <Ordering class="mb-4" />
                <div class="flex flex-col items-start gap-6 max-w-xl p-6 bg-pencil-tip text-zinc-100 rounded-xl">
                    <img class="h-10" src="~/assets/images/custom-icons/light/clipboard-list-check.png" alt="clipboard-list-check" />
                    <h3 class="f-inter text-4xl font-bold">Get Orders From Your Customers With Your Menu</h3>
                    <p class="text-lg opacity-75">
                        still using pen and paper to take orders? your customers can easily pick their orders from the menu and you get notified what table
                        ordered what
                    </p>
                    <hr class="hidden lg:flex w-full h-1 mt-2 bg-primary border-none" />
                </div>
            </div>
        </div>

        <div class="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-24 xl:gap-40 w-full lg:mt-24 z-2">
            <div class="flex flex-col items-start gap-6 max-w-xl p-6 bg-pencil-tip text-zinc-100 rounded-xl">
                <hr class="hidden lg:flex w-full h-1 mb-2 bg-primary border-none" />
                <img class="h-10" src="~/assets/images/custom-icons/light/comments-question-check.png" alt="comments-question-check" />
                <h3 class="f-inter text-4xl font-bold">Get Feedback On Your Services And Products</h3>
                <p class="text-lg opacity-75">find out what your customers think about your products and put aside the guessing work</p>
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
