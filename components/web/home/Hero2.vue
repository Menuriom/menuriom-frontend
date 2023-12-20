<style scoped>
.bar {
    transform-origin: top left;
    z-index: 2;
    mix-blend-mode: hue;
    /* mix-blend-mode: hard-light; */
}

.btn {
    position: relative;
    isolation: isolate;
    overflow: hidden;
}
.btn:after {
    content: "";
    display: block;
    position: absolute;
    inset: -7rem;
    z-index: -1;
    background: linear-gradient(90deg, theme("colors.secondary") 0%, theme("colors.primary") 100%);
    animation: bg-rotate linear 5s infinite;
}

@keyframes bg-rotate {
    to {
        transform: rotate(360deg);
    }
}

.pattern {
    background-image: linear-gradient(90deg, theme("colors.primary") 0%, theme("colors.secondary") 100%);
    mask: url("~/assets/images/pattern2.png");
    mask-size: 300px;
    mask-position: 20px 20px;
    opacity: 0.15;

    /* background-image: url("/patterns/pattern14.webp");
    background-repeat: repeat;
    background-size: 306px;
    background-position: 6rem; */
}
</style>

<template>
    <div class="relative flex justify-center items-end w-full max-w-screen-4xl px-2 md:px-6 md:mt-10">
        <!-- :class="[localeProperties.dir == 'rtl' ? 'from-secondary  to-bgPrimary' : 'from-bgPrimary to-secondary']" -->
        <section
            class="relative flex flex-wrap 1.5xl:flex-nowrap items-center justify-center 1.5xl:justify-between gap-10 w-full p-4 py-10 sm:p-14 lg:py-0 border-2 border-bgSecondary border-opacity-50 bg-bgAccent bg-opacity-25 text-fgPrimary rounded-3xl isolate"
            title="The Best Way To Manage Your Restaurant Menu And Orders"
        >
            <div class="absolute inset-0 -z-10 pattern opacity-10"></div>
            <div class="relative flex flex-col items-center 1.5xl:items-start gap-6 w-full max-w-6xl bg-neutral-5000 isolate">
                <!-- <div
                    class="bar absolute w-full h-16 md:h-28 rounded-full bg-gradient-to-r from-secondary to-primary opacity-60 blur-3xl"
                    :class="[localeProperties.dir == 'rtl' ? 'rotate-[8deg] top-[8%]' : 'rotate-[-8deg] top-[29%]']"
                ></div> -->
                <div class="flex flex-col gap-6 w-full p-4 md:p-8 rounded-3xl bg-fgPrimary bg-opacity-5 backdrop-blur-sm">
                    <div class="flex items-baseline gap-4 w-full lg:-mb-4 text-secondary">
                        <span class="text-xs xl:text-base text-center">{{ $t("home.Managing a restaurant hasnt been easier") }}.</span>
                        <span class="flex gradient bg-opacity-50 h-0.5 grow"></span>
                    </div>
                    <h1 class="flex flex-col items-center 1.5xl:items-start text-3xl/snug sm:text-5xl/snug md:text-6xl/snug font-extrabold text-fgPrimary">
                        {{ $t("home.The Best Way To Manage Your Restaurant Menu And Orders") }}
                    </h1>
                </div>
                <div
                    class="relative flex flex-wrap items-center justify-center lg:justify-start gap-6 w-full border border-bgSecondary border-opacity-50 text-fgPrimary rounded-3xl p-4 shadow-mr15 isolate"
                >
                    <!-- <div class="absolute inset-0 -z-10 pattern opacity-10"></div> -->
                    <p class="text-center sm:text-start text-lg sm:text-2xl">
                        <span class="text-secondary">{{ $t("home.Any good restaurant needs a good menu") }}</span>
                        <br />
                        <small class="opacity-70">{{ $t("home.With Menuriom build and manage your restaurant menu with ease") }}</small>
                    </p>
                    <nuxt-link
                        class="btn flex items-center gap-2 w-full 2sm:w-auto text-center p-5 px-8 hover:px-12 rounded-2xl text-fgPrimary transition-all shadow-mr25"
                        to="/authenticate"
                        v-if="!user.email.value"
                    >
                        <Icon class="w-7 h-7 bg-white animate-pulse shrink-0" name="pizza.svg" folder="icons/tabler" size="28px" />
                        <span class="f-inter md:text-xl">{{ $t("home.Try It For Free") }}</span>
                    </nuxt-link>
                    <nuxt-link
                        class="btn flex items-center gap-2 w-full 2sm:w-auto text-center p-5 px-8 hover:px-12 rounded-2xl text-fgPrimary transition-all shadow-mr25"
                        to="/panel"
                        v-else
                    >
                        <Icon class="w-7 h-7 bg-white animate-pulse shrink-0" name="pizza.svg" folder="icons/tabler" size="28px" />
                        <span class="f-inter md:text-xl">{{ $t("home.Head To Dashboard") }}</span>
                    </nuxt-link>
                </div>
                <ul
                    class="hidden md:flex flex-wrap items-center gap-4 p-4 bg-bgSecondary bg-opacity-25 backdrop-blur-sm rounded-2xl text-xs md:text-sm shadow-mr15"
                >
                    <li class="p-2 px-4 bg-bgSecondary bg-opacity-75 text-fgPrimary rounded-xl">{{ $t("home.Multilingual") }}</li>
                    <li class="p-2 px-4 bg-bgSecondary bg-opacity-75 text-fgPrimary rounded-xl">{{ $t("home.Ordering System") }}</li>
                    <li class="p-2 px-4 bg-bgSecondary bg-opacity-75 text-fgPrimary rounded-xl">{{ $t("home.Customizable") }}</li>
                    <li class="p-2 px-4 bg-bgSecondary bg-opacity-75 text-fgPrimary rounded-xl">{{ $t("home.User Friendly Interface") }}</li>
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

const { localeProperties } = useI18n();
const userStore = useUserStore();
const user = storeToRefs(userStore);

const imageNum = ref(2);
const showBgImages = ref(false);

onMounted(() => {
    // showBgImages.value = window.innerWidth > 768;
    // showBgImages.value = true;
    // setInterval(() => {
    //     imageNum.value = Math.floor(Date.now() % 5);
    // }, 5000);
});
</script>
