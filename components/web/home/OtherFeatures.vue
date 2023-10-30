<style scoped></style>

<template>
    <div class="flex items-center justify-center w-full max-w-screen-3xl px-6">
        <section class="flex flex-col items-center gap-8 md:gap-14 w-full px-4 md:px-8 py-20 bg-bgAccent rounded-4xl">
            <div class="flex flex-col items-center gap-2">
                <h2 class="f-inter text-2xl lg:text-5xl font-bold text-fgPrimary">{{ $t("home.FEATURES") }}.</h2>
                <h4 class="f-poppins lg:text-2xl opacity-50 text-fgPrimary text-center">{{ $t("home.We are constantly growing and adding new features") }}.</h4>
            </div>
            <ul class="flex flex-wrap justify-center gap-4 md:gap-12 lg:gap-16 w-full max-w-screen-2xl">
                <li
                    class="flex flex-col items-center gap-6 w-full max-w-screen-2xs aspect-square p-6 mt-12 rounded-3xl bg-bgPrimary text-fgPrimary group"
                    v-for="(item, i) in features.list"
                    :key="i"
                >
                    <div class="relative flex items-center justify-center -mt-16">
                        <div class="gradient-re absolute w-28 h-28 rounded-2xl scale-0 group-hover:scale-100 transition-transform"></div>
                        <div class="relative flex items-center justify-center w-24 h-24 rounded-xl bg-bgSecondary bg-opacity-60 backdrop-blur-sm">
                            <Icon class="relative w-16 h-16 bg-fgPrimary" :name="item.icon" folder="icons/basil" size="64px" />
                        </div>
                    </div>
                    <h3 class="gradient-text f-inter text-2xl/normal font-extrabold text-center">{{ item.title }}</h3>
                    <p class="text-sm/relaxed text-fgPrimary text-center opacity-90">{{ item.desc }}</p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script setup>
import Icon from "~/components/Icon.vue";

const { t } = useI18n();


const features = reactive({
    list: [
        {
            icon: "Cursor.svg",
            title: t("home.Easy To Use"),
            desc: t("home.with couple of clicks you can build and manage your menus, branches and orders with ease"),
        },
        {
            icon: "Sand-watch.svg",
            title: t("home.Uptime"),
            desc: t("home.we can guarantee your menus are available at anytime"),
        },
        {
            icon: "User.svg",
            title: t("home.User Friendly"),
            desc: t("home.our templates are as easy to use as possible so your customers find what they want easily"),
        },
        {
            icon: "Globe.svg",
            title: t("home.Multilingual"),
            desc: t("home.your servers doesnt need to explain the menu to a foreign guest anymore"),
        },
        {
            icon: "Palette.svg",
            title: t("home.Fully Customizable"),
            desc: t("home.You can customize your menu based on your restaurant theme, and with your brand logo"),
        },
        {
            icon: "Mobile-phone.svg",
            title: t("home.Works On Any Device"),
            desc: t("home.our system is web-based so you can manage your menu and get orders on any device"),
        },
        {
            icon: "Map-location.svg",
            title: t("home.Multiple Branches"),
            desc: t("home.you can have different menus for every branch and tailor your menus for a specific branch"),
        },
        {
            icon: "Comment.svg",
            title: t("home.Customer Feedback"),
            desc: t("home.your customers can like any food on your menu and leave a feedback to you to see"),
        },
    ],
});
</script>
