<style scoped>
.wrapper {
    background-image: url("~/assets/images/pattern.webp");
    background-repeat: repeat;
}
</style>

<template>
    <section class="wrapper flex flex-col items-center gap-6 w-full p-2 sm:p-4 md:p-8 bg-pencil-tip">
        <img class="-mt-16" src="~/assets/images/icons/gold-card.png" alt="gold-card" />
        <div class="flex flex-col items-center gap-2">
            <h2 class="f-inter text-2xl font-bold text-white">FEATURES.</h2>
            <h4 class="text-lg sm:text-2xl opacity-60 text-white font-extralight text-center">We are constantly growing and adding new features.</h4>
        </div>
        <ul class="flex flex-wrap justify-center gap-4 md:gap-12 w-full max-w-screen-xl mb-14">
            <li
                class="flex flex-col items-center gap-6 w-full max-w-screen-2xs p-8 mt-16 rounded-xl bg-pencil-tip text-white shadow-2xl group"
                v-for="(item, i) in features.list"
                :key="i"
            >
                <div class="relative flex items-center justify-center -mt-16">
                    <div class="gradient-re absolute w-28 h-28 rounded-lg scale-0 group-hover:scale-100 transition-transform"></div>
                    <div class="relative flex items-center justify-center w-24 h-24 rounded-lg bg-neutral-500 bg-opacity-60 backdrop-blur-sm">
                        <Icon class="relative w-16 h-16 bg-white" :name="item.icon" folder="icons/basil" size="64px" />
                    </div>
                </div>
                <h3 class="gradient-text f-inter text-2xl font-extrabold text-center">{{ item.title }}</h3>
                <p class="text-xs text-white text-center opacity-90">{{ item.desc }}</p>
            </li>
        </ul>
    </section>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const features = reactive({
    list: [
        {
            icon: "Cursor.svg",
            title: "Easy To Use",
            desc: "with couple of clicks you can build and manage your menus, branches and orders with ease",
        },
        {
            icon: "Sand-watch.svg",
            title: "Uptime",
            desc: "we can guarantee your menus are available at anytime",
        },
        {
            icon: "User.svg",
            title: "User Friendly",
            desc: "our templates are as easy to use as possible so your customers find what they want easily",
        },
        {
            icon: "Globe.svg",
            title: "Multilingual",
            desc: "your servers doesn't need to explain the menu to a foreign guest anymore",
        },
        {
            icon: "Palette.svg",
            title: "Fully Customizable",
            desc: "You can customize your menu based on your restaurant theme, and with your brand logo",
        },
        {
            icon: "Mobile-phone.svg",
            title: "Works On Any Device",
            desc: "our system is web-based so you can manage your menu and get orders on any device",
        },
        {
            icon: "Map-location.svg",
            title: "Multiple Branches",
            desc: "you can have different menus for every branch and tailor your menus for a specific branch",
        },
        {
            icon: "Comment.svg",
            title: "Customer Feedback",
            desc: "your customers can like any food on your menu and leave a feedback to you to see",
        },
    ],
});
</script>
