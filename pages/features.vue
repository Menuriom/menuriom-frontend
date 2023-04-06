<style scoped></style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <Hero class="" />
        <div class="relative flex flex-col items-center w-full max-w-screen-2xl p-2">
            <span class="absolute hidden 1.5xl:flex w-1 h-full border-r-8 border-dotted border-zinc-400"></span>
            <ul class="relative flex flex-col items-center gap-20 1.5xl:gap-0 w-full">
                <li
                    class="flex flex-col-reverse 1.5xl:flex-row 1.5xl:even:flex-row-reverse items-center justify-center gap-8 lg:gap-16 w-full group"
                    v-for="(item, i) in features.list"
                    :key="i"
                >
                    <div class="flex items-center w-full max-w-lg select-none" draggable="false">
                        <img class="" :src="item.image" :alt="item.title" />
                    </div>
                    <div class="relative hidden 1.5xl:flex items-center justify-center p-6 md:p-8 rounded-lg bg-pencil-tip flex-shrink-0">
                        <img class="absolute w-16 h-16 md:w-24 md:h-24 object-contain blur-md opacity-60" :src="item.icon" :alt="item.title" />
                        <img class="relative w-12 h-12 md:w-20 md:h-20 object-contain" :src="item.icon" :alt="item.title" />
                    </div>
                    <div class="flex flex-col items-center gap-8 w-full max-w-lg">
                        <div class="relative flex 1.5xl:hidden items-center justify-center p-6 md:p-8 rounded-lg bg-pencil-tip flex-shrink-0">
                            <img class="absolute w-16 h-16 md:w-24 md:h-24 object-contain blur-md opacity-60" :src="item.icon" :alt="item.title" />
                            <img class="relative w-12 h-12 md:w-20 md:h-20 object-contain" :src="item.icon" :alt="item.title" />
                        </div>
                        <div class="flex flex-col items-center 1.5xl:items-start gap-2 md:gap-4 w-full">
                            <h4 class="f-inter text-center 1.5xl:text-start text-3xl lg:text-4xl font-bold">{{ item.title }}</h4>
                            <p class="text-center 1.5xl:text-start lg:text-xl opacity-75">{{ item.desc }}</p>
                        </div>
                    </div>
                    <hr class="flex 1.5xl:hidden gradient w-10/12 h-0.5 border-0 opacity-50" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import Hero from "~/components/web/features/Hero.vue";

useHead({ title: `Features - Menuriom` });
definePageMeta({ layout: "default" });

const features = reactive({
    list: [
        {
            icon: "/gradient-icons/light/palette.png",
            title: "Templates & Customization",
            desc: "Select from your favorite style of menu and customize it how ever you see fit",
            image: "/feature-images/customization.webp",
        },
        {
            icon: "/gradient-icons/light/qrcode.png",
            title: "Custom QR Code",
            desc: "You can add your brand logo right on the QR code for more customization",
            image: "feature-images/custom-qr.webp",
        },
        {
            icon: "/gradient-icons/light/fire.png",
            title: "Item Specialazation",
            desc: "Highlight items in your menu and add custom tags to attract more attention from your customers",
            image: "feature-images/special-item.webp",
        },

        {
            icon: "/gradient-icons/light/earth-america.png",
            title: "Menu Translation",
            desc: "You can add translation for menu item with same QR code",
            image: "feature-images/multi-lang.webp",
        },
        {
            icon: "/gradient-icons/light/comments-question-check.png",
            title: "Customer Feedback System",
            desc: "Your customers can leave reviews and like on menu items",
            image: "feature-images/feedback.webp",
        },
        {
            icon: "/gradient-icons/light/object-intersect.png",
            title: "Best Item Combos",
            desc: "You can group items in the menu for recommendation or a discount",
            image: "feature-images/combos.webp",
        },

        {
            icon: "/gradient-icons/light/clipboard-list-check.png",
            title: "Ordering System",
            desc: "Your customers can place orders without the need of a waiter",
            image: "feature-images/ordering.webp",
        },
        {
            icon: "/gradient-icons/light/bell-on.png",
            title: "Waiter Call",
            desc: "Your customers can call waiter to their table right from the menu app",
            image: "feature-images/server-call.webp",
        },
        {
            icon: "/gradient-icons/light/store.png",
            title: "Multiple Branch System",
            desc: "You can have different menus base on a specific branch",
            image: "feature-images/multi-branch.webp",
        },
    ],
});
</script>
