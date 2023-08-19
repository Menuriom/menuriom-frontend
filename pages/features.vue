<style scoped>
.bg-card:nth-child(2n) {
    background-color: theme("colors.pencil-tip");
    border-radius: 1rem;
    color: white;
}
</style>

<template>
    <div class="relative flex flex-col items-center gap-10 w-full">
        <Hero class="1.5xl:mb-32" />
        <div class="relative flex flex-col items-center w-full max-w-screen-2xl p-2">
            <span class="absolute hidden 1.5xl:flex w-1 h-full border-r-8 border-dotted border-zinc-400"></span>
            <ul class="relative flex flex-col items-center gap-32 w-full">
                <li
                    class="bg-card flex flex-col-reverse 1.5xl:flex-row 1.5xl:even:flex-row-reverse items-center justify-center px-4 gap-8 lg:gap-16 w-full group"
                    v-for="(item, i) in features.list"
                    :key="i"
                >
                    <div class="flex items-center justify-center odd:-mb-10 1.5xl:odd:-my-10 w-full max-w-xl select-none" draggable="false">
                        <img class="w-10/12 h-10/12 object-scale-down" :src="item.image" :alt="item.title" />
                    </div>
                    <div class="gradient hidden 1.5xl:flex items-center justify-center group-hover:p-1.5 rounded-lg transition-all shrink-0">
                        <div class="relative flex items-center justify-center p-6 md:p-8 rounded-lg bg-white group-odd:bg-pencil-tip">
                            <img class="absolute w-16 h-16 md:w-24 md:h-24 object-contain blur-md opacity-30" :src="item.icon" :alt="item.title" />
                            <img class="relative w-12 h-12 md:w-20 md:h-20 object-contain" :src="item.icon" :alt="item.title" />
                        </div>
                    </div>
                    <div class="flex flex-col items-center gap-8 w-full max-w-xl">
                        <div
                            class="relative flex 1.5xl:hidden items-center justify-center p-6 md:p-8 rounded-lg bg-white group-odd:bg-pencil-tip shrink-0"
                        >
                            <img class="absolute w-16 h-16 md:w-24 md:h-24 object-contain blur-md opacity-30" :src="item.icon" :alt="item.title" />
                            <img class="relative w-12 h-12 md:w-20 md:h-20 object-contain" :src="item.icon" :alt="item.title" />
                        </div>
                        <div class="flex flex-col items-center 1.5xl:items-start gap-2 w-full">
                            <h4 class="f-inter text-center 1.5xl:text-start text-3xl lg:text-5xl font-bold">{{ item.title }}</h4>
                            <span class="flex w-full h-4 bg-primary rounded-sm"></span>
                            <p class="text-center 1.5xl:text-start lg:text-xl opacity-75">{{ item.desc }}</p>
                        </div>
                    </div>
                    <hr class="flex 1.5xl:hidden gradient w-10/12 h-0.5 border-0 opacity-50" />
                </li>
            </ul>
        </div>
        <div class="flex flex-col items-center justify-center gap-4">
            <p class="text-2xl font-bold">And Many More</p>
            <span class="flex w-1 h-10 border-r-8 border-dotted border-zinc-400"></span>
            <Button class="border-4 border-black" type="primary" linkTo="/authenticate">
                <span class="text-lg font-bold text-white">Create Your First Menu For Free</span>
            </Button>
        </div>
    </div>
</template>

<script setup>
import Hero from "~/components/web/features/Hero.vue";
import Button from "~/components/web/Button.vue";

useHead({ title: `Features - Menuriom` });
definePageMeta({ layout: "default" });

const features = reactive({
    list: [
        {
            icon: "/gradient-icons/light/palette.png",
            title: "Templates & Customization",
            desc: "Select from your favorite style of menu and customize it how ever you see fit",
            image: "/feature-images/customization2.webp",
        },
        {
            icon: "/gradient-icons/dark/qrcode.png",
            title: "Custom QR Code",
            desc: "You can add your brand logo right on the QR code for more customization",
            image: "/feature-images/custom-qr2.webp",
        },
        {
            icon: "/gradient-icons/light/fire.png",
            title: "Item Specialazation",
            desc: "Highlight items in your menu and add custom tags to attract more attention from your customers",
            image: "/feature-images/special-item2.webp",
        },
        {
            icon: "/gradient-icons/dark/earth-america.png",
            title: "Menu Translation",
            desc: "You can add translation for menu item with same QR code",
            image: "/feature-images/multi-lang2.webp",
        },
        {
            icon: "/gradient-icons/light/object-intersect.png",
            title: "Best Item Combos",
            desc: "You can group items in the menu for recommendation or a discount",
            image: "/feature-images/combos2.webp",
        },
        {
            icon: "/gradient-icons/dark/comments-question-check.png",
            title: "Customer Feedback System",
            desc: "Your customers can leave reviews and like on menu items",
            image: "/feature-images/feedback2.webp",
        },
        {
            icon: "/gradient-icons/light/clipboard-list-check.png",
            title: "Ordering System",
            desc: "Your customers can place orders without the need of a waiter",
            image: "/feature-images/ordering2.webp",
        },
        {
            icon: "/gradient-icons/dark/bell-on.png",
            title: "Waiter Call",
            desc: "Your customers can call waiter to their table right from the menu app",
            image: "/feature-images/server-call2.webp",
        },
        {
            icon: "/gradient-icons/light/store.png",
            title: "Multiple Branch System",
            desc: "You can have different menus base on a specific branch",
            image: "/feature-images/multi-branch2.webp",
        },
    ],
});
</script>
