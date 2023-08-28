<style scoped>
.bar {
    top: 20%;
    transform-origin: top left;
    rotate: -10deg;
    z-index: 2;
    mix-blend-mode: screen;
}

.pattern {
    background-image: url("/patterns/pattern14.webp");
    background-repeat: repeat;
    background-size: 25rem;
    background-position: 6rem;
}

@media (min-width: 768px) {
    .bar {
        top: 34%;
    }
}
</style>

<template>
    <div class="relative flex justify-center items-end w-full max-w-screen-4xl px-6">
        <section
            class="flex flex-wrap xl:flex-nowrap items-center xl:items-start justify-center xl:justify-between gap-10 w-full p-6 pt-24 lg:p-10 lg:pt-24 -mt-14 bg-neutral-50 text-bgPrimary rounded-3xl"
            title="The Best Way To Manage Your Restaurant Menu And Orders"
        >
            <div class="relative flex flex-col items-center xl:items-start gap-6 md:gap-10 w-full max-w-6xl bg-neutral-50 overflow-hidden">
                <div class="bar absolute w-full h-16 md:h-24 rounded-xl bg-gradient-to-r from-secondary to-primary opacity-90 shadow-mr25"></div>
                <div class="flex items-baseline gap-4 w-full lg:-mb-4">
                    <span class="text-xs xl:text-sm text-center">Managing a restaurant hasn't been easier.</span>
                    <span class="flex bg-bgSecondary bg-opacity-50 h-0.5 grow"></span>
                </div>
                <h1 class="big-text flex flex-col items-center xl:items-start text-4xl/tight sm:text-5xl/tight md:text-7xl/tight font-extrabold">
                    The Best Way To Manage Your Restaurant Menu And Orders
                </h1>
                <div class="relative flex flex-col gap-6 bg-bgPrimary text-fgPrimary rounded-2xl p-8 shadow-mr15 isolate">
                    <div class="absolute inset-0 -z-10 pattern opacity-20"></div>
                    <p class="text-lg md:text-2xl/relaxed opacity-90">
                        Any good restaurant needs a good menu.
                        <br />
                        With Menuriom build and manage your restaurant menu with ease.
                    </p>
                    <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-4">
                        <!-- TODO : chnage the button when user is logged in to "head to dashboard" and "help center or how to start your first menu" -->
                        <nuxt-link
                            class="p-4 px-6 hover:px-8 rounded-xl bg-primary text-fgPrimary transition-all shadow-mr25"
                            to="/authenticate"
                            v-if="!user.email.value"
                        >
                            <span class="f-inter font-bold">Try It For Free</span>
                        </nuxt-link>
                        <nuxt-link class="p-4 px-6 hover:px-8 rounded-xl bg-primary text-fgPrimary transition-all shadow-mr25" to="/panel" v-else>
                            <span class="f-inter font-bold">Head To Dashboard</span>
                        </nuxt-link>
                        OR
                        <nuxt-link
                            class="p-4 px-6 hover:px-8 rounded-xl bg-fgPrimary text-bgPrimary transition-all shadow-mr25"
                            to="/demo"
                            v-if="!user.email.value"
                        >
                            <span class="f-inter font-bold">Check The Demo</span>
                        </nuxt-link>
                        <nuxt-link class="p-4 px-6 hover:px-8 rounded-xl bg-fgPrimary text-bgPrimary transition-all shadow-mr25" to="/help-center" v-else>
                            <span class="f-inter font-bold">Learn How To Create</span>
                        </nuxt-link>
                    </div>
                </div>
                <ul class="flex flex-wrap items-center gap-4 p-4 bg-bgPrimary rounded-2xl text-sm md:text-base shadow-mr15">
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary rounded-xl">Multilingual</li>
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary text-opacity-75 rounded-xl">Ordering System</li>
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary text-opacity-75 rounded-xl">Customizable</li>
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary text-opacity-75 rounded-xl">User Friendly Interface</li>
                </ul>
            </div>
            <HeroImage />
        </section>
        <div
            class="absolute -bottom-28 lg:-bottom-24 hidden xl:flex items-center justify-center border-4 border-fgPrimary border-opacity-50 p-2 rounded-full shadow-mr10"
        >
            <div class="relative flex items-center justify-center w-32 h-32 rounded-full bg-white">
                <img class="absolute top-4.5 animate-pulse" src="~/assets/images/scroll-down.svg" alt="scroll-down" />
                <img class="animate-bounce mt-4" src="~/assets/images/arrow-down.png" alt="arrow-down" />
            </div>
        </div>
    </div>
</template>

<script setup>
import HeroImage from "~/components/web/home/HeroImage.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const user = storeToRefs(userStore);
</script>
