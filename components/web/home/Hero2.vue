<style scoped>
.bar {
    /* top: 20%; */
    transform-origin: top left;
    /* rotate: -10deg; */
    z-index: 2;
    mix-blend-mode: color-dodge;
    /* mix-blend-mode: hard-light; */
}

.pattern {
    background-image: url("/patterns/pattern14.webp");
    background-repeat: repeat;
    background-size: 256px;
    background-position: 6rem;
}

@media (min-width: 768px) {
    .bar {
        /* top: 34%; */
    }
}
</style>

<template>
    <div class="relative flex justify-center items-end w-full max-w-screen-4xl px-2 md:px-6 md:-mt-2">
        <section
            class="relative flex flex-wrap 1.5xl:flex-nowrap items-center justify-center 1.5xl:justify-between gap-10 w-full p-4 py-10 sm:p-14 lg:py-14 bg-bgSecondary text-fgPrimary rounded-3xl isolate"
            title="The Best Way To Manage Your Restaurant Menu And Orders"
        >
            <div class="absolute inset-0 w-full h-full rounded-3xl -z-10 opacity-20 overflow-hidden" v-if="showBgImages">
                <transition name="fade-slow" mode="in-out">
                    <NuxtImg
                        class="absolute inset-0 w-full h-full object-cover"
                        src="/img/restaurant0.jpg"
                        sizes="100% 1920px"
                        loading="lazy"
                        v-if="imageNum === 0"
                    />
                    <NuxtImg
                        class="absolute inset-0 w-full h-full object-cover"
                        src="/img/restaurant1.jpg"
                        sizes="100% 1920px"
                        loading="lazy"
                        v-else-if="imageNum === 1"
                    />
                    <NuxtImg
                        class="absolute inset-0 w-full h-full object-cover"
                        src="/img/restaurant2.jpg"
                        sizes="100% 1920px"
                        loading="lazy"
                        v-else-if="imageNum === 2"
                    />
                    <NuxtImg
                        class="absolute inset-0 w-full h-full object-cover"
                        src="/img/restaurant3.jpg"
                        sizes="100% 1920px"
                        loading="lazy"
                        v-else-if="imageNum === 3"
                    />
                    <NuxtImg
                        class="absolute inset-0 w-full h-full object-cover"
                        src="/img/restaurant4.jpg"
                        sizes="100% 1920px"
                        loading="lazy"
                        v-else-if="imageNum === 4"
                    />
                </transition>
            </div>
            <div class="relative flex flex-col items-center 1.5xl:items-start gap-6 md:gap-10 w-full max-w-6xl bg-neutral-5000 isolate">
                <div
                    class="bar absolute w-full h-16 md:h-24 rounded-xl bg-gradient-to-r from-secondary to-primary opacity-50"
                    :class="[localeProperties.dir == 'rtl' ? 'rotate-[8deg] top-[8%]' : 'rotate-[-8deg] top-[29%]']"
                ></div>
                <div class="flex items-baseline gap-4 w-full lg:-mb-4">
                    <span class="text-xs xl:text-sm text-center">{{ $t("home.Managing a restaurant hasnt been easier") }}.</span>
                    <span class="flex bg-fgPrimary bg-opacity-50 h-0.5 grow"></span>
                </div>
                <h1 class="flex flex-col items-center 1.5xl:items-start text-3xl/snug sm:text-5xl/snug md:text-7xl/snug font-extrabold">
                    {{ $t("home.The Best Way To Manage Your Restaurant Menu And Orders") }}
                </h1>
                <div class="relative flex flex-col gap-6 w-full max-w-5xl bg-bgPrimary bg-opacity-90 text-fgPrimary rounded-2xl p-6 sm:p-8 shadow-mr15 isolate">
                    <div class="absolute inset-0 -z-10 pattern opacity-10"></div>
                    <p class="text-center sm:text-start text-lg sm:text-2xl opacity-90">
                        {{ $t("home.Any good restaurant needs a good menu") }}
                        <br />
                        {{ $t("home.With Menuriom build and manage your restaurant menu with ease") }}
                    </p>
                    <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 sm:mt-4">
                        <nuxt-link
                            class="w-full 2sm:w-auto text-center p-4 px-8 hover:px-12 rounded-xl bg-primary text-fgPrimary transition-all shadow-mr25"
                            to="/authenticate"
                            v-if="!user.email.value"
                        >
                            <span class="f-inter md:text-xl">{{ $t("home.Try It For Free") }}</span>
                        </nuxt-link>
                        <nuxt-link
                            class="w-full 2sm:w-auto text-center p-4 px-8 hover:px-12 rounded-xl bg-primary text-fgPrimary transition-all shadow-mr25"
                            to="/panel"
                            v-else
                        >
                            <span class="f-inter md:text-xl">{{ $t("home.Head To Dashboard") }}</span>
                        </nuxt-link>
                        <span class="hidden sm:inline-block">{{ $t("auth.OR") }}</span>
                        <nuxt-link
                            class="w-full 2sm:w-auto text-center p-4 px-8 hover:px-12 rounded-xl bg-fgPrimary text-bgPrimary transition-all shadow-mr25"
                            :to="`${$config.public.MENU_BASE_URL}/Menuriom`"
                            v-if="!user.email.value"
                        >
                            <span class="f-inter md:text-xl">{{ $t("home.Check The Demo") }}</span>
                        </nuxt-link>
                        <nuxt-link
                            class="w-full 2sm:w-auto text-center p-4 px-8 hover:px-12 rounded-xl bg-fgPrimary text-bgPrimary transition-all shadow-mr25"
                            to="/help-center"
                            v-else
                        >
                            <span class="f-inter md:text-xl">{{ $t("home.Learn How It Works") }}</span>
                        </nuxt-link>
                    </div>
                </div>
                <ul class="hidden md:flex flex-wrap items-center gap-4 p-4 bg-bgPrimary rounded-2xl text-sm md:text-base shadow-mr15">
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary rounded-xl">{{ $t("home.Multilingual") }}</li>
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary rounded-xl">{{ $t("home.Ordering System") }}</li>
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary rounded-xl">{{ $t("home.Customizable") }}</li>
                    <li class="p-2 px-4 bg-bgSecondary text-fgPrimary rounded-xl">{{ $t("home.User Friendly Interface") }}</li>
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
    showBgImages.value = true;
    setInterval(() => {
        imageNum.value = Math.floor(Date.now() % 5);
    }, 5000);
});
</script>
