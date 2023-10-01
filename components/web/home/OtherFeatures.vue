<style scoped></style>

<template>
    <div class="flex items-center justify-center w-full max-w-screen-3xl px-6">
        <section class="flex flex-col items-center gap-8 md:gap-14 w-full px-4 md:px-8 py-20 bg-bgAccent rounded-4xl">
            <div class="flex flex-col items-center gap-2">
                <h2 class="f-inter text-2xl lg:text-5xl font-bold text-fgPrimary">FEATURES.</h2>
                <h4 class="f-poppins lg:text-2xl opacity-50 text-fgPrimary text-center">We are constantly growing and adding new features.</h4>
            </div>
            <ul class="flex flex-wrap justify-center gap-4 md:gap-12 w-full max-w-screen-xl">
                <li
                    class="flex flex-col items-center gap-6 w-full max-w-screen-2xs aspect-square p-6 mt-16 rounded-3xl bg-bgPrimary text-fgPrimary group"
                    v-for="(item, i) in features.list"
                    :key="i"
                >
                    <div class="relative flex items-center justify-center -mt-16">
                        <div class="gradient-re absolute w-28 h-28 rounded-2xl scale-0 group-hover:scale-100 transition-transform"></div>
                        <div class="relative flex items-center justify-center w-24 h-24 rounded-xl bg-bgSecondary bg-opacity-60 backdrop-blur-sm">
                            <Icon class="relative w-16 h-16 bg-fgPrimary" :name="item.icon" folder="icons/basil" size="64px" />
                        </div>
                    </div>
                    <h3 class="gradient-text f-inter text-3xl font-extrabold text-center">{{ item.title }}</h3>
                    <p class="text-sm/relaxed text-fgPrimary text-center opacity-90">{{ item.desc }}</p>
                </li>
            </ul>
        </section>
    </div>
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
