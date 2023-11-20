<style scoped>
.wrapper {
    background-image: url("~/assets/images/pattern-black.webp");
    background-repeat: repeat;
}
</style>

<template>
    <section class="relative flex flex-col items-center gap-10 w-full px-2 md:mb-16">
        <header
            class="wrapper relative flex items-center justify-evenly gap-4 w-screen max-w-screen-lg rounded-3xl bg-bgAccent text-white p-4 md:p-8 lg:p-16 shadow-nr25"
        >
            <div
                class="relative flex flex-col items-center gap-5 w-full max-w-xl rounded-2xl py-6 my-6 bg-bgSecondary bg-opacity-30 backdrop-blur-sm z-2 shrink-0"
            >
                <h1 class="f-inter text-3xl md:text-5xl font-extrabold text-center">{{ $t("features.Core Features") }}.</h1>
                <h2 class="md:text-xl text-center opacity-60">{{ $t("features.Get familiar with Menutiom features") }}</h2>
            </div>
        </header>
        <div class="relative flex flex-col items-center w-full max-w-screen-2xl p-2 mt-20">
            <ul class="relative flex flex-col items-center gap-20 w-full">
                <li
                    class="flex flex-col-reverse 1.5xl:flex-row 1.5xl:even:flex-row-reverse items-center justify-center gap-16 lg:gap-32 w-full group"
                    v-for="(item, i) in features.list"
                    :key="i"
                >
                    <div class="flex items-center justify-center w-full max-w-xl select-none" draggable="false">
                        <NuxtImg class="w-full object-scale-down" width="576px" :src="item.image" :alt="item.title" loading="lazy" />
                    </div>
                    <div class="flex flex-col items-center gap-8 w-full max-w-2xl">
                        <div class="flex flex-col items-center 1.5xl:items-start gap-4 w-full">
                            <h4 class="f-inter text-center 1.5xl:text-start text-3xl lg:text-5xl font-bold">{{ item.title }}</h4>
                            <span class="flex w-full h-3 gradient mb-4 md:mb-6"></span>
                            <div class="flex flex-col gap-2 border-s-8 ps-3">
                                <p class="text-center 1.5xl:text-start lg:text-xl opacity-75" v-for="desc in item.desc">{{ desc }}</p>
                            </div>
                            <ul class="flex flex-col items-start gap-2">
                                <li class="flex items-center gap-4 bg-bgSecondary p-2 px-4 rounded-lg" v-for="tap in item.list">
                                    <div class="relative flex items-center justify-center w-3 h-3 bg-primary rounded-full">
                                        <span class="absolute w-4 h-4 gradient rounded-full animate-ping"></span>
                                    </div>
                                    {{ tap }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <nuxt-link class="relative flex items-center justify-center p-8 aspect-square bg-bgAccent rounded-full isolate group mt-16" :to="localePath('/authenticate')">
            <div class="absolute inset-0 group-hover:scale-100 scale-0 bg-primary rounded-full transition-all">
                <div class="absolute inset-0 group-hover:scale-125 scale-0 bg-primary bg-opacity-25 animate-ping rounded-full transition-all"></div>
            </div>
            <div class="relative flex flex-col items-center justify-center gap-2">
                <p class="text-2xl font-bold">And Many More...</p>
                <span class="text-lg text-white opacity-75">Create Your First Menu For Free</span>
            </div>
        </nuxt-link>
    </section>
</template>

<script setup>
// import Hero from "~/components/web/features/Hero.vue";

useHead({ title: `Features - Menuriom` });
definePageMeta({ layout: "default" });

const localePath = useLocalePath();

const features = reactive({
    list: [
        {
            icon: "/gradient-icons/light/palette.png",
            title: "Templates & Customization",
            desc: [
                "Customize your menu base on your restaurant color scheme and design it the way it fits you the best",
                "With easy to use and simple setting for every part of your menu",
                "Easily enable and disable the parts of menu that you want and tailor it to you spesific needs",
            ],
            list: ["Multiple Patterns", "Custom Icons", "Style For Every Page"],
            image: "/feature-images/customization.png",
        },
        {
            icon: "/gradient-icons/dark/qrcode.png",
            title: "Custom QR Code",
            desc: ["Build and design your own custom QR code.", "Customize its colors and shape with your custom logo in the middle"],
            list: ["With Your Brand Icon", "Fully Customizable", "Ready To Print"],
            image: "/feature-images/custom-qr.png",
        },
        {
            icon: "/gradient-icons/light/fire.png",
            title: "Item Specialazation",
            desc: [
                "Highlight items in your menu and add custom tags to attract more attention from your customers",
                "Dont let your customers miss any items by adding the NEW badge",
                "Suggest your best sellers on top of your menu for your customers",
                "Add discount to your items with the DISCOUNT tag",
            ],
            image: "/feature-images/special-item.png",
        },
        {
            icon: "/gradient-icons/dark/earth-america.png",
            title: "Menu Translation",
            desc: ["Go internatnal by translate your menu once and for all", "Add more languages as you feel the need for it"],
            image: "/feature-images/multi-lang.png",
        },
        {
            icon: "/gradient-icons/light/object-intersect.png",
            title: "Advanced Analytics",
            desc: [
                "Get the most detailed analytic dashboard about your menu, and make desitions base on real numbers",
                "see what items you sell more, or people like more from your menu",
            ],
            list: ["Sells and orders charts", "view your customers feedback", "menu scan analytics"],
            image: "/feature-images/analytics.png",
        },
        {
            icon: "/gradient-icons/dark/comments-question-check.png",
            title: "Customer Feedback System",
            desc: [
                "Your customers can leave reviews and like the menu items",
                "See what your customers think about each item in your menu and reply to their comments",
            ],
            list: ["get feeback from real customers", "get in touch with your customers", "improve base on your feebacks"],
            image: "/feature-images/feedback.png",
        },
        {
            icon: "/gradient-icons/light/clipboard-list-check.png",
            title: "Ordering System",
            desc: [
                "All in one ordering app and order managment system",
                "short on staff? your customers can order write from the menu",
                "get order tickets printed out right in your kichen",
            ],
            list: ["your customers wait less", "helps you better manage you restaurant", "lowers down your costs"],
            image: "/feature-images/ordering.png",
        },
        {
            icon: "/gradient-icons/dark/bell-on.png",
            title: "Waiter Call",
            desc: ["Get notified imidatly when a table needs an asistance", "Your customers can call waiter to their table right from the menu app"],
            list: ["improves your customer service"],
            image: "/feature-images/server-call.png",
        },
        {
            icon: "/gradient-icons/light/store.png",
            title: "Multiple Branch System",
            desc: [
                "You can have different menu base on a specific branch",
                "add all your branches addresses in your menu for your customers to choose from",
                "helps your customers find the closest branch for them",
            ],
            list: ["modify your menu base on branch", "custom page for your branch details"],
            image: "/feature-images/multi-branch.png",
        },
    ],
});
</script>
